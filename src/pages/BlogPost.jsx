import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client, urlFor } from '../lib/sanityClient';
import { Calendar, ArrowLeft, Loader } from 'lucide-react';
import './BlogPost.css';

const portableTextComponents = {
    types: {
        image: ({ value }) => (
            <figure className="post-image">
                <img src={urlFor(value).width(900).url()} alt={value.alt || 'Blog image'} />
                {value.caption && <figcaption>{value.caption}</figcaption>}
            </figure>
        ),
    },
    marks: {
        link: ({ children, value }) => (
            <a href={value.href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),
    },
    block: {
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
};

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await client.fetch(
                    `*[_type == "post" && slug.current == $slug][0] {
                        _id,
                        title,
                        slug,
                        body,
                        image,
                        publishedAt
                    }`,
                    { slug }
                );
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="blogpost-page">
                <Navbar />
                <div className="blogpost-loading">
                    <Loader className="blogpost-spinner" size={32} />
                    <p>Loading article...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="blogpost-page">
                <Navbar />
                <div className="blogpost-not-found">
                    <h2>Article Not Found</h2>
                    <p>The article you're looking for doesn't exist or has been removed.</p>
                    <Link to="/blog" className="blogpost-back-btn">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="blogpost-page">
            <Navbar />

            {/* Hero */}
            <section className="blogpost-hero">
                {post.image && (
                    <div className="blogpost-hero-bg">
                        <img src={urlFor(post.image).width(1400).url()} alt={post.title} />
                        <div className="blogpost-hero-overlay" />
                    </div>
                )}
                <div className="blogpost-hero-content">
                    <h1>{post.title}</h1>
                    <div className="blogpost-meta">
                        <span className="blogpost-meta-item">
                            <Calendar size={16} />
                            {formatDate(post.publishedAt)}
                        </span>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="blogpost-article">
                <div className="blogpost-content">
                    {post.body && (
                        <PortableText value={post.body} components={portableTextComponents} />
                    )}
                </div>

                <div className="blogpost-footer-nav">
                    <Link to="/blog" className="blogpost-back-btn">
                        <ArrowLeft size={18} /> Back to Blog
                    </Link>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default BlogPost;
