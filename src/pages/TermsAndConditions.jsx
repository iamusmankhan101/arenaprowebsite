import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Legal.css';

const TermsAndConditions = () => {
    return (
        <div className="legal-page">
            <Navbar forceScrolled />

            {/* Hero */}
            <section className="legal-hero">
                <div className="legal-hero-content">
                    <span className="legal-badge">Legal</span>
                    <h1>Terms & <span className="highlight">Conditions</span></h1>
                    <p>The rules and guidelines for using Arena Pro.</p>
                </div>
            </section>

            {/* Content */}
            <main className="legal-container">
                <div className="legal-card">
                    <div className="legal-content">
                        <span className="legal-update-date">Last Updated: April 2026</span>

                        <h2>1. Agreement to Terms</h2>
                        <p>
                            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Arena Pro ("we," "us" or "our"), concerning your access to and use of the website and mobile application. By accessing the platform, you agree that you have read, understood, and agree to be bound by all of these Terms and Conditions.
                        </p>

                        <h2>2. User Registration</h2>
                        <p>
                            You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate.
                        </p>

                        <h2>3. Booking and Cancellations</h2>
                        <h3>3.1 Bookings</h3>
                        <p>
                            Arena Pro acts as an intermediary platform connecting users with sports venue owners. When you book a venue, you are making a commitment to utilize the space for the agreed-upon time.
                        </p>
                        
                        <h3>3.2 Cancellations</h3>
                        <p>
                            Cancellations must be made according to the specific venue's cancellation policy. Arena Pro is not responsible for any penalty fees incurred due to late cancellations or no-shows. Venue owners maintain the right to refuse service based on repeated no-shows.
                        </p>

                        <h2>4. Vendor Operations</h2>
                        <p>
                            If you are a Vendor utilizing the Arena Pro Owner panel, you agree to:
                        </p>
                        <ul>
                            <li>Provide accurate representation of your facility's amenities and condition.</li>
                            <li>Honor all confirmed bookings made through the Arena Pro system.</li>
                            <li>Maintain a safe and compliant sporting environment for all users.</li>
                        </ul>

                        <h2>5. Prohibited Activities</h2>
                        <p>You may not access or use the Site for any purpose other than that for which we make the Site available. As a user of the Site, you agree not to:</p>
                        <ul>
                            <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                            <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information.</li>
                            <li>Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
                            <li>Use the Site as part of any effort to compete with us.</li>
                        </ul>

                        <h2>6. Limitations of Liability</h2>
                        <p>
                            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or app. You accept that sports activities carry inherent injury risks, and Arena Pro is not liable for any injuries sustained at partner venues.
                        </p>

                        <h2>7. Contact Information</h2>
                        <p>
                            For further information or to log a complaint regarding our services, please contact us at <a href="mailto:support@arenapropk.online">support@arenapropk.online</a>, or call us directly at +92 371 2524553.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;
