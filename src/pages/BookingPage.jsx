import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { venueService } from '../services/venueService';
import { bookingService } from '../services/bookingService';
import './BookingPage.css';

const BookingPage = () => {
    const { venueId } = useParams();
    const navigate = useNavigate();

    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Form State
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        const fetchVenueData = async () => {
            try {
                const foundVenue = await venueService.getVenueById(venueId);
                setVenue(foundVenue);
            } catch (error) {
                console.error("Error fetching venue:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenueData();
    }, [venueId]);

    useEffect(() => {
        const fetchSlots = async () => {
            if (!venueId || !selectedDate) return;

            try {
                const availableSlots = await bookingService.getAvailableSlots(venueId, selectedDate);
                setSlots(availableSlots);
                setSelectedSlot(null); // Reset selection when date changes
            } catch (error) {
                console.error("Error fetching slots:", error);
            }
        };

        fetchSlots();
    }, [venueId, selectedDate]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedSlot) return;

        setBookingLoading(true);
        try {
            await bookingService.createBooking({
                venueId,
                venueName: venue.name,
                dateString: selectedDate,
                slot: selectedSlot,
                customerInfo,
                sport: venue.sports[0]
            });
            setBookingSuccess(true);
        } catch (error) {
            alert("Booking failed. Please try again.");
            console.error(error);
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader2 className="animate-spin" size={48} color="#e8ee26" />
                <p>Loading Venue Details...</p>
            </div>
        );
    }

    if (!venue) {
        return (
            <div className="error-screen">
                <Navbar />
                <div className="error-content">
                    <h1>Venue Not Found</h1>
                    <button onClick={() => navigate('/venues')}>Back to Venues</button>
                </div>
            </div>
        );
    }

    if (bookingSuccess) {
        return (
            <div className="success-screen">
                <Navbar />
                <div className="success-card">
                    <CheckCircle2 color="#e8ee26" size={80} />
                    <h2>Booking Received!</h2>
                    <p>Thank you, {customerInfo.name}. Your booking for <strong>{venue.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedSlot.startTime || selectedSlot.time}</strong> has been submitted.</p>
                    <p>Our team will contact you shortly to confirm.</p>
                    <button onClick={() => navigate('/venues')} className="primary-btn">Back to Venues</button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="booking-page">
            <Navbar />

            <div className="booking-container">
                <button className="back-link" onClick={() => navigate(-1)}>
                    <ChevronLeft size={20} /> Back
                </button>

                <div className="booking-grid">
                    {/* Left Side: Details & Slot Selection */}
                    <div className="booking-details">
                        <div className="venue-header-small">
                            <h1>Book {venue.name}</h1>
                            <p className="area-text"><Calendar size={16} /> {venue.location}</p>
                        </div>

                        <div className="selection-section">
                            <h3>1. Select Date</h3>
                            <div className="date-input-wrapper">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="date-picker"
                                />
                            </div>
                        </div>

                        <div className="selection-section">
                            <h3>2. Select Time Slot</h3>
                            <div className="slots-grid">
                                {slots.length > 0 ? (
                                    slots.map((slot) => (
                                        <button
                                            key={slot.id}
                                            disabled={slot.isBooked}
                                            className={`slot-pill ${selectedSlot?.id === slot.id ? 'active' : ''} ${slot.isBooked ? 'booked' : ''}`}
                                            onClick={() => setSelectedSlot(slot)}
                                        >
                                            <span className="slot-time">{slot.startTime || slot.time}</span>
                                            <span className="slot-price">{slot.price} Pkr</span>
                                            {slot.isBooked && <span className="booked-badge">Booked</span>}
                                        </button>
                                    ))
                                ) : (
                                    <p className="no-slots">No slots available for this date.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Information Form */}
                    <div className="booking-form-container">
                        <div className="booking-form-card">
                            <h3>3. Your Information</h3>
                            <form onSubmit={handleBooking}>
                                <div className="form-group">
                                    <label><User size={16} /> Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        value={customerInfo.name}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><Phone size={16} /> Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="03xx xxxxxxx"
                                        value={customerInfo.phone}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label><Mail size={16} /> Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={customerInfo.email}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                    />
                                </div>

                                <div className="booking-summary">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>{selectedSlot ? `${selectedSlot.price} Pkr` : '0 Pkr'}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span>{selectedSlot ? `${selectedSlot.price} Pkr` : '0 Pkr'}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="confirm-btn"
                                    disabled={!selectedSlot || bookingLoading}
                                >
                                    {bookingLoading ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                                </button>
                                {!selectedSlot && <p className="selection-hint">Please select a time slot to continue</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BookingPage;
