import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';
import OptimizedImage from '../../components/UI/OptimizedImage';

const NatureGrid = () => {
  return (
    <WritingLayout
      title="Nature’s Grid Systems"
      date="Jan 15, 2024"
      readTime="8 min read"
      category="Aesthetics"
      backLink={{ path: '/blog', label: 'Back to Journal' }}
    >
      <div className="mb-16">
        <p className="text-xl leading-relaxed text-charcoal/80 mb-8 italic border-l-4 border-moss/40 pl-6">
          What we can learn about layout and hierarchy from the golden ratio and organic patterns.
        </p>
        <p className="mb-8">
          The mountains don't have a style guide, yet they are perfectly balanced. This isn't an accident of chaos; it is the result of billions of years of structural optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-16 wide-bleed">
         <OptimizedImage src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800" className="rounded-squircle h-64 md:h-96 w-full object-cover" alt="Fern pattern" />
         <OptimizedImage src="https://images.unsplash.com/photo-1470252649358-96957c053e9a?q=80&w=800" className="rounded-squircle h-64 md:h-96 w-full object-cover" alt="Mist on mountains" />
      </div>

      <div className="mb-16">
        <p className="mb-8">
          Nature's grid systems are everywhere if you know where to look. From the Fibonacci sequence in the arrangement of a succulent's leaves to the hexagonal efficiency of a honeycomb, organic patterns follow strict mathematical rules.
        </p>

        <p className="mb-8">
          As designers and product builders, we often try to "invent" new systems. But the most "right" feeling interfaces are often the ones that mirror these ancient patterns. The way light hits a surface, the way a shadow falls, or the way a list of items is grouped can all be traced back to natural hierarchies.
        </p>

        <p className="mb-8">
          By observing these organic systems, we can build digital interfaces that feel inherently comfortable to the human eye. We aren't just making things look "pretty"; we are aligning them with the way our brains evolved to see the world.
        </p>
      </div>
    </WritingLayout>
  );
};

export default NatureGrid;
