import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';

const PlaceholderTwo = () => {
    return (
        <WritingLayout
            title="Placeholder Article Two"
            date="February 14, 2026"
            readTime="3 min read"
            category="Engineering"
            backLink={{ path: '/blog', label: 'Back to Journal' }}
        >
            <div className="mb-16">
                <p className="text-xl leading-relaxed text-charcoal/80 mb-8 italic border-l-4 border-moss/40 pl-6">
                    This is another placeholder, ready to be filled with your thoughts and code snippets.
                </p>
                <p className="mb-8">
                    This is where your content will go. You can use standard HTML tags or custom components here.
                    The typography and layout are handled by the WritingLayout component and index.css editing grid.
                </p>
            </div>
        </WritingLayout>
    );
};

export default PlaceholderTwo;
