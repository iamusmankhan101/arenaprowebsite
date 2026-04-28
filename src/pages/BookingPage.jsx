import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, ChevronLeft, Loader2, CheckCircle2, Lock, Upload, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { venueService } from '../services/venueService';
import { bookingService } from '../services/bookingService';
import { emailService } from '../services/emailService';
import { whatsappService } from '../services/whatsappService';
import { useAuth } from '../context/AuthContext';
import { todayPKT, currentMinutesPKT } from '../utils/dateUtils';
import './BookingPage.css';

const BookingPage = () => {
    const { venueId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

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
    const [availableDates, setAvailableDates] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('advance'); // 'advance' or 'full'
    const [paymentType, setPaymentType] = useState('easypaisa'); // 'easypaisa' or 'bank'
    
    // Screenshot upload states
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedScreenshot, setUploadedScreenshot] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setCustomerInfo(prev => ({
                ...prev,
                name: user.displayName || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    // Scroll to top when booking is successful
    useEffect(() => {
        if (bookingSuccess) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [bookingSuccess]);

    useEffect(() => {
        const fetchVenueData = async () => {
            try {
                const foundVenue = await venueService.getVenueById(venueId);
                
                if (!foundVenue) {
                    console.error("Venue not found");
                    setLoading(false);
                    return;
                }
                
                setVenue(foundVenue);

                // Extract available dates from dateSpecificSlots
                if (foundVenue?.dateSpecificSlots) {
                    const todayStr = todayPKT();
                    const nowMinutes = currentMinutesPKT();

                    const dates = Object.keys(foundVenue.dateSpecificSlots)
                        .filter(d => {
                            if (d > todayStr) return true;
                            if (d < todayStr) return false;
                            // today: only show if at least one slot hasn't started yet
                            const slots = foundVenue.dateSpecificSlots[d] || [];
                            return slots.some(slot => {
                                const timeStr = slot.startTime || slot.time || '';
                                if (!timeStr) return false;
                                let slotHour = 0, slotMin = 0;
                                const upper = timeStr.toUpperCase();
                                if (upper.includes('AM') || upper.includes('PM')) {
                                    const [t, modifier] = timeStr.trim().split(' ');
                                    let [h, m] = t.split(':').map(Number);
                                    if (modifier?.toUpperCase() === 'PM' && h !== 12) h += 12;
                                    if (modifier?.toUpperCase() === 'AM' && h === 12) h = 0;
                                    slotHour = h; slotMin = m;
                                } else {
                                    [slotHour, slotMin] = timeStr.split(':').map(Number);
                                }
                                return (slotHour * 60 + slotMin) > nowMinutes;
                            });
                        })
                        .sort();

                    setAvailableDates(dates);
                    if (dates.length > 0 && !dates.includes(todayStr)) {
                        setSelectedDate(dates[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching venue:", error);
            } finally {
                setLoading(false);
            }
        };

        // Add timeout to prevent infinite loading
        const timeout = setTimeout(() => {
            if (loading) {
                console.error("Venue loading timeout");
                setLoading(false);
            }
        }, 10000); // 10 second timeout

        fetchVenueData();

        return () => clearTimeout(timeout);
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
        if (!selectedSlot || !user) return;

        const today = todayPKT();
        if (selectedDate < today) {
            alert("You cannot book a slot for a past date.");
            return;
        }

        // If payment method requires screenshot (easypaisa or bank), show upload modal
        if (paymentType === 'easypaisa' || paymentType === 'bank') {
            setShowUploadModal(true);
            return;
        }

        // For other payment methods, proceed directly
        await processBooking();
    };

    const processBooking = async () => {
        setBookingLoading(true);
        try {
            const bookingData = {
                venueId,
                venueName: venue.name,
                dateString: selectedDate,
                slot: selectedSlot,
                customerInfo,
                sport: venue.sports[0],
                userId: user.uid,
                paymentMethod,
                paymentType,
                paymentScreenshot: uploadedScreenshot // Include screenshot if uploaded
            };

            const bookingResponse = await bookingService.createBooking(bookingData);

            // Trigger Email Confirmation (don't await to keep UI snappy)
            emailService.sendBookingEmail({
                venueName: venue.name,
                dateString: selectedDate,
                slot: selectedSlot,
                customerInfo
            }).catch(err => console.error("Async email error:", err));

            // Trigger WhatsApp Notification if phone is provided
            if (customerInfo.phone) {
                whatsappService.sendBookingNotification({
                    customerName: customerInfo.name,
                    phone: customerInfo.phone,
                    venueName: venue.name,
                    date: selectedDate,
                    time: selectedSlot.startTime || selectedSlot.time,
                    amount: selectedSlot.price
                });
            }

            setBookingSuccess(true);
            setShowUploadModal(false);
        } catch (error) {
            alert("Booking failed. Please try again.");
            console.error(error);
        } finally {
            setBookingLoading(false);
        }
    };

    const handleScreenshotUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setUploadedScreenshot({
                        file: file,
                        preview: e.target.result,
                        name: file.name
                    });
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload an image file (JPG, PNG, etc.)');
            }
        }
    };

    const handleConfirmWithScreenshot = async () => {
        if (!uploadedScreenshot) {
            alert('Please upload a payment screenshot first.');
            return;
        }
        await processBooking();
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader2 className="animate-spin" size={48} color="#004d43" />
                <p>Loading Venue Details...</p>
            </div>
        );
    }

    if (!venue) {
        return (
            <div className="error-screen">
                <Navbar forceScrolled={true} />
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
                <Navbar forceScrolled={true} />
                <div className="success-card">
                    <CheckCircle2 color="#004d43" size={80} />
                    <h2>Booking Received!</h2>
                    <p>Thank you, {customerInfo.name}. Your booking for <strong>{venue.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedSlot?.startTime || selectedSlot?.time}</strong> has been submitted.</p>
                    <p>Our team will contact you shortly to confirm.</p>
                    <button onClick={() => navigate('/venues')} className="primary-btn">Back to Venues</button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="booking-page light-theme">
            <Navbar forceScrolled={true} />

            {/* Hero Section */}
            <div
                className="booking-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${venue.images?.[0] || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80'})`
                }}
            >
                <div className="hero-content">
                    <button className="back-btn-hero" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <h1>{venue.name}</h1>
                    <p className="hero-location"><Calendar size={20} /> {venue.location}</p>
                </div>
            </div>

            <div className="booking-container">
                <div className="booking-grid">
                    {/* Left Side: Details & Slot Selection */}
                    <div className="booking-details">
                        <div className="selection-section">
                            <h3 className="section-title">
                                <span className="section-number">1</span>
                                Select Date
                            </h3>

                            {/* Available Date Chips */}
                            {availableDates.length > 0 && (
                                <div className="available-dates">
                                    <p className="available-dates-label">Available dates:</p>
                                    <div className="date-chips">
                                        {availableDates.map(date => (
                                            <button
                                                key={date}
                                                className={`date-chip ${selectedDate === date ? 'active' : ''}`}
                                                onClick={() => setSelectedDate(date)}
                                            >
                                                {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="selection-section">
                            <h3 className="section-title">
                                <span className="section-number">2</span>
                                Select Time Slot
                            </h3>
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
                                            {slot.isBooked && <span className="booked-badge">Reserved</span>}
                                        </button>
                                    ))
                                ) : (
                                    <div className="glass-card no-slots-card">
                                        <Clock size={32} opacity={0.5} />
                                        <p>No slots available for this date.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Information Form with Guard */}
                    <div className="booking-form-container">
                        <div className="glass-card booking-form-card">
                            <h3 className="section-title">
                                <span className="section-number">3</span>
                                Finish Booking
                            </h3>

                            {!user ? (
                                <div className="auth-guard-overlay">
                                    <div className="guard-content">
                                        <Lock size={40} className="guard-icon" />
                                        <h4>Sign in Required</h4>
                                        <p>Please sign in to your accounts to continue with the booking.</p>
                                        <button
                                            className="login-redirect-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                console.log('Sign in button clicked');
                                                navigate('/login', { state: { from: window.location.pathname } });
                                            }}
                                        >
                                            Sign In to Book
                                        </button>
                                        <p className="signup-hint">Don't have an account? <Link to="/signup">Sign up</Link></p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleBooking}>
                                    <div className="form-group">
                                        <label><User size={16} /> Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            value={customerInfo.name}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                            readOnly={user?.displayName}
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
                                            readOnly={user?.email}
                                        />
                                    </div>

                                    <div className="booking-summary">
                                        <div className="summary-row">
                                            <span>Venue</span>
                                            <span style={{ color: '#004d43', fontWeight: 600 }}>{venue.name}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Date</span>
                                            <span style={{ color: '#004d43', fontWeight: 600 }}>{selectedDate}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Time Slot</span>
                                            <span style={{ color: '#004d43', fontWeight: 600 }}>
                                                {selectedSlot ? (selectedSlot.startTime || selectedSlot.time) : 'Not selected'}
                                            </span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Slot Price</span>
                                            <span style={{ color: '#666', fontWeight: 600 }}>{selectedSlot ? `${selectedSlot.price} Pkr` : '0 Pkr'}</span>
                                        </div>
                                        <div className="summary-row total">
                                            <span>Amount to Pay</span>
                                            <span style={{ color: '#004d43' }}>
                                                {selectedSlot ? `${paymentMethod === 'advance' ? Math.round(selectedSlot.price * 0.15) : selectedSlot.price} Pkr` : '0 Pkr'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Payment Options */}
                                    <div className="payment-section">
                                        <h4 className="payment-title">Payment Options</h4>
                                        
                                        {/* Payment Method Selection */}
                                        <div className="payment-method-group">
                                            <label className="payment-option">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="advance"
                                                    checked={paymentMethod === 'advance'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <div className="payment-option-content">
                                                    <span className="payment-option-title">15% Advance Payment</span>
                                                    <span className="payment-option-desc">
                                                        Pay {selectedSlot ? Math.round(selectedSlot.price * 0.15) : 0} Pkr now, rest at venue
                                                    </span>
                                                </div>
                                            </label>

                                            <label className="payment-option">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="full"
                                                    checked={paymentMethod === 'full'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <div className="payment-option-content">
                                                    <span className="payment-option-title">Pay Full Amount</span>
                                                    <span className="payment-option-desc">
                                                        Pay {selectedSlot ? selectedSlot.price : 0} Pkr online
                                                    </span>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Payment Type Selection */}
                                        <div className="payment-type-group">
                                            <label className="payment-type-option">
                                                <input
                                                    type="radio"
                                                    name="paymentType"
                                                    value="easypaisa"
                                                    checked={paymentType === 'easypaisa'}
                                                    onChange={(e) => setPaymentType(e.target.value)}
                                                />
                                                <div className="payment-type-content">
                                                    <img src="/image/Easypaisa-logo.png" alt="Easypaisa" className="payment-logo" />
                                                    <span>Easypaisa</span>
                                                </div>
                                            </label>

                                            <label className="payment-type-option">
                                                <input
                                                    type="radio"
                                                    name="paymentType"
                                                    value="bank"
                                                    checked={paymentType === 'bank'}
                                                    onChange={(e) => setPaymentType(e.target.value)}
                                                />
                                                <div className="payment-type-content">
                                                    <span className="bank-icon">🏦</span>
                                                    <span>Bank Transfer</span>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Payment Details - shown based on selected type */}
                                        {paymentType === 'easypaisa' && (
                                            <div className="payment-details-card easypaisa-details">
                                                <div className="payment-details-header">
                                                    <img src="/image/Easypaisa-logo.png" alt="Easypaisa" className="payment-details-logo" />
                                                    <span>Send payment to</span>
                                                </div>
                                                <div className="payment-details-row">
                                                    <span className="payment-details-label">Account Name</span>
                                                    <span className="payment-details-value">Muhammad Usman Khan</span>
                                                </div>
                                                <div className="payment-details-row">
                                                    <span className="payment-details-label">Mobile Number</span>
                                                    <span className="payment-details-value highlight">0305-8562523</span>
                                                </div>
                                                <p className="payment-details-note">Send the exact amount and share screenshot via WhatsApp to confirm.</p>
                                            </div>
                                        )}

                                        {paymentType === 'bank' && (
                                            <div className="payment-details-card bank-details">
                                                <div className="payment-details-header">
                                                    <span className="bank-icon-lg">🏦</span>
                                                    <span>Bank Transfer Details</span>
                                                </div>
                                                <div className="payment-details-row">
                                                    <span className="payment-details-label">Bank</span>
                                                    <span className="payment-details-value">Bank Alfalah</span>
                                                </div>
                                                <div className="payment-details-row">
                                                    <span className="payment-details-label">Account No.</span>
                                                    <span className="payment-details-value highlight">56565002675200</span>
                                                </div>
                                                <div className="payment-details-row">
                                                    <span className="payment-details-label">Account Name</span>
                                                    <span className="payment-details-value">Muhammad Usman Khan</span>
                                                </div>
                                                <p className="payment-details-note">Transfer the exact amount and share receipt via WhatsApp to confirm.</p>
                                            </div>
                                        )}

                                    </div>

                                    <button
                                        type="submit"
                                        className="confirm-btn"
                                        disabled={!selectedSlot || bookingLoading}
                                    >
                                        {bookingLoading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={20} />
                                                Confirm Reservation
                                            </>
                                        )}
                                    </button>
                                    {!selectedSlot && <p className="selection-hint">Please select a time slot to continue</p>}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshot Upload Modal */}
            {showUploadModal && (
                <div className="upload-modal-overlay">
                    <div className="upload-modal">
                        <div className="upload-modal-header">
                            <h3>Upload Payment Screenshot</h3>
                            <button 
                                className="close-modal-btn"
                                onClick={() => setShowUploadModal(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="upload-modal-content">
                            <div className="payment-info">
                                {paymentType === 'easypaisa' ? (
                                    <div className="payment-details-display">
                                        <img src="/image/Easypaisa-logo.png" alt="Easypaisa" className="payment-logo-large" />
                                        <div className="payment-info-row">
                                            <span>Account Name:</span>
                                            <strong>Muhammad Usman Khan</strong>
                                        </div>
                                        <div className="payment-info-row">
                                            <span>Mobile Number:</span>
                                            <strong>0305-8562523</strong>
                                        </div>
                                        <div className="payment-info-row">
                                            <span>Amount to Send:</span>
                                            <strong className="amount-highlight">
                                                {selectedSlot ? `${paymentMethod === 'advance' ? Math.round(selectedSlot.price * 0.15) : selectedSlot.price} PKR` : '0 PKR'}
                                            </strong>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="payment-details-display">
                                        <div className="bank-header">
                                            <span className="bank-icon-large">🏦</span>
                                            <span>Bank Transfer</span>
                                        </div>
                                        <div className="payment-info-row">
                                            <span>Bank:</span>
                                            <strong>Bank Alfalah</strong>
                                        </div>
                                        <div className="payment-info-row">
                                            <span>Account No.:</span>
                                            <strong>56565002675200</strong>
                                        </div>
                                        <div className="payment-info-row">
                                            <span>Account Name:</span>
                                            <strong>Muhammad Usman Khan</strong>
                                        </div>
                                        <div className="payment-info-row">
                                            <span>Amount to Transfer:</span>
                                            <strong className="amount-highlight">
                                                {selectedSlot ? `${paymentMethod === 'advance' ? Math.round(selectedSlot.price * 0.15) : selectedSlot.price} PKR` : '0 PKR'}
                                            </strong>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="upload-section">
                                <p className="upload-instruction">
                                    Please send the payment and upload a screenshot of the transaction:
                                </p>
                                
                                <div className="upload-area">
                                    <input
                                        type="file"
                                        id="screenshot-upload"
                                        accept="image/*"
                                        onChange={handleScreenshotUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="screenshot-upload" className="upload-label">
                                        <Upload size={32} />
                                        <span>Click to upload screenshot</span>
                                        <small>JPG, PNG, or other image formats</small>
                                    </label>
                                </div>

                                {uploadedScreenshot && (
                                    <div className="uploaded-preview">
                                        <img 
                                            src={uploadedScreenshot.preview} 
                                            alt="Payment Screenshot" 
                                            className="screenshot-preview"
                                        />
                                        <p className="upload-success">✅ Screenshot uploaded: {uploadedScreenshot.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="upload-modal-footer">
                            <button 
                                className="cancel-btn"
                                onClick={() => setShowUploadModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="confirm-booking-btn"
                                onClick={handleConfirmWithScreenshot}
                                disabled={!uploadedScreenshot || bookingLoading}
                            >
                                {bookingLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Confirm Booking
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default BookingPage;
