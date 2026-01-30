
import React from 'react';
import BlogLayout from '../../components/Blog/BlogLayout';

const PlaceholderTwo = () => {
    return (
        <BlogLayout
            title="Placeholder Article Two"
            date="January 30, 2026"
            readTime="8 min read"
            category="Product"
            excerpt="A second placeholder summary. Notice how the category 'Product' will allow users to filter for this post."
        >
            <div className="text-xl leading-relaxed text-charcoal/80 space-y-8 font-sans">
                <p>
                    More placeholder content. Focus on clean lines and intentional whitespace as you write your thoughts.
                </p>
            </div>
        </BlogLayout>
    );
};

export default PlaceholderTwo;
