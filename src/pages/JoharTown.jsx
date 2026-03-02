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
        images: ["/image/WhatsApp Image 2026-03-02 at 3.49.53 PM.jpeg"],
        tags: ["Indoor", "Net Practice", "Affordable"]
    },
    {
        id: 2,
        name: "Sports Pitch Arena",
        location: "Nasheman Iqbal Phase 1, Johar Town",
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

const JoharTown = () => {
    return (
        <AreaPage
            areaName="Johar Town"
            areaDescription="Discover premium sports venues in Johar Town. Book Indoor cricket nets, futsal courts, and more."
            venues={joharTownVenues}
        />
    );
};

export default JoharTown;
