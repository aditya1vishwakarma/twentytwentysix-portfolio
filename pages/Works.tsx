
import React from 'react';
import { motion as motionComponent } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { PROJECTS } from '../constants';
import OptimizedImage from '../components/UI/OptimizedImage';

const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

const Works: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-48 px-6 md:px-12 min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <h1 className="font-serif text-6xl md:text-8xl text-charcoal mb-8">Selected <br/>Works</h1>
          <div className="w-12 h-1 bg-moss mx-auto mb-8" />
          <p className="text-xl text-charcoal/60 max-w-2xl mx-auto leading-relaxed italic font-serif">
            A curation of multidisciplinary projects bridging architectural form, 
            digital growth, and organic brand identities.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index % 2 * 0.1, duration: 0.8 }}
            >
              <Link to={project.path} className="group block">
                <div className="relative aspect-[4/5] rounded-squircle overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl group-hover:shadow-moss/10 transition-all duration-700">
                  <OptimizedImage 
                    src={project.imageUrl} 
                    alt={project.title}
                    aspectRatio="aspect-auto"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-moss font-bold mb-2 block font-sans">
                      {project.category}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal group-hover:text-moss transition-colors">
                      {project.title}
                    </h2>
                  </div>
                  <span className="text-charcoal/30 font-serif italic text-lg">{project.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Works;
