import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';

const PlaceholderThree = () => {
    return (
        <WritingLayout
            title="Placeholder Article Three"
            date="March 01, 2026"
            readTime="4 min read"
            category="Essays"
            backLink={{ path: '/blog', label: 'Back to Journal' }}
        >
            <div className="mb-16">
                <p className="text-xl leading-relaxed text-charcoal/80 mb-8 italic border-l-4 border-moss/40 pl-6">
                    A final placeholder. The content here is flexible—drop in images, text, or embedded components.
                </p>
                <p className="mb-8">
                    This is where your content will go. You can use standard HTML tags or custom components here.
                    The typography and layout are handled by the WritingLayout component and index.css editing grid.
                </p>
            </div>
        </WritingLayout>
    );
};

export default PlaceholderThree;
