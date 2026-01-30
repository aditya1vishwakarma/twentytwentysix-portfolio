
import React from 'react';
import BlogLayout from '../../components/Blog/BlogLayout';

const PlaceholderOne = () => {
    return (
        <BlogLayout
            title="Placeholder Article One"
            date="January 30, 2026"
            readTime="5 min read"
            category="Design"
            excerpt="This is a placeholder summary for your first new article. It will bloom beautifully on the writings index page."
        >
            <div className="text-xl leading-relaxed text-charcoal/80 space-y-8 font-sans">
                <p>
                    This is where your content will go. You can use standard HTML tags or custom components here.
                    The typography and layout are handled by the BlogLayout component.
                </p>
            </div>
        </BlogLayout>
    );
};

export default PlaceholderOne;
