import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';
import OptimizedImage from '../../components/UI/OptimizedImage';

const BotanicalBrand = () => {
  return (
    <WritingLayout
      title="Botanical Brand"
      category="Branding"
      date="Aug 2023"
      readTime="3 min read"
      backLink={{ path: '/works', label: 'Back to Works' }}
    >
      <div className="full-bleed mb-16">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1600"
          alt="Botanical Brand Hero"
          className="w-full h-[50vh] md:rounded-squircle hidden md:block"
        />
        <OptimizedImage
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=600"
          alt="Botanical Brand Hero"
          className="w-full h-[300px] md:hidden"
        />
      </div>

      <div className="mb-16">
        <h2 className="font-serif text-3xl text-moss mb-6">A Visual Whisper</h2>
        <p className="text-xl text-charcoal/70 leading-relaxed mb-8">
          "Botanical" is a skincare line rooted in the honest power of herbs. Our challenge was to design an identity that felt 
          clinical in its precision but organic in its soul.
        </p>
      </div>

      <div className="wide-bleed mt-16 mb-12">
        <div className="aspect-[16/9] md:aspect-[21/9] bg-white rounded-squircle overflow-hidden shadow-sm border border-charcoal/5">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200" 
            alt="Branding mockups" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <p className="text-2xl text-charcoal/60 leading-relaxed italic border-l-4 border-moss/40 pl-8 font-serif">
          We opted for a desaturated palette inspired by dried eucalyptus and river silt, using tactile paper stocks that 
          reward the touch.
        </p>
      </div>
    </WritingLayout>
  );
};

export default BotanicalBrand;
