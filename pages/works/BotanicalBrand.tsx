
import React from 'react';
import ProjectLayout from '../../components/Work/ProjectLayout';
import OptimizedImage from '../../components/UI/OptimizedImage';

const BotanicalBrand = () => {
  return (
    <ProjectLayout
      title="Botanical Brand"
      category="Branding"
      date="Aug 2023"
      role="Art Director"
      heroImage="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200"
      nextProjectPath="/works/alpine-retreat"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 font-sans">
        <div className="lg:col-span-5">
           <h2 className="font-serif text-3xl text-moss mb-6">A Visual Whisper</h2>
           <p className="text-xl text-charcoal/70 leading-relaxed mb-8">
             "Botanical" is a skincare line rooted in the honest power of herbs. Our challenge was to design an identity that felt 
             clinical in its precision but organic in its soul.
           </p>
        </div>
        <div className="lg:col-span-7">
           <div className="aspect-square bg-white rounded-squircle overflow-hidden shadow-sm border border-charcoal/5 mb-12">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200" 
                alt="Branding mockups" 
                className="w-full h-full"
              />
           </div>
           <p className="text-lg text-charcoal/60 leading-relaxed italic border-l-2 border-moss/20 pl-8 font-serif">
             We opted for a desaturated palette inspired by dried eucalyptus and river silt, using tactile paper stocks that 
             reward the touch.
           </p>
        </div>
      </div>
    </ProjectLayout>
  );
};

export default BotanicalBrand;
