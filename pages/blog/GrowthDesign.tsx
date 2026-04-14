import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';

const GrowthDesign = () => {
  return (
    <WritingLayout
      title="Growth as a Design Problem"
      date="Feb 24, 2024"
      readTime="4 min read"
      category="Product"
      backLink={{ path: '/blog', label: 'Back to Journal' }}
    >
      <div className="mb-16">
        <p className="text-xl leading-relaxed text-charcoal/80 mb-8 italic border-l-4 border-moss/40 pl-6">
          Why sustainable growth requires a deep understanding of user aesthetics and mental models.
        </p>

        <p className="mb-8">
          Growth is often treated as a series of hacks, A/B tests, and aggressive experiments. However, true long-term expansion is a design problem at its core.
        </p>
      </div>

      <div className="bg-moss/5 p-12 rounded-squircle border border-moss/10 my-16 wide-bleed">
         <h3 className="font-serif text-3xl text-moss mb-4">The Trust Loop</h3>
         <p className="text-charcoal/70 mb-0">
           Sustainable growth requires mapping the emotional journey of a user from the moment of discovery to the point of habituation. If the aesthetic doesn't match the promise, the user bounces.
         </p>
      </div>

      <div className="mb-16">
        <p className="mb-8">
          By applying Swiss design principles—clarity, objectivity, and a strict grid—to our growth funnels, we create experiences that don't just convert, but retain. We aren't just looking for clicks; we are looking for trust.
        </p>

        <p className="mb-8">
          Trust is built through consistency. Every pixel, every interaction, and every word of copy must feel like it came from the same source. When growth and design work in harmony, the product doesn't just get bigger—it gets better.
        </p>
      </div>
    </WritingLayout>
  );
};

export default GrowthDesign;
