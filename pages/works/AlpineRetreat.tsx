import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';
import OptimizedImage from '../../components/UI/OptimizedImage';
import EmbedContainer from '../../components/Writing/EmbedContainer';

const KeepThisVibe = () => {
  return (
    <WritingLayout
      title="Keep This Vibe, DJ X"
      category="Product Design"
      date="March 2026"
      readTime="4 min read"
      backLink={{ path: '/works', label: 'Back to Works' }}
    >
      <div className="mb-16">
        <p className="text-xl leading-relaxed mb-6">
          Analyzing 8.7 Million Songs to validate a simple feature. Keep the listener engaged by letting them put a pause on DJ X's recommendations.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70">
          The structure utilizes a modular timber framework, allowing for minimal disruption to the existing ecosystem.
          Large-scale glazing provides passive heating while offering an uninterrupted dialogue with the changing seasons.
        </p>
      </div>

      <div className="full-bleed my-16">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600"
          alt="Detail of timber work"
          className="w-full h-[60vh] md:rounded-squircle hidden md:block"
        />
        <OptimizedImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600"
          alt="Detail of timber work"
          className="w-full h-[400px] md:hidden"
        />
      </div>

      <div className="flex flex-col justify-center p-8 bg-moss/5 rounded-squircle border border-moss/10 mb-16 wide-bleed">
        <h4 className="font-serif text-xl mb-4 text-moss">Materials & Process</h4>
        <ul className="space-y-3 text-charcoal/60 text-sm uppercase tracking-widest font-bold">
          <li>• Reclaimed Ash Wood</li>
          <li>• Local Granite Stone</li>
          <li>• High-Performance Glass</li>
          <li>• Recycled Wool Insulation</li>
        </ul>
      </div>

      <div className="mb-16">
        <p className="text-lg text-charcoal/70 leading-relaxed wrap-left max-w-sm border-l-4 border-moss pl-6 py-2 italic font-serif text-2xl">
          "The invisible hand of design at work."
        </p>
        <p className="text-lg text-charcoal/70 leading-relaxed">
          Every window was positioned based on the path of the winter sun, ensuring that even in the coldest months,
          the interior remains flooded with natural warmth. This meant closely analyzing the terrain and adjusting our 
          initial footprint to match the natural slopes and rock formations. The end result is a retreat that 
          doesn't just sit on the landscape, but actively participates in it.
        </p>
      </div>

      <div className="wide-bleed my-16">
        <EmbedContainer
          url="https://open.spotify.com/embed/album/3uL1rTquN1x2K5YyDhm9h0?utm_source=generator"
          type="spotify"
          title="Vibe Check Playlist"
        />
      </div>
    </WritingLayout>
  );
};

export default KeepThisVibe;
