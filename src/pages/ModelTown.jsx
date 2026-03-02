import React from 'react';
import AreaPage from './AreaPage';

const modelTownVenues = [
    {
        id: 2,
        name: "Sports Pitch Arena",
        location: "Model Town, Lahore",
        rating: 4.9,
        reviews: 84,
        price: "1700 Pkr/Hour",
        sports: ["Cricket", "Futsal"],
        images: [
            "/image/sports pitch arena 1.png",
            "/image/sports pitch arena.png"
        ],
        tags: ["Premium", "Indoor", "Professional"]
    }
];

const ModelTown = () => {
    return (
        <AreaPage
            areaName="Model Town"
            areaDescription="Find top-rated sports facilities in Model Town. Professional venues for cricket, futsal, and more."
            venues={modelTownVenues}
        />
    );
};

export default ModelTown;
