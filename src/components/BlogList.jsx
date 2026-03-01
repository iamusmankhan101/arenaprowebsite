import React, { useState, useEffect } from 'react';
import { client, urlFor } from './sanity';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // This is the GROQ query we tested earlier!
                const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          publishedAt,
          image,
          body
        }`;

                const data = await client.fetch(query);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading posts...</div>;
    }

    if (posts.length === 0) {
        return <div className="p-8 text-center text-gray-500">No posts found. Create some in Sanity Studio!</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-[#004d43]">Arena Pro Blog</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        {post.image?.asset && (
                            <img
                                src={urlFor(post.image).width(600).height(400).url()}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                        )}

                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-sm text-gray-500 mb-4">
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </p>

                            {/* If you want to render the rich text body, you'll need @portabletext/react */}
                            {/* For now we just show a Read More link */}

                            <button className="mt-4 px-4 py-2 bg-[#004d43] text-white rounded hover:bg-[#003831] transition-colors">
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
