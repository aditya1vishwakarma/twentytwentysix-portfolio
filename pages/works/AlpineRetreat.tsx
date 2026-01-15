
import React from 'react';
import ProjectLayout from '../../components/Work/ProjectLayout';
import OptimizedImage from '../../components/UI/OptimizedImage';

const AlpineRetreat = () => {
  return (
    <ProjectLayout
      title="Alpine Retreat"
      category="Architecture"
      date="Oct 2023"
      role="Lead Architect"
      heroImage="https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=1200"
      nextProjectPath="/works/botanical-brand"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 font-sans">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl text-moss mb-6">The Essence</h2>
          <p className="text-charcoal/60 leading-relaxed text-lg">
            Nestled in the rugged terrain of the Swiss Alps, this project was born from a desire for silence and sustainability. 
            We aimed to create a dwelling that felt like a natural extension of the mountain's geometry.
          </p>
        </div>
        <div className="lg:col-span-8">
          <p className="text-2xl text-charcoal/80 leading-relaxed mb-12">
            The structure utilizes a modular timber framework, allowing for minimal disruption to the existing ecosystem. 
            Large-scale glazing provides passive heating while offering an uninterrupted dialogue with the changing seasons.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" 
              alt="Detail of timber work" 
              className="rounded-squircle h-[400px]"
            />
            <div className="flex flex-col justify-center p-8 bg-moss/5 rounded-squircle border border-moss/10">
              <h4 className="font-serif text-xl mb-4 text-moss">Materials</h4>
              <ul className="space-y-3 text-charcoal/60 text-sm uppercase tracking-widest font-bold">
                <li>• Reclaimed Ash Wood</li>
                <li>• Local Granite Stone</li>
                <li>• High-Performance Glass</li>
                <li>• Recycled Wool Insulation</li>
              </ul>
            </div>
          </div>

          <p className="text-xl text-charcoal/70 leading-relaxed">
            Every window was positioned based on the path of the winter sun, ensuring that even in the coldest months, 
            the interior remains flooded with natural warmth. The invisible hand of design at work.
          </p>
        </div>
      </div>
    </ProjectLayout>
  );
};

export default AlpineRetreat;
