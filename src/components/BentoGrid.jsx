import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BentoGrid.css';

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
    const [faqOpen, setFaqOpen] = useState(null);
    const containerRef = useRef(null);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Main cards and phone container
            gsap.from(".bento-card, .phone-mockup-image-container", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Specific staggered animation for floating images
            gsap.from(".floating-img", {
                x: (i, target) => {
                    if (target.classList.contains("floating-1") ||
                        target.classList.contains("floating-2") ||
                        target.classList.contains("floating-3")) {
                        return -100; // Slide from left
                    }
                    return 100; // Slide from right
                },
                opacity: 0,
                duration: 1,
                stagger: 1, // 1 second delay between each
                ease: "power3.out",
                delay: 0.5,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <React.Fragment>
            <div className="bento-wrapper" ref={containerRef}>
                <div className="bento-container">
                    {/* Left Column */}
                    <div className="bento-column left-column">





                    </div>

                    {/* Center Column - Phone */}
                    {/* Center Column - Phone */}
                    <div className="bento-column center-column">
                        <div className="phone-mockup-image-container">
                            <img src="/image/Untitled design (1).png" alt="App Showcase" className="phone-main-image" />
                            {/* Left Side Floating Images */}
                            <img src="/image/Untitled design (28).png" alt="Floating Feature 1" className="floating-img floating-1" />
                            <img src="/image/Untitled design (29).png" alt="Floating Feature 2" className="floating-img floating-2" />
                            <img src="/image/Untitled design (28).png" alt="Floating Feature 3" className="floating-img floating-3" />

                            {/* Right Side Floating Images */}
                            <img src="/image/Untitled design (29).png" alt="Floating Feature 4" className="floating-img floating-4" />
                            <img src="/image/Untitled design (28).png" alt="Floating Feature 5" className="floating-img floating-5" />
                            <img src="/image/Untitled design (29).png" alt="Floating Feature 6" className="floating-img floating-6" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bento-column right-column">





                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BentoGrid;
