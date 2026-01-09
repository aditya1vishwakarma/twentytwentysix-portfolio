
import React from 'react';
import BlogLayout from '../../components/Blog/BlogLayout';

const GrowthDesign = () => {
  return (
    <BlogLayout
      title="Growth as a Design Problem"
      date="Feb 24, 2024"
      readTime="4 min read"
      category="Product"
      excerpt="Why sustainable growth requires a deep understanding of user aesthetics and mental models."
    >
      <div className="text-xl leading-relaxed text-charcoal/80 space-y-8 font-sans">
        <p>
          Growth is often treated as a series of hacks, A/B tests, and aggressive experiments. However, true long-term expansion is a design problem at its core.
        </p>

        <div className="bg-moss/5 p-12 rounded-squircle border border-moss/10 my-12">
           <h3 className="font-serif text-3xl text-moss mb-4">The Trust Loop</h3>
           <p className="text-charcoal/70">
             Sustainable growth requires mapping the emotional journey of a user from the moment of discovery to the point of habituation. If the aesthetic doesn't match the promise, the user bounces.
           </p>
        </div>

        <p>
          By applying Swiss design principles—clarity, objectivity, and a strict grid—to our growth funnels, we create experiences that don't just convert, but retain. We aren't just looking for clicks; we are looking for trust.
        </p>

        <p>
          Trust is built through consistency. Every pixel, every interaction, and every word of copy must feel like it came from the same source. When growth and design work in harmony, the product doesn't just get bigger—it gets better.
        </p>
      </div>
    </BlogLayout>
  );
};

export default GrowthDesign;
