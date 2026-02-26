import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import './FAQ.css';

const faqData = [
    {
        question: "How do I book a sports venue using Arena Pro?",
        answer: "Booking is incredibly simple. Just open the app, search for the sport you want to play, select your preferred time slot, and confirm. Whether you are looking for an indoor cricket court near me or the top padel courts, you can secure your spot in seconds."
    },
    {
        question: "What types of sports facilities can I find on the app?",
        answer: "Arena Pro connects you with a wide variety of premium facilities. You can instantly discover a football turf near me, top-tier tennis courts in Lahore, and the best indoor cricket arenas. We partner with top locations, including premium DHA Lahore venues."
    },
    {
        question: "I don't have a full team. Can I find other players on the app?",
        answer: 'Absolutely. Arena Pro features a dedicated "Challenge Mode" & "Squad Builder." You can create your own team, track your win rate, and challenge other local squads to a match at your favorite cricket ground near me or local futsal turf.'
    },
    {
        question: "How do I know my booking is fully confirmed?",
        answer: "The moment you book your venue through the app, you will receive a real-time instant notification. Your slot is immediately secured in the venue's system, eliminating any chance of double-booking."
    },
    {
        question: "Can I see what amenities a venue offers before booking?",
        answer: "Yes! Every listing features Premium Venue Insights. Before finalizing your cricket grounds booking in Lahore, you can view detailed venue profiles, check player reviews, and look at amenity icons (like parking, water, and lighting) to ensure it meets your standards."
    },
    {
        question: "I manage a sports club. Can I list my facility on Arena Pro?",
        answer: "Yes, we provide a comprehensive vendor panel specifically for venues and clubs. Whether you manage a dedicated cricket ground indoor facility or multiple futsal turfs, our platform gives you efficient booking management, daily reporting, and real-time revenue tracking to streamline your operations."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={onClick}>
            <div className="faq-question">
                <h3>{question}</h3>
                <div className={`faq-icon ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={22} />
                </div>
            </div>
            <div className={`faq-answer ${isOpen ? 'expanded' : ''}`}>
                <p>{answer}</p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFAQs = useMemo(() => {
        if (!searchTerm.trim()) return faqData;
        const lower = searchTerm.toLowerCase();
        return faqData.filter(
            faq =>
                faq.question.toLowerCase().includes(lower) ||
                faq.answer.toLowerCase().includes(lower)
        );
    }, [searchTerm]);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="faq-page">
            <Navbar forceScrolled />

            {/* Hero */}
            <section className="faq-hero">
                <div className="faq-hero-content">
                    <span className="faq-badge">FAQ</span>
                    <h1 className="faq-title">
                        Frequently Asked{' '}
                        <span className="faq-highlight">Questions</span>
                    </h1>
                </div>
            </section>

            {/* Search Bar */}
            <div className="faq-search-wrapper">
                <div className="faq-search-bar">
                    <Search size={20} className="faq-search-icon" />
                    <input
                        type="text"
                        placeholder="Ask us something you would like to know..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setOpenIndex(0);
                        }}
                    />
                </div>
            </div>

            {/* FAQ Content */}
            <main className="faq-container">
                <div className="faq-list">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                            />
                        ))
                    ) : (
                        <div className="faq-no-results">
                            <p>No matching questions found. Try a different search term.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* CTA Section */}
            <section className="faq-cta-section">
                <div className="faq-cta-container">
                    <div className="faq-cta-bg-circle faq-cta-circle-1"></div>
                    <div className="faq-cta-bg-circle faq-cta-circle-2"></div>
                    <div className="faq-cta-content">
                        <h2>Let's try our<br />service now!</h2>
                        <p>Download Arena Pro and experience the easiest way to find and book sports venues in Lahore.</p>
                    </div>
                    <Link to="/" className="faq-cta-btn">
                        Get Started
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FAQ;
