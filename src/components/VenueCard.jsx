import React from 'react';
import { Star, CheckCircle2, Heart, Mail, MapPin } from 'lucide-react';
import './VenueCard.css';

const VenueCard = ({ venue }) => {
    // Ensure data exists with fallbacks
    const {
        id,
        name = "Arena",
        location = "Lahore",
        rating = 4.5,
        price = "0 Pkr/Hour",
        images = ["/image/placeholder.png"],
        sports = []
    } = venue;

    const priceAmount = price.replace(/[^0-9]/g, '');

    return (
        <div className="premium-venue-card">
            <div className="card-inner">
                <img
                    src={images[0]}
                    alt={name}
                    className="card-bg-img"
                />
                <div className="card-blur-bg" />
                <div className="card-content">
                    <div className="card-header">
                        <h3 className="card-title">
                            {name}
                            <CheckCircle2 className="verified-check" size={18} />
                        </h3>
                        <div className="card-location-row">
                            <MapPin size={14} />
                            <span>{location}</span>
                        </div>
                    </div>

                    <div className="card-stats">
                        <div className="stat-col">
                            <div className="stat-val">
                                <Star size={14} fill="#e8ee26" color="#e8ee26" />
                                {rating}
                            </div>
                            <div className="stat-label">Rating</div>
                        </div>
                        <div className="stat-v-divider"></div>
                        <div className="stat-col">
                            <div className="stat-val">Rs {priceAmount}/Hour</div>
                            <div className="stat-label">Price</div>
                        </div>
                    </div>

                    <div className="card-actions">
                        <button
                            className="action-main-btn"
                            onClick={() => window.location.href = `/book/${id}`}
                        >
                            <Mail size={18} />
                            Book Now
                        </button>
                        <button className="action-save-btn">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueCard;
