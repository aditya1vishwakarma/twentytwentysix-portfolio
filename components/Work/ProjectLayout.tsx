
import React, { useRef, useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion as motionComponent, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../UI/Button';
import OptimizedImage from '../UI/OptimizedImage';

const { Link, useNavigate } = ReactRouterDOM as any;
const motion = motionComponent as any;

interface ProjectLayoutProps {
  children: React.ReactNode;
  title: string;
  category: string;
  date: string;
  role: string;
  heroImage: string;
  nextProjectPath?: string;
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ 
  children, 
  title, 
  category, 
  date, 
  role, 
  heroImage,
  nextProjectPath 
}) => {
  const navigate = useNavigate();
  const articleRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start center", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const dropletY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => setHasReachedEnd(v > 0.95));
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Moss Green theme for project indicators
  const indicatorColor = "#2E4F0A"; 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-background relative"
    >
      <div className="max-w-7xl mx-auto relative">
        <Link to="/works" className="inline-flex items-center gap-2 text-charcoal/40 hover:text-moss mb-12 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">Back to Works</span>
        </Link>

        {/* --- PROGRESS INDICATOR (PROJECT THEME: MOSS GREEN) --- */}
        <div className="hidden xl:block absolute -right-16 top-0 bottom-0 w-8 pointer-events-none">
          <div className="sticky top-1/2 -translate-y-1/2 h-[400px] w-full flex flex-col items-center">
            <div className="absolute top-0 bottom-0 w-[1px] bg-moss/10 rounded-full" />
            <motion.div style={{ top: dropletY } as any} className="absolute z-10 flex flex-col items-center">
              {/* Droplet icon in Moss Green */}
              <svg width="12" height="18" viewBox="0 0 24 32" fill="none">
                <path d="M12 32C18.6274 32 24 26.6274 24 20C24 13.3726 12 0 12 0C12 0 0 13.3726 0 20C0 26.6274 5.37258 32 12 32Z" fill={indicatorColor} />
              </svg>
            </motion.div>
            <div className="absolute bottom-0 w-full flex justify-center">
              {hasReachedEnd && (
                <motion.div initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 1, repeat: Infinity }}
                  className="absolute bottom-1 w-6 h-3 rounded-[100%] border border-moss"
                />
              )}
            </div>
          </div>
        </div>

        <header className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-6xl md:text-8xl text-charcoal leading-none mb-8">
                {title}
              </h1>
              <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/40">
                <div className="flex flex-col gap-1">
                  <span className="text-moss/40">Category</span>
                  <span className="text-charcoal">{category}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-moss/40">Timeline</span>
                  <span className="text-charcoal">{date}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-moss/40">Role</span>
                  <span className="text-charcoal">{role}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="relative w-full aspect-[21/9] rounded-squircle overflow-hidden mb-24 shadow-2xl shadow-moss/10">
          <OptimizedImage src={heroImage} alt={title} priority={true} aspectRatio="aspect-auto" className="w-full h-full" />
        </div>

        <article ref={articleRef} className="max-w-none">
          {children}
        </article>

        <div className="mt-48 pt-12 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
             <span className="text-[10px] uppercase tracking-widest text-charcoal/40 block mb-2">Next Journey</span>
             <h3 className="font-serif text-3xl text-charcoal">Interested in more?</h3>
           </div>
           <div className="flex gap-4">
             <Button onClick={() => navigate('/works')} variant="outline">Browse All</Button>
             {nextProjectPath && (
               <Button onClick={() => navigate(nextProjectPath)}>Next Project</Button>
             )}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectLayout;
