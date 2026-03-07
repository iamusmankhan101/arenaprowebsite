import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/bookingService';
import {
    User,
    Calendar,
    Clock,
    MapPin,
    ChevronRight,
    LogOut,
    Settings,
    ShoppingBag,
    Loader2,
    CheckCircle2,
    Clock3,
    AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookings');

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
            console.error("Logout error:", error);
        }
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'status-confirmed';
            case 'pending': return 'status-pending';
            case 'completed': return 'status-completed';
            default: return 'status-pending';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return <CheckCircle2 size={14} />;
            case 'pending': return <Clock3 size={14} />;
            case 'completed': return <ShoppingBag size={14} />;
            default: return <Clock3 size={14} />;
        }
    };

    if (loading) {
        return (
            <div className="profile-loading">
                <Loader2 className="animate-spin" size={40} />
                <p>Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <Navbar forceScrolled={true} />

            <div className="profile-container">
                <div className="profile-grid">
                    {/* Sidebar */}
                    <aside className="profile-sidebar">
                        <div className="user-info-card glass-card">
                            <div className="user-avatar-large">
                                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="user-details">
                                <h3>{user?.displayName || 'Arena User'}</h3>
                                <p>{user?.email}</p>
                            </div>
                        </div>

                        <nav className="profile-nav">
                            <button
                                className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('bookings')}
                            >
                                <Calendar size={20} /> My Bookings
                            </button>
                            <button
                                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <Settings size={20} /> Settings
                            </button>
                            <button className="nav-item logout" onClick={handleLogout}>
                                <LogOut size={20} /> Logout
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="profile-content">
                        <header className="content-header">
                            <h1>My Bookings</h1>
                            <p>Manage your upcoming and past venue reservations.</p>
                        </header>

                        {activeTab === 'bookings' && (
                            <div className="bookings-list">
                                {bookings.length === 0 ? (
                                    <div className="empty-bookings glass-card">
                                        <div className="empty-icon">
                                            <Calendar size={48} />
                                        </div>
                                        <h3>No bookings found</h3>
                                        <p>You haven't made any bookings yet. Explore our venues to get started!</p>
                                        <Link to="/venues" className="explore-btn">Explore Venues</Link>
                                    </div>
                                ) : (
                                    bookings.map((booking) => (
                                        <div key={booking.id} className="booking-item-card glass-card">
                                            <div className="booking-main-info">
                                                <div className="venue-img-placeholder">
                                                    <ShoppingBag size={24} />
                                                </div>
                                                <div className="booking-details">
                                                    <div className="booking-header">
                                                        <h4>{booking.turfName}</h4>
                                                        <span className={`status-badge ${getStatusStyle(booking.status)}`}>
                                                            {getStatusIcon(booking.status)}
                                                            {booking.status || 'Pending'}
                                                        </span>
                                                    </div>
                                                    <div className="booking-meta">
                                                        <span className="meta-item">
                                                            <Calendar size={14} />
                                                            {new Date(booking.dateString).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="meta-item">
                                                            <Clock size={14} /> {booking.timeSlot}
                                                        </span>
                                                        <span className="meta-item">
                                                            <MapPin size={14} /> ArenaPro Partner Venue
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="booking-actions">
                                                <div className="booking-price">
                                                    <span className="label">Amount</span>
                                                    <span className="value">Rs. {booking.totalAmount?.toLocaleString()}</span>
                                                </div>
                                                <button className="view-details-btn">
                                                    View Details <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="settings-section glass-card">
                                <div className="settings-header">
                                    <User size={24} />
                                    <h3>Account Details</h3>
                                </div>
                                <div className="settings-form">
                                    <div className="form-group-static">
                                        <label>Full Name</label>
                                        <p>{user?.displayName || 'Not provided'}</p>
                                    </div>
                                    <div className="form-group-static">
                                        <label>Email Address</label>
                                        <p>{user?.email}</p>
                                    </div>
                                    <div className="form-group-static">
                                        <label>Member Since</label>
                                        <p>{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                    <div className="settings-notice">
                                        <AlertCircle size={16} />
                                        <p>To update your profile information, please contact our support team.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProfilePage;
