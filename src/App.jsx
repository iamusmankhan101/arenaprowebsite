import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
import HomePage from './pages/HomePage';
import HowItWorks from './pages/HowItWorks';
import Venues from './pages/Venues';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Waitlist from './pages/Waitlist';
import ListVenue from './pages/ListVenue';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import JoharTown from './pages/JoharTown';
import ModelTown from './pages/ModelTown';
import DHA from './pages/DHA';
import BahriaTown from './pages/BahriaTown';
import WapdaTown from './pages/WapdaTown';
import GoogleAuthRelay from './pages/GoogleAuthRelay';
import IndoorCricketLahore from './pages/IndoorCricketLahore';
import SportsVenueBooking from './pages/SportsVenueBooking';
import PadelCourtLahore from './pages/PadelCourtLahore';
import FutsalGroundLahore from './pages/FutsalGroundLahore';
import BadmintonBookingLahore from './pages/BadmintonBookingLahore';
import PadelCourtsNearMe from './pages/PadelCourtsNearMe';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <div className="app">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/indoor-cricket-lahore" element={<IndoorCricketLahore />} />
                        <Route path="/padel-court-lahore" element={<PadelCourtLahore />} />
                        <Route path="/padel-courts-near-me" element={<PadelCourtsNearMe />} />
                        <Route path="/futsal-ground-lahore" element={<FutsalGroundLahore />} />
                        <Route path="/badminton-court-lahore" element={<BadmintonBookingLahore />} />
                        <Route path="/sports-venue-booking" element={<SportsVenueBooking />} />
                        <Route path="/how-it-works" element={<HowItWorks />} />
                        <Route path="/venues" element={<Venues />} />
                        <Route path="/venues/johar-town" element={<JoharTown />} />
                        <Route path="/venues/model-town" element={<ModelTown />} />
                        <Route path="/venues/dha" element={<DHA />} />
                        <Route path="/venues/bahria-town" element={<BahriaTown />} />
                        <Route path="/venues/wapda-town" element={<WapdaTown />} />
                        <Route path="/book/:venueId" element={<BookingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsAndConditions />} />
                        <Route path="/waitlist" element={<Waitlist />} />
                        <Route path="/list-venue" element={<ListVenue />} />
                        <Route path="/auth/google" element={<GoogleAuthRelay />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

