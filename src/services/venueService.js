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
                    tags: Array.isArray(data.facilities) ? data.facilities.slice(0, 3) : ["Premium", "Professional"]
                });
            });

            return venues;
        } catch (error) {
            console.error("Error fetching venues:", error);
            throw error;
        }
    },

    async getVenuesByArea(areaName) {
        try {
            const venuesRef = collection(db, 'venues');
            // Assuming the field in Firestore is 'area' or we check in address
            const q = query(venuesRef, where('status', '==', 'active'));
            const querySnapshot = await getDocs(q);

            const venues = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const venueArea = data.area || data.address || "";

                if (venueArea.toLowerCase().includes(areaName.toLowerCase())) {
                    venues.push({
                        id: doc.id,
                        name: data.name,
                        location: venueArea || "Lahore",
                        rating: data.rating || 4.5,
                        reviews: data.totalReviews || 0,
                        price: `${data.basePrice || 0} Pkr/Hour`,
                        sports: Array.isArray(data.sports) ? data.sports : [],
                        images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["/image/placeholder.png"],
                        tags: Array.isArray(data.facilities) ? data.facilities.slice(0, 3) : ["Premium", "Professional"]
                    });
                }
            });

            return venues;
        } catch (error) {
            console.error(`Error fetching venues for ${areaName}:`, error);
            throw error;
        }
    }
};
