import React from 'react';
import AreaPage from './AreaPage';

const dhaVenues = [
    {
        id: 3,
        name: "Can Games",
        location: "DHA Phase 5, Lahore",
        rating: 4.7,
        reviews: 92,
        price: "2500 Pkr/Hour",
        sports: ["Cricket", "Futsal"],
        images: ["/image/WhatsApp Image 2026-02-27 at 12.58.33 AM.jpeg"],
        tags: ["Premium", "Indoor", "Multi-Sport"]
    }
];

const DHA = () => {
    return (
        <AreaPage
            areaName="DHA"
            areaDescription="Explore elite sports venues in DHA. Premium facilities for cricket, futsal, padel, and tennis."
            venues={dhaVenues}
        />
    );
};

export default DHA;
