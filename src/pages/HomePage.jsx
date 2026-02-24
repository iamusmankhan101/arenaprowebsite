import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Steps from '../components/Steps';
import AppGallery from '../components/AppGallery';
import Testimonials from '../components/Testimonials';
import VendorSection from '../components/VendorSection';
import DownloadApp from '../components/DownloadApp';
import Footer from '../components/Footer';

function HomePage() {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <Features />
            <Steps />
            <AppGallery />
            <Testimonials />
            <VendorSection />
            <DownloadApp />
            <Footer />
        </div>
    );
}

export default HomePage;
