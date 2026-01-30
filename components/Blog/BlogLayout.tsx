
import React, { useRef, useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion as motionComponent, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../UI/Button';

const { Link, useNavigate } = ReactRouterDOM as any;
const motion = motionComponent as any;

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt?: string;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, title, date, readTime, category, excerpt }) => {
  const navigate = useNavigate();
  const articleRef = useRef<HTMLDivElement>(null);

  /* 
24:   const { scrollYProgress } = useScroll({
25:     target: articleRef,
26:     offset: ["start center", "end end"]
27:   });
28: 
29:   const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
30:   const dropletY = useTransform(smoothProgress, [0, 1], ["0%", "calc(100% - 14px)"]);
31:   const [hasReachedEnd, setHasReachedEnd] = useState(false);
32: 
33:   useEffect(() => {
34:     const unsubscribe = scrollYProgress.onChange(v => {
35:       if (v > 0.98) setHasReachedEnd(true);
36:       else setHasReachedEnd(false);
37:     });
38:     return () => unsubscribe();
39:   }, [scrollYProgress]);
40:   */

  const dropletColor = "#0C6291";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-background relative"
    >
      <div className="max-w-4xl mx-auto relative">
        <Link to="/blog" className="inline-flex items-center gap-2 text-charcoal/60 hover:text-moss mb-12 transition-colors">
          <ArrowLeft size={20} />
          <span className="uppercase tracking-widest text-sm">Back to Journal</span>
        </Link>

        {/* --- PROGRESS INDICATOR --- */}
        {/* 
57:         <div className="hidden sm:block absolute -right-24 top-0 bottom-0 w-12 pointer-events-none">
58:           <div className="sticky top-1/2 -translate-y-1/2 h-[400px] w-full flex flex-col items-center">
59:             <div className="absolute top-0 bottom-0 w-[1px] bg-[#0C6291]/10 rounded-full" />
60: 
61:             <motion.div
62:               style={{ top: dropletY } as any}
63:               className="absolute z-10 flex flex-col items-center"
64:             >
65:               <svg width="14" height="20" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
66:                 <path d="M12 32C18.6274 32 24 26.6274 24 20C24 13.3726 12 0 12 0C12 0 0 13.3726 0 20C0 26.6274 5.37258 32 12 32Z" fill={dropletColor} />
67:               </svg>
68:             </motion.div>
69: 
70:             <div className="absolute bottom-0 w-full flex justify-center">
71:               {hasReachedEnd && (
72:                 <motion.div
73:                   initial={{ scale: 0.5, opacity: 0.8 }}
74:                   animate={{ scale: 3, opacity: 0 }}
75:                   transition={{ duration: 1.5, repeat: Infinity }}
76:                   className="absolute bottom-1 w-6 h-3 rounded-[100%] border border-[#0C6291]"
77:                 />
78:               )}
79:               <svg width="32" height="8" viewBox="0 0 32 8" fill="none" xmlns="http://www.w3.org/2000/svg">
80:                 <ellipse cx="16" cy="4" rx="16" ry="4" fill={dropletColor} fillOpacity="0.2" />
81:                 <ellipse cx="16" cy="4" rx="10" ry="2.5" fill={dropletColor} />
82:               </svg>
83:             </div>
84:           </div>
85:         </div>
        */}

        <header className="mb-16">
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-charcoal/40 mb-6">
            <span>{date}</span>
            <span className="w-1 h-1 bg-charcoal/20 rounded-full" />
            <span>{readTime}</span>
            <span className="w-1 h-1 bg-charcoal/20 rounded-full" />
            <span className="text-moss font-bold">{category}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal leading-tight">
            {title}
          </h1>
          {excerpt && (
            <p className="mt-8 text-2xl font-serif italic text-charcoal/60 border-l-4 border-moss pl-8 py-2">
              {excerpt}
            </p>
          )}
        </header>

        <article ref={articleRef} className="prose prose-xl prose-charcoal max-w-none">
          {children}
        </article>

        {/* 
        <div className="mt-24 pt-12 border-t border-charcoal/10 text-center">
          <h4 className="text-sm uppercase tracking-widest text-charcoal/40 mb-8">Ready for more?</h4>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/blog')} variant="outline">Browse All Articles</Button>
            <Button onClick={() => navigate('/works')}>View Projects</Button>
          </div>
        </div>
        */}
      </div>
    </motion.div>
  );
};

export default BlogLayout;
