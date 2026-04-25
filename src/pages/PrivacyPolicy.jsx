import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Legal.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page">
            <Navbar forceScrolled />

            {/* Hero */}
            <section className="legal-hero">
                <div className="legal-hero-content">
                    <span className="legal-badge">Legal</span>
                    <h1>Privacy <span className="highlight">Policy</span></h1>
                    <p>How we collect, use, and protect your data.</p>
                </div>
            </section>

            {/* Content */}
            <main className="legal-container">
                <div className="legal-card">
                    <div className="legal-content">
                        <span className="legal-update-date">Last Updated: April 2026</span>

                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to Arena Pro ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>

                        <h2>2. Data We Collect</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                        <ul>
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes phone numbers and email addresses.</li>
                            <li><strong>Transaction Data:</strong> includes details about bookings you have made and payments you have executed through our platform.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                        </ul>

                        <h2>3. How We Use Your Data</h2>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul>
                            <li>To register you as a new customer or vendor.</li>
                            <li>To process and deliver your sports venue bookings.</li>
                            <li>To manage our relationship with you, including customer support and notifications.</li>
                            <li>To improve our website, products/services, marketing, customer relationships, and experiences.</li>
                        </ul>

                        <h2>4. Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                        </p>

                        <h2>5. Third-Party Links</h2>
                        <p>
                            This website may include links to third-party websites, plug-ins, and applications (e.g., payment gateways or venue owner portals). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                        </p>

                        <h2>6. Your Legal Rights</h2>
                        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
                        <ul>
                            <li>Request access to your personal data.</li>
                            <li>Request correction of your personal data.</li>
                            <li>Request erasure of your personal data.</li>
                            <li>Withdraw consent at any time where we are relying on consent to process your personal data.</li>
                        </ul>

                        <h2>7. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:support@arenapropk.online">support@arenapropk.online</a>.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
