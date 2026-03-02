import React from 'react';
import AreaPage from './AreaPage';

const bahriaTownVenues = [
    {
        id: 4,
        name: "Arena Sports Complex",
        location: "Bahria Town, Lahore",
        rating: 4.6,
        reviews: 78,
        price: "2000 Pkr/Hour",
        sports: ["Cricket", "Futsal", "Tennis"],
        images: ["/image/app ui arena pro/2.png"],
        tags: ["Modern", "Indoor", "Family-Friendly"]
    }
];

const BahriaTown = () => {
    return (
        <AreaPage
            areaName="Bahria Town"
            areaDescription="Book sports venues in Bahria Town. Modern facilities with cricket, futsal, and tennis courts."
            venues={bahriaTownVenues}
        />
    );
};

export default BahriaTown;
