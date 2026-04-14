import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';

const PlaceholderOne = () => {
    return (
        <WritingLayout
            title="Placeholder Article One"
            date="January 30, 2026"
            readTime="5 min read"
            category="Design"
            backLink={{ path: '/blog', label: 'Back to Journal' }}
        >
            <div className="mb-16">
                <p className="text-xl leading-relaxed text-charcoal/80 mb-8 italic border-l-4 border-moss/40 pl-6">
                    This is a placeholder summary for your first new article. It will bloom beautifully on the writings index page.
                </p>
                <p className="mb-8">
                    This is where your content will go. You can use standard HTML tags or custom components here.
                    The typography and layout are handled by the WritingLayout component and index.css editing grid.
                </p>
            </div>
        </WritingLayout>
    );
};

export default PlaceholderOne;
