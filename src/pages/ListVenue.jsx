import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, Phone } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import './ListVenue.css';

const ListVenue = () => {
    const [formData, setFormData] = useState({
        venueName: '',
        yourName: '',
        facilityType: [],
        city: '',
        area: '',
        whatsappNumber: '',
        logo: null
    });

    useSEO(
        'List Your Venue - Arena Pro | Get More Bookings',
        'List your padel, cricket, or futsal venue on Arena Pro for FREE. Get discovered by players and manage bookings via WhatsApp.',
        'https://arenapropk.online/list-venue'
    );

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFacilityToggle = (facility) => {
        setFormData(prev => ({
            ...prev,
            facilityType: prev.facilityType.includes(facility)
                ? prev.facilityType.filter(f => f !== facility)
                : [...prev.facilityType, facility]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission
    };

    const facilities = ['Padel', 'Cricket', 'Futsal', 'Pickleball', 'Beach volleyball', 'Multiple sports'];
    const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

    return (
        <div className="list-venue-page">
            <Navbar forceScrolled={true} />

            <div className="list-venue-container">
                <div className="list-venue-content">
                    {/* Left Column - Benefits */}
                    <div className="list-venue-left">
                        <span className="list-venue-eyebrow">FOR FACILITY OWNERS</span>
                        <h1 className="list-venue-title">Get more bookings for your courts</h1>
                        <p className="list-venue-subtitle">
                            List your padel or indoor cricket venue for <strong>FREE</strong>
                        </p>
                        <p className="list-venue-description">
                            Players discover you and book via WhatsApp.
                        </p>

                        <div className="list-venue-benefits">
                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <Check size={20} />
                                </div>
                                <div className="benefit-text">
                                    <h3>No card</h3>
                                    <p>Free to list your venue</p>
                                </div>
                            </div>

                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <Check size={20} />
                                </div>
                                <div className="benefit-text">
                                    <h3>Takes 60 seconds</h3>
                                    <p>Quick and easy setup</p>
                                </div>
                            </div>

                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <Check size={20} />
                                </div>
                                <div className="benefit-text">
                                    <h3>We help you setup</h3>
                                    <p>Full support from our team</p>
                                </div>
                            </div>
                        </div>

                        <Link to="/waitlist" className="list-venue-cta-btn">
                            GET STARTED (FREE)
                        </Link>

                        <div className="list-venue-features">
                            <div className="feature-item">
                                <h4>Fill empty slots</h4>
                                <p>Players browse real times and request the slot they want — less back-and-forth.</p>
                            </div>

                            <div className="feature-item">
                                <h4>WhatsApp, not another inbox</h4>
                                <p>Booking land where you already work. You stay in control of confirmations.</p>
                            </div>

                            <div className="feature-item">
                                <h4>Simple partner model</h4>
                                <p>No upfront listing fee.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="list-venue-right">
                        <div className="list-venue-form-card">
                            <div className="form-header">
                                <h2>Create your listing</h2>
                                <span className="form-badge">90 sec</span>
                            </div>
                            <p className="form-subtitle">
                                We'll help you set everything up after signup. No technical work needed.
                            </p>

                            <form onSubmit={handleSubmit} className="venue-form">
                                <div className="form-row">
                                    <div className="form-field">
                                        <label>Venue name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Pine Padel Club"
                                            value={formData.venueName}
                                            onChange={(e) => handleInputChange('venueName', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label>Your name</label>
                                        <input
                                            type="text"
                                            placeholder="Owner or manager"
                                            value={formData.yourName}
                                            onChange={(e) => handleInputChange('yourName', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Facility type</label>
                                    <div className="facility-grid">
                                        {facilities.map(facility => (
                                            <button
                                                key={facility}
                                                type="button"
                                                className={`facility-btn ${formData.facilityType.includes(facility) ? 'active' : ''}`}
                                                onClick={() => handleFacilityToggle(facility)}
                                            >
                                                {facility}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label>City</label>
                                        <select
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            required
                                        >
                                            <option value="">Select city</option>
                                            {cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-field">
                                        <label>Area</label>
                                        <input
                                            type="text"
                                            placeholder="Neighborhood or district"
                                            value={formData.area}
                                            onChange={(e) => handleInputChange('area', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>WhatsApp number</label>
                                    <p className="field-hint">For bookings and admin login. Include country code (+92).</p>
                                    <div className="phone-input-wrapper">
                                        <Phone size={18} className="phone-icon" />
                                        <input
                                            type="tel"
                                            placeholder="+92"
                                            value={formData.whatsappNumber}
                                            onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Logo (optional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleInputChange('logo', e.target.files[0])}
                                        className="file-input"
                                    />
                                </div>

                                <button type="submit" className="form-submit-btn">
                                    START GETTING BOOKINGS
                                </button>

                                <p className="form-footer-text">
                                    Join early partner venues across Pakistan 🇵🇰
                                </p>
                            </form>

                            <div className="what-happens-next">
                                <h3>What happens next?</h3>
                                <ol>
                                    <li>We contact you on WhatsApp</li>
                                    <li>We set up your venue for you</li>
                                    <li>You start receiving bookings</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ListVenue;
