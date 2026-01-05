import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../../constants';
import Button from '../UI/Button';

const WorkCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleProjectClick = () => {
    navigate(`/project/${PROJECTS[currentIndex].id}`);
  };

  return (
    <section id="works" className="py-24 bg-background overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-charcoal/10 pb-6">
          <h2 className="font-serif text-5xl text-charcoal">Selected Works</h2>
          <div className="hidden md:flex gap-4">
            <button 
              onClick={handlePrev} 
              className="p-3 rounded-full border border-charcoal/20 hover:bg-charcoal hover:text-white transition-all duration-300"
              aria-label="Previous Project"
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={handleNext} 
              className="p-3 rounded-full border border-charcoal/20 hover:bg-charcoal hover:text-white transition-all duration-300"
              aria-label="Next Project"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-squircle overflow-hidden group cursor-pointer" onClick={handleProjectClick}>
          <AnimatePresence mode="wait">
            <motion.img
              key={PROJECTS[currentIndex].imageUrl}
              src={PROJECTS[currentIndex].imageUrl}
              alt={PROJECTS[currentIndex].title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Text Content */}
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 text-white">
            <motion.div
              key={PROJECTS[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="uppercase tracking-widest text-sm text-white/80 mb-2 block">
                {PROJECTS[currentIndex].category}
              </span>
              <h3 className="font-serif text-4xl md:text-6xl mb-4">
                {PROJECTS[currentIndex].title}
              </h3>
              <p className="text-white/80 text-lg md:text-xl max-w-lg mb-8 line-clamp-2 md:line-clamp-none">
                {PROJECTS[currentIndex].description}
              </p>
              
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal bg-transparent">
                View Project
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden justify-center gap-6 mt-8">
           <button 
              onClick={handlePrev} 
              className="p-3 rounded-full border border-charcoal/20 hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={handleNext} 
              className="p-3 rounded-full border border-charcoal/20 hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default WorkCarousel;