
import React, { useRef, useState, useEffect } from 'react';
import { motion as motionComponent } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { PROJECTS } from '../../constants';
import OptimizedImage from '../UI/OptimizedImage';

const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

const WorkCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Focus on the first 3 projects for the homepage highlight
  const displayProjects = PROJECTS.slice(0, 3);

  // Track horizontal scroll to determine active index
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const containerWidth = el.offsetWidth;
      const scrollWidth = el.scrollWidth;
      
      // Calculate active index based on how far we've scrolled relative to total scrollable area
      const maxScroll = scrollWidth - containerWidth;
      if (maxScroll <= 0) return;

      const scrollPercentage = scrollLeft / maxScroll;
      const index = Math.round(scrollPercentage * (displayProjects.length - 1));
      
      setActiveIndex(Math.max(0, Math.min(index, displayProjects.length - 1)));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    // Also handle window resize which changes containerWidth
    window.addEventListener('resize', handleScroll);
    
    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [displayProjects.length]);

  return (
    <section 
      id="works"
      className="relative bg-background py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-10 md:mb-14 flex items-baseline justify-between">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl text-charcoal leading-none"
          >
            Selected <span className="text-moss font-instrument italic font-normal">Works</span>
          </motion.h2>
          
          <div className="hidden md:block text-charcoal/30 text-[10px] uppercase tracking-[0.4em] font-black">
            Archive // 01—03
          </div>
        </div>

        {/* HORIZONTAL CAROUSEL - Constrained and Clean */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing touch-pan-x"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* Spacer to allow centering of the last card */}
          <div className="min-w-[10vw] md:min-w-[20vw] h-1 flex-shrink-0" />
        </div>

        {/* SEGMENTED PROGRESS BAR - The main navigation indicator */}
        <div className="flex gap-3 w-full h-[2px] max-w-2xl">
          {displayProjects.map((_, idx) => (
            <div 
              key={idx} 
              className="flex-1 bg-charcoal/5 relative overflow-hidden rounded-full h-full"
            >
              <motion.div 
                initial={false}
                animate={{ 
                  backgroundColor: idx === activeIndex ? '#2E4F0A' : 'rgba(51, 51, 51, 0.05)',
                  opacity: idx === activeIndex ? 1 : 0
                }}
                className="absolute inset-0 origin-left"
              />
              {idx === activeIndex && (
                <motion.div 
                  layoutId="activeCarouselSegment"
                  className="absolute inset-0 bg-moss"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="min-w-[80vw] sm:min-w-[400px] md:min-w-[520px] max-w-[520px] snap-start flex-shrink-0"
    >
      <div className="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
        
        {/* Image Frame - Aspect ratio controlled to prevent vertical bloating */}
        <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/5">
          <OptimizedImage 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-charcoal/5 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Content Footer - Title on top, Category below with intentional spacing */}
        <div className="p-8 md:p-10 bg-white flex items-end justify-between">
          <div className="flex flex-col">
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 leading-tight">
              {project.title}
            </h3>
            <span className="text-[10px] uppercase tracking-[0.3em] text-moss font-black">
              {project.category}
            </span>
          </div>

          {/* Read More Link */}
          <Link 
            to={project.path}
            className="flex flex-col items-end group/btn"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-charcoal/40 group-hover/btn:text-moss transition-colors">
              Read More
            </span>
            <div className="w-6 h-[1px] bg-charcoal/10 mt-3 group-hover/btn:w-full group-hover/btn:bg-moss transition-all duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCarousel;
