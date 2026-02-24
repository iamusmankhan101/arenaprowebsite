import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HowItWorks from './pages/HowItWorks';
import Venues from './pages/Venues';
import Contact from './pages/Contact';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/venues" element={<Venues />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
