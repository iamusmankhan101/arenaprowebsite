import { useEffect } from 'react';

const useSEO = (title, description, canonicalUrl) => {
    useEffect(() => {
        // Update title
        if (title) {
            document.title = title;
            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute("content", title);
            let twitterTitle = document.querySelector('meta[property="twitter:title"]');
            if (twitterTitle) twitterTitle.setAttribute("content", title);
        }

        // Update meta description
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute("content", description);
            } else {
                metaDescription = document.createElement("meta");
                metaDescription.setAttribute("name", "description");
                metaDescription.setAttribute("content", description);
                document.head.appendChild(metaDescription);
            }
            
            let ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute("content", description);
            let twitterDesc = document.querySelector('meta[property="twitter:description"]');
            if (twitterDesc) twitterDesc.setAttribute("content", description);
        }

        // Update canonical tag
        if (canonicalUrl) {
            let canonicalNode = document.querySelector('link[rel="canonical"]');
            if (canonicalNode) {
                canonicalNode.setAttribute("href", canonicalUrl);
            } else {
                canonicalNode = document.createElement("link");
                canonicalNode.setAttribute("rel", "canonical");
                canonicalNode.setAttribute("href", canonicalUrl);
                document.head.appendChild(canonicalNode);
            }
        }
    }, [title, description, canonicalUrl]);
};

export default useSEO;
