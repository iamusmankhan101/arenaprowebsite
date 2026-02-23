import React from 'react';
import './Testimonials.css';

const reviews = [
    {
        quote: '"My day was a mess of priorities, but this tool organizes my workflow and helps me navigate chaos. It\'s game-changer for my output!"',
        name: 'Maria Lopez',
        role: 'Design Lead',
        avatar: '👩‍🎨',
    },
    {
        quote: '"I always missed deadlines before, yet I\'m consistently hitting targets and feel way more in control of my daily concentration."',
        name: 'Alex Rivera',
        role: 'Marketing Head',
        avatar: '👨‍💼',
    },
    {
        quote: '"Switching between apps was a headache, but the unified dashboard cuts through all the noise and simplifies my process. Excellent value!"',
        name: 'Tom Kraley',
        role: 'Sales Director',
        avatar: '👩‍💻',
    },
    {
        quote: '"This platform transformed how our team collaborates. We\'ve cut meeting time in half and everyone stays aligned effortlessly."',
        name: 'Sarah Chen',
        role: 'Product Manager',
        avatar: '👩‍🔬',
    },
    {
        quote: '"The goal tracking feature keeps me accountable. I\'ve accomplished more in the last month than the entire previous quarter."',
        name: 'James Parker',
        role: 'Freelance Developer',
        avatar: '👨‍💻',
    },
    {
        quote: '"Finally a tool that adapts to my workflow instead of forcing me into rigid templates. The flexibility is unmatched."',
        name: 'Priya Sharma',
        role: 'Startup Founder',
        avatar: '👩‍🚀',
    },
];

const Testimonials = () => {
    // Duplicate the reviews array for seamless infinite scroll
    const doubledReviews = [...reviews, ...reviews];

    return (
        <section className="testimonials">
            <div className="testimonials-header">
                <h2 className="testimonials-title">
                    What our<br />clients are saying
                </h2>
                <p className="testimonials-subtitle">
                    Our financial management platform is transforming the way people manage
                    their money. Here's what some of our users have to say about their experience.
                </p>
            </div>

            <div className="carousel-wrapper">
                <div className="carousel-track">
                    {doubledReviews.map((review, index) => (
                        <div className="review-card" key={index}>
                            <p className="review-quote">{review.quote}</p>
                            <div className="review-author">
                                <div className="review-avatar">{review.avatar}</div>
                                <div className="review-info">
                                    <span className="review-name">{review.name}</span>
                                    <span className="review-role">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
