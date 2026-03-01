import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client, urlFor } from '../lib/sanityClient';
import { Calendar, ArrowRight, Search, Loader } from 'lucide-react';
import './Blog.css';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await client.fetch(`
                    *[_type == "post"] | order(publishedAt desc) {
                        _id,
                        title,
                        slug,
                        image,
                        publishedAt,
                        "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."
                    }
                `);
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            return post.title?.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [posts, searchTerm]);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="blog-page">
            <Navbar />

            {/* Hero Section */}
            <section className="blog-hero">
                <div className="blog-hero-content">
                    <span className="blog-badge">Arena Pro Blog</span>
                    <h1>Latest <span className="highlight">Insights</span></h1>
                    <p>Tips, stories, and updates from the world of sports booking in Lahore.</p>

                    <div className="blog-search-container">
                        <div className="blog-search-wrapper">
                            <Search className="blog-search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <main className="blog-container">
                {loading ? (
                    <div className="blog-loading">
                        <Loader className="blog-spinner" size={32} />
                        <p>Loading articles...</p>
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="blog-grid">
                        {filteredPosts.map(post => (
                            <Link
                                to={`/blog/${post.slug?.current}`}
                                className="blog-card"
                                key={post._id}
                            >
                                <div className="blog-card-image">
                                    {post.image ? (
                                        <img
                                            src={urlFor(post.image).width(600).height(340).url()}
                                            alt={post.title}
                                        />
                                    ) : (
                                        <div className="blog-card-placeholder">
                                            <span>Arena Pro</span>
                                        </div>
                                    )}
                                </div>
                                <div className="blog-card-body">
                                    <h3 className="blog-card-title">{post.title}</h3>
                                    {post.excerpt && (
                                        <p className="blog-card-excerpt">{post.excerpt}</p>
                                    )}
                                    <div className="blog-card-meta">
                                        <span className="meta-item">
                                            <Calendar size={14} />
                                            {formatDate(post.publishedAt)}
                                        </span>
                                    </div>
                                    <span className="blog-card-link">
                                        Read More <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="blog-empty">
                        <h3>No articles found</h3>
                        <p>{searchTerm ? 'Try adjusting your search.' : 'No blog posts published yet. Check back soon!'}</p>
                        {searchTerm && (
                            <button className="blog-reset-btn" onClick={() => setSearchTerm('')}>
                                Clear Search
                            </button>
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
