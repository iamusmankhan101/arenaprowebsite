import React from 'react';
import AreaPage from './AreaPage';

const joharTownVenues = [
    {
        id: 1,
        name: "Super Sixes",
        location: "Nasheman Iqbal Phase 1, Johar Town",
        rating: 4.8,
        reviews: 156,
        price: "1700 Pkr/Hour",
        sports: ["Cricket", "Futsal"],
        images: ["/image/app ui arena pro/1.png"],
        tags: ["Indoor", "Net Practice", "Affordable"]
    }
];

const JoharTown = () => {
    return (
        <AreaPage
            areaName="Johar Town"
            areaDescription="Discover premium sports venues in Johar Town. Book cricket nets, futsal courts, and more."
            venues={joharTownVenues}
        />
    );
};

export default JoharTown;
