import React from 'react';
import { Link } from 'react-router-dom';
import './MoreSports.css';

const ALL_SPORTS = [
    {
        slug: 'futsal',
        label: 'Futsal',
        path: '/futsal-ground-lahore',
        anchor: 'Book futsal grounds in Lahore',
        emoji: '⚽',
    },
    {
        slug: 'padel',
        label: 'Padel',
        path: '/padel-court-lahore',
        anchor: 'Find padel courts in Lahore',
        emoji: '🎾',
    },
    {
        slug: 'cricket',
        label: 'Indoor Cricket',
        path: '/indoor-cricket-lahore',
        anchor: 'Book indoor cricket venues',
        emoji: '🏏',
    },
];

// currentSport: 'futsal' | 'padel' | 'cricket'
const MoreSports = ({ currentSport }) => {
    const others = ALL_SPORTS.filter(s => s.slug !== currentSport);

    return (
        <section className="more-sports-section">
            <h2 className="more-sports-title">More Sports at Arena Pro</h2>
            <p className="more-sports-sub">Explore other sports available on the platform</p>
            <div className="more-sports-grid">
                {others.map(sport => (
                    <Link key={sport.slug} to={sport.path} className="more-sports-card">
                        <span className="more-sports-emoji">{sport.emoji}</span>
                        <span className="more-sports-label">{sport.label}</span>
                        <span className="more-sports-anchor">{sport.anchor} →</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MoreSports;
