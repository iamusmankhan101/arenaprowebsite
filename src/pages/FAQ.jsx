import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import './FAQ.css';

const faqData = [
    {
        question: "What is Arena Pro?",
        answer: "Arena Pro is a sports venue booking platform that allows users to easily find and book sports grounds online, including football, cricket, padel, and other facilities across Pakistan."
    },
    {
        question: "How does Arena Pro work?",
        answer: "Arena Pro lets you browse available sports venues, check real-time availability, and instantly book your preferred ground through the app or website without making multiple calls."
    },
    {
        question: "Can I book sports grounds online in Pakistan using Arena Pro?",
        answer: "Yes, Arena Pro provides a seamless online sports ground booking experience in Pakistan, helping you reserve football grounds, cricket grounds, and other sports venues in just a few clicks."
    },
    {
        question: "What types of sports venues can I book on Arena Pro?",
        answer: "You can book a variety of sports facilities including football grounds, cricket grounds, padel courts, futsal arenas, and both indoor and outdoor sports venues."
    },
    {
        question: "Is Arena Pro available in my city?",
        answer: "Arena Pro is expanding rapidly across major cities in Pakistan, including Lahore, Karachi, and Islamabad. More locations are being added regularly."
    },
    {
        question: "Do I need to create an account to book a sports venue?",
        answer: "Yes, creating an account on Arena Pro allows you to manage bookings, track your match history, and receive updates about available slots and offers."
    },
    {
        question: "Can I check real-time availability of sports grounds?",
        answer: "Absolutely! Arena Pro provides real-time availability so you can instantly see which grounds are free and book them without delays."
    },
    {
        question: "How can I pay for my booking on Arena Pro?",
        answer: "Arena Pro supports multiple payment options, including online payments and cash options, depending on the venue."
    },
    {
        question: "Can I cancel or reschedule my booking?",
        answer: "Yes, you can cancel or reschedule your booking based on the venue’s cancellation policy listed on the platform."
    },
    {
        question: "Is Arena Pro free to use?",
        answer: "Yes, browsing and searching for sports venues on Arena Pro is completely free. You only pay when you confirm a booking."
    },
    {
        question: "Why should I use Arena Pro instead of calling venues?",
        answer: "Arena Pro saves time by eliminating the need for multiple calls. You get instant booking, real-time availability, and a hassle-free experience all in one place."
    },
    {
        question: "Can sports venue owners list their grounds on Arena Pro?",
        answer: "Yes, venue owners can partner with Arena Pro to list their sports facilities, manage bookings, and increase visibility to potential customers."
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
