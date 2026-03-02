import React from 'react';
import AreaPage from './AreaPage';

const wapdaTownVenues = [
    {
        id: 5,
        name: "Wapda Sports Arena",
        location: "Wapda Town, Lahore",
        rating: 4.5,
        reviews: 65,
        price: "1800 Pkr/Hour",
        sports: ["Cricket", "Futsal", "Badminton"],
        images: ["/image/app ui arena pro/3.png"],
        tags: ["Affordable", "Indoor", "Well-Maintained"]
    }
];

const WapdaTown = () => {
    return (
        <AreaPage
            areaName="Wapda Town"
            areaDescription="Discover sports facilities in Wapda Town. Affordable venues for cricket, futsal, and badminton."
            venues={wapdaTownVenues}
        />
    );
};

export default WapdaTown;
