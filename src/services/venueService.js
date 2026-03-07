import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const venueService = {
    async getVenues() {
        try {
            const venuesRef = collection(db, 'venues');
            const q = query(venuesRef, where('status', '==', 'active'));
            const querySnapshot = await getDocs(q);

            const venues = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                venues.push({
                    id: doc.id,
                    name: data.name,
                    location: data.address || data.area || "Lahore",
                    rating: data.rating || 4.5,
                    reviews: data.totalReviews || 0,
                    price: `${data.basePrice || 0} Pkr/Hour`,
                    sports: Array.isArray(data.sports) ? data.sports : [],
                    images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["/image/placeholder.png"],
                    tags: Array.isArray(data.facilities) ? data.facilities.slice(0, 3) : ["Premium", "Professional"],
                    timeSlots: data.timeSlots || [],
                    dateSpecificSlots: data.dateSpecificSlots || {}
                });
            });

            return venues;
        } catch (error) {
            console.error("Error fetching venues:", error);
            return [];
        }
    },

    async getVenueById(venueId) {
        try {
            const venueRef = doc(db, 'venues', venueId);
            const venueSnap = await getDoc(venueRef);

            if (venueSnap.exists()) {
                const data = venueSnap.data();
                return {
                    id: venueSnap.id,
                    ...data,
                    location: data.address || data.area || "Lahore",
                    price: `${data.basePrice || 0} Pkr/Hour`,
                    sports: Array.isArray(data.sports) ? data.sports : [],
                    images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["/image/placeholder.png"],
                };
            }
            return null;
        } catch (error) {
            console.error("Error fetching venue by ID:", error);
            return null;
        }
    },

    async getVenuesByArea(areaName) {
        try {
            const venuesRef = collection(db, 'venues');
            // Assuming the field in Firestore is 'area' or we check in address
            const q = query(
                venuesRef,
                where('area', '==', areaName),
                where('status', '==', 'active')
            );
            const querySnapshot = await getDocs(q);

            const venues = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // The query now filters by area directly, so no need for manual filtering here.
                // const venueArea = data.area || data.address || "";
                // if (venueArea.toLowerCase().includes(areaName.toLowerCase())) {
                venues.push({
                    id: doc.id,
                    name: data.name,
                    location: data.address || data.area || "Lahore", // Use data.area as it's filtered by query
                    rating: data.rating || 4.5,
                    reviews: data.totalReviews || 0,
                    price: `${data.basePrice || 0} Pkr/Hour`,
                    sports: Array.isArray(data.sports) ? data.sports : [],
                    images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["/image/placeholder.png"],
                    tags: Array.isArray(data.facilities) ? data.facilities.slice(0, 3) : ["Premium", "Professional"],
                    timeSlots: data.timeSlots || [],
                    dateSpecificSlots: data.dateSpecificSlots || {}
                });
                // }
            });

            return venues;
        } catch (error) {
            console.error(`Error fetching venues for ${areaName}:`, error);
            throw error;
        }
    }
};
