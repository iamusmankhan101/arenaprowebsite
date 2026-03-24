import {
    collection,
    getDocs,
    addDoc,
    query,
    where,
    serverTimestamp,
    doc,
    getDoc
} from 'firebase/firestore';
import { todayPKT, currentMinutesPKT } from '../utils/dateUtils';
import { db } from '../config/firebase';

// Helper: convert 24h time "14:00" to 12h "02:00 PM"
const convertTo12h = (timeStr) => {
    if (!timeStr) return timeStr;
    if (timeStr.toUpperCase().includes('AM') || timeStr.toUpperCase().includes('PM')) return timeStr;
    try {
        const [h, m] = timeStr.trim().split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour12 = h % 12 || 12;
        return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
    } catch (e) {
        return timeStr;
    }
};

export const bookingService = {
    /**
     * Fetches available time slots for a specific venue and date.
     * Compares venue's default/date-specific slots with existing bookings.
     */
    async getAvailableSlots(venueId, dateString) {
        try {
            console.log(`🔍 Fetching available slots for venue ${venueId} on ${dateString}`);

            // 1. Get Venue Data
            const venueRef = doc(db, 'venues', venueId);
            const venueSnap = await getDoc(venueRef);

            if (!venueSnap.exists()) {
                throw new Error('Venue not found');
            }

            const venueData = venueSnap.data();

            // 2. Determine base slots (check dateSpecificSlots first, then default timeSlots)
            let slots = [];
            if (venueData.dateSpecificSlots && venueData.dateSpecificSlots[dateString]) {
                slots = venueData.dateSpecificSlots[dateString];
            } else {
                slots = venueData.timeSlots || [];
            }

            // 3. Fetch existing bookings for this venue and date
            const bookingsRef = collection(db, 'bookings');
            // Simple query to avoid composite index requirements
            const q = query(
                bookingsRef,
                where('turfId', '==', venueId),
                where('dateString', '==', dateString)
            );

            const bookingsSnap = await getDocs(q);
            const bookedSlotIds = new Set();

            bookingsSnap.forEach(doc => {
                const booking = doc.data();
                if (booking.status !== 'cancelled') {
                    if (booking.timeSlotId) {
                        bookedSlotIds.add(booking.timeSlotId);
                    } else if (booking.timeSlot) {
                        bookedSlotIds.add(booking.timeSlot);
                    }
                }
            });

            console.log(`📊 Found ${bookedSlotIds.size} booked slots for this date.`);

            // 4. Map and tag slots as available or booked
            const todayStr = todayPKT();
            const nowMinutes = currentMinutesPKT();

            const mappedSlots = slots
                .map(slot => ({
                    ...slot,
                    startTime: convertTo12h(slot.startTime),
                    endTime: convertTo12h(slot.endTime),
                    time: convertTo12h(slot.time),
                    isBooked: bookedSlotIds.has(slot.id) || bookedSlotIds.has(slot.startTime || slot.time),
                    price: slot.price || venueData.basePrice || 0
                }))
                .filter(slot => {
                    // For today, hide slots whose start time has already passed
                    if (dateString !== todayStr) return true;
                    const timeStr = slot.startTime || slot.time || '';
                    if (!timeStr) return true;
                    const upper = timeStr.toUpperCase();
                    let slotHour = 0, slotMin = 0;
                    if (upper.includes('AM') || upper.includes('PM')) {
                        const [t, modifier] = timeStr.trim().split(' ');
                        let [h, m] = t.split(':').map(Number);
                        if (modifier?.toUpperCase() === 'PM' && h !== 12) h += 12;
                        if (modifier?.toUpperCase() === 'AM' && h === 12) h = 0;
                        slotHour = h; slotMin = m;
                    } else {
                        [slotHour, slotMin] = timeStr.split(':').map(Number);
                    }
                    return (slotHour * 60 + slotMin) > nowMinutes;
                });

            console.log(`✅ Returning ${mappedSlots.length} total slots (${mappedSlots.filter(s => !s.isBooked).length} available)`);
            return mappedSlots;

        } catch (error) {
            console.error("Error in getAvailableSlots:", error);
            throw error;
        }
    },

    /**
     * Creates a new booking in the Firestore 'bookings' collection.
     */
    async createBooking(bookingData) {
        try {
            const {
                venueId,
                venueName,
                dateString,
                slot,
                customerInfo,
                sport
            } = bookingData;

            // Combine date string and time slot to create a proper Date object
            // slot.startTime can be "14:00" or "02:00 PM"
            const timeStr = slot.startTime || slot.time || "00:00";

            let bookingDateTime;
            try {
                // Try parsing common formats
                if (timeStr.includes('AM') || timeStr.includes('PM')) {
                    // Handle "02:00 PM" format
                    const [time, modifier] = timeStr.split(' ');
                    let [hours, minutes] = time.split(':');
                    if (hours === '12') hours = '00';
                    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
                    bookingDateTime = new Date(`${dateString}T${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}:00`);
                } else {
                    // Handle "14:00" format
                    bookingDateTime = new Date(`${dateString}T${timeStr}:00`);
                }

                // If invalid date, fallback to midnight local
                if (isNaN(bookingDateTime.getTime())) {
                    bookingDateTime = new Date(dateString);
                }
            } catch (e) {
                bookingDateTime = new Date(dateString);
            }

            const newBooking = {
                turfId: venueId,
                turfName: venueName,
                dateString: dateString, // 'YYYY-MM-DD'
                date: bookingDateTime, // Proper local/combined date and time
                startTime: bookingDateTime, // Some services specifically look for startTime
                timeSlot: timeStr,
                timeSlotId: slot.id,
                duration: 1, // Default to 1 hour based on slot structure
                totalAmount: slot.price,
                customerName: customerInfo.name,
                customerPhone: customerInfo.phone,
                customerEmail: customerInfo.email,
                guestInfo: {
                    name: customerInfo.name,
                    phone: customerInfo.phone,
                    email: customerInfo.email
                },
                sport: sport || 'Football',
                status: 'pending',
                paymentStatus: 'pending',
                userId: bookingData.userId || null,
                userType: bookingData.userId ? 'registered' : 'guest',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'bookings'), newBooking);
            console.log("✅ Booking created with ID:", docRef.id);

            return {
                success: true,
                bookingId: docRef.id,
                ...newBooking
            };
        } catch (error) {
            console.error("Error in createBooking:", error);
            throw error;
        }
    },

    /**
     * Fetches all bookings for a specific user.
     */
    async getUserBookings(userId) {
        if (!userId) return [];

        try {
            const bookingsRef = collection(db, 'bookings');
            const q = query(
                bookingsRef,
                where('userId', '==', userId)
                // Note: Ordering will require a composite index in Firestore.
                // We'll sort in memory for now to avoid setup hurdles for the user.
            );

            const querySnapshot = await getDocs(q);
            const bookings = [];

            querySnapshot.forEach((doc) => {
                bookings.push({ id: doc.id, ...doc.data() });
            });

            // Sort by date (descending - newest first)
            return bookings.sort((a, b) => {
                const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.dateString || 0);
                const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.dateString || 0);
                return dateB - dateA;
            });

        } catch (error) {
            console.error("Error fetching user bookings:", error);
            throw error;
        }
    }
};
