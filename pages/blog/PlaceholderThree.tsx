
import React from 'react';
import BlogLayout from '../../components/Blog/BlogLayout';

const PlaceholderThree = () => {
    return (
        <BlogLayout
            title="Placeholder Article Three"
            date="January 30, 2026"
            readTime="12 min read"
            category="Philosophy"
            excerpt="The third and final placeholder. This one is tagged 'Philosophy' to demonstrate the varied filtering categories."
        >
            <div className="text-xl leading-relaxed text-charcoal/80 space-y-8 font-sans">
                <p>
                    Final placeholder content. Every piece of writing contributes to the editorial rhythm of your site.
                </p>
            </div>
        </BlogLayout>
    );
};

export default PlaceholderThree;
