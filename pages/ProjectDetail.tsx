
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion as motionComponent } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../constants';
import Button from '../components/UI/Button';
import OptimizedImage from '../components/UI/OptimizedImage';

const { useParams, Link, useNavigate } = ReactRouterDOM as any;
const motion = motionComponent as any;

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-serif">Project not found</h2>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <Link to="/works" className="inline-flex items-center gap-2 text-charcoal/60 hover:text-moss mb-8 transition-colors">
        <ArrowLeft size={20} />
        <span className="uppercase tracking-widest text-sm font-sans">Back to Works</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl text-charcoal mb-6"
          >
            {project.title}
          </motion.h1>
          <div className="flex flex-wrap gap-6 text-sm text-charcoal/60 font-sans uppercase tracking-widest">
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.date}</span>
            <span>•</span>
            <span>{project.role}</span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-video rounded-squircle overflow-hidden mb-16 shadow-xl shadow-moss/10">
        <OptimizedImage 
          src={project.imageUrl} 
          alt={project.title} 
          priority={true}
          aspectRatio="aspect-auto"
          className="w-full h-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h3 className="font-serif text-2xl mb-4 text-moss">The Challenge</h3>
          <p className="text-charcoal/70 leading-relaxed font-sans">
            Every project begins with a unique set of constraints and aspirations. 
            For {project.title}, the goal was to harmonize function with the specific aesthetic 
            demands of the environment.
          </p>
        </div>
        <div className="md:col-span-8">
          <h3 className="font-serif text-2xl mb-4 text-moss">The Solution</h3>
          <p className="text-xl leading-relaxed text-charcoal/90 mb-6 font-sans">
            {project.fullDescription}
          </p>
          <p className="text-charcoal/70 leading-relaxed font-sans">
            By leveraging a grid-based approach and focusing on typographic hierarchy, 
            we achieved a result that stands the test of time. The interactions were kept subtle 
            to ensure the content remained the hero, aligning with our philosophy of sophistication through simplicity.
          </p>
        </div>
      </div>

      <div className="mt-24 pt-12 border-t border-charcoal/10 flex justify-between items-center">
        <div className="text-charcoal/50 text-sm uppercase tracking-widest font-sans">Next Project</div>
        <Button onClick={() => {
          const nextId = String((parseInt(project.id) % PROJECTS.length) + 1);
          navigate(`/project/${nextId}`);
        }} variant="outline">
          Next Case Study
        </Button>
      </div>

    </motion.div>
  );
};

export default ProjectDetail;
