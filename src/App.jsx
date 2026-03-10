import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import HowItWorks from './pages/HowItWorks';
import Venues from './pages/Venues';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Waitlist from './pages/Waitlist';
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

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
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
                        <Route path="/waitlist" element={<Waitlist />} />
                        <Route path="/auth/google" element={<GoogleAuthRelay />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

