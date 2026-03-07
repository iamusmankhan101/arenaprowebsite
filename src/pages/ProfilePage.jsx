import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import {
    User,
    Mail,
    Calendar,
    Clock,
    ChevronRight,
    Package,
    MapPin,
    Loader2,
    CalendarCheck2,
    History,
    LogOut
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchBookings = async () => {
            try {
                const userBookings = await bookingService.getUserBookings(user.uid);
                setBookings(userBookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const isUpcoming = (booking) => {
        const bookingDate = booking.date?.toDate ? booking.date.toDate() : new Date(booking.dateString);
        return bookingDate >= new Date().setHours(0, 0, 0, 0);
    };

    const upcomingBookings = bookings.filter(isUpcoming);
    const pastBookings = bookings.filter(b => !isUpcoming(b));

    const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

    if (loading) {
        return (
            <div className="profile-loading">
                <Loader2 className="animate-spin" size={48} color="#004d43" />
                <p>Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-page light-theme">
            <Navbar forceScrolled={true} />

            <div className="profile-hero">
                <div className="profile-container">
                    <div className="profile-header-content">
                        <div className="profile-avatar-large">
                            {user.displayName ? user.displayName[0].toUpperCase() : <User size={40} />}
                        </div>
                        <div className="profile-info-main">
                            <h1>{user.displayName || 'ArenaPro User'}</h1>
                            <p className="profile-email"><Mail size={16} /> {user.email}</p>
                        </div>
                        <button className="profile-logout-btn" onClick={handleLogout}>
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>
            </div>

            <main className="profile-container">
                <div className="profile-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        <CalendarCheck2 size={20} /> Upcoming Bookings
                        <span className="count-badge">{upcomingBookings.length}</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                        onClick={() => setActiveTab('past')}
                    >
                        <History size={20} /> Past Bookings
                        <span className="count-badge">{pastBookings.length}</span>
                    </button>
                </div>

                <div className="bookings-section">
                    {displayedBookings.length > 0 ? (
                        <div className="bookings-grid">
                            {displayedBookings.map((booking) => (
                                <div key={booking.id} className="booking-card glass-card">
                                    <div className="booking-card-header">
                                        <h3>{booking.turfName || 'Unnamed Venue'}</h3>
                                        <div className={`status-badge ${booking.status || 'pending'}`}>
                                            {booking.status || 'Pending'}
                                        </div>
                                    </div>

                                    <div className="booking-card-body">
                                        <div className="info-row">
                                            <Calendar size={18} />
                                            <span>{booking.dateString}</span>
                                        </div>
                                        <div className="info-row">
                                            <Clock size={18} />
                                            <span>{booking.timeSlot}</span>
                                        </div>
                                        <div className="info-row">
                                            <Package size={18} />
                                            <span>{booking.sport}</span>
                                        </div>
                                    </div>

                                    <div className="booking-card-footer">
                                        <div className="booking-price">
                                            <span>Amount Paid</span>
                                            <strong>{booking.totalAmount} Pkr</strong>
                                        </div>
                                        <button className="view-details-btn">
                                            Details <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <Calendar size={48} opacity={0.2} />
                            </div>
                            <h3>No bookings found</h3>
                            <p>You haven't made any {activeTab} bookings yet.</p>
                            <button className="book-now-btn" onClick={() => navigate('/venues')}>
                                Book a Venue
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;
