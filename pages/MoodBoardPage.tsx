
import React, { useState } from 'react';
import { motion as motionComponent } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { MOOD_BOARD } from '../constants';

// Fix: Cast imports to any to resolve environment-specific type errors
const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

const MoodBoardPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#FBFAF8] min-h-screen pt-32 pb-64 px-6"
    >
      <div className="max-w-screen-xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-charcoal/40 hover:text-moss mb-16 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-[0.2em] text-xs font-bold">Back to Home</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header Section */}
          <header className="lg:col-span-4 lg:sticky lg:top-32 mb-20 lg:mb-0">
            <h1 className="font-serif text-6xl md:text-8xl text-charcoal mb-8 leading-[0.9]">
              Mood <br/>
              <span className="text-moss font-instrument italic font-normal">Board</span>
            </h1>
            <div className="w-12 h-[1px] bg-moss/30 mb-8" />
            <p className="text-lg text-charcoal/50 max-w-xs italic font-serif leading-relaxed">
              A vertical cascade of architectural textures, typographic rhythms, and organic forms.
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest text-moss/60 font-bold">
              Scroll to unfold • Click to flip
            </p>
          </header>

          {/* CASCADING STACK CONTAINER */}
          <div className="lg:col-span-8 flex flex-col items-center gap-y-12 md:-mt-24">
            {MOOD_BOARD.map((item, index) => (
              <MoodCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
        
        <footer className="mt-64 text-center border-t border-charcoal/5 pt-12">
          <p className="text-charcoal/20 font-serif italic text-xl">End of current sequence</p>
        </footer>
      </div>
    </motion.div>
  );
};

interface MoodCardProps {
  item: any;
  index: number;
}

const MoodCard: React.FC<MoodCardProps> = ({ item, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Layered offsets to create the "stacked" look from the image
  const xOffset = index % 2 === 0 ? '-15%' : '15%';
  const rotation = index % 2 === 0 ? -3 : 3;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05 
      }}
      style={{ 
        x: xOffset, 
        rotate: rotation,
        zIndex: index + 1
      } as any}
      className="relative w-full max-w-[480px] h-[600px] perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Visual Numbering/Line Detail (like reference image) */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? '-left-32' : '-right-32'} hidden xl:flex items-center gap-4 text-charcoal/10`}>
         <span className="font-serif text-3xl">0{index + 1}</span>
         <div className="w-24 h-[1px] bg-charcoal/10" />
      </div>

      <motion.div 
        className="relative w-full h-full preserve-3d transition-transform duration-700 ease-[0.4,0,0.2,1]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT: THE IMAGE */}
        <div className="absolute inset-0 backface-hidden rounded-squircle overflow-hidden shadow-2xl shadow-charcoal/5 border-[12px] border-white">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="absolute bottom-8 left-8">
             <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-charcoal/5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/60">0{index + 1} / Visual Note</span>
             </div>
          </div>
        </div>

        {/* BACK: THE TEXT */}
        <div 
          className="absolute inset-0 backface-hidden rounded-squircle bg-charcoal flex flex-col justify-center items-center text-center p-12 border-[12px] border-white shadow-2xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.4em] text-moss font-bold block mb-2">Intent</span>
            <div className="w-8 h-[1px] bg-moss/40 mx-auto" />
          </div>
          <h3 className="font-serif text-3xl text-white mb-6 leading-tight">{item.title}</h3>
          <p className="text-white/60 text-lg leading-relaxed mb-10 italic font-serif px-4">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center max-w-[280px]">
            {item.tags.map((tag: string) => (
              <span key={tag} className="text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoodBoardPage;
