import React, { useRef, useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion as motionComponent, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import Button from '../components/UI/Button';

// Fix: Cast imports to any to resolve environment-specific type errors
const { useParams, Link, useNavigate } = ReactRouterDOM as any;
const motion = motionComponent as any;

const BlogPostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);
  const articleRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the article container
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start center", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Map progress to vertical movement (0 to 100%)
  const dropletY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  // State to trigger ripple animation when reaching the end
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      if (v > 0.98) setHasReachedEnd(true);
      else setHasReachedEnd(false);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!post) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-serif">Post not found</h2>
        <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
      </div>
    );
  }

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

        {/* --- PROGRESS INDICATOR (Right Side) --- */}
        <div className="hidden lg:block absolute -right-24 top-0 bottom-0 w-12 pointer-events-none">
          <div className="sticky top-1/2 -translate-y-1/2 h-[400px] w-full flex flex-col items-center">
            {/* The Track */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-[#0C6291]/10 rounded-full" />
            
            {/* The Droplet */}
            <motion.div 
              style={{ top: dropletY } as any}
              className="absolute z-10 flex flex-col items-center"
            >
              <svg width="14" height="20" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 32C18.6274 32 24 26.6274 24 20C24 13.3726 12 0 12 0C12 0 0 13.3726 0 20C0 26.6274 5.37258 32 12 32Z" fill={dropletColor} />
              </svg>
            </motion.div>

            {/* The Puddle & Ripple */}
            <div className="absolute bottom-0 w-full flex justify-center">
              {/* Ripple Effect */}
              {hasReachedEnd && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-1 w-6 h-3 rounded-[100%] border border-[#0C6291]"
                />
              )}
              {/* Puddle */}
              <svg width="32" height="8" viewBox="0 0 32 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="16" cy="4" rx="16" ry="4" fill={dropletColor} fillOpacity="0.2" />
                <ellipse cx="16" cy="4" rx="10" ry="2.5" fill={dropletColor} />
              </svg>
            </div>
          </div>
        </div>

        <header className="mb-16">
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-charcoal/40 mb-6">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-charcoal/20 rounded-full" />
            <span>{post.readTime}</span>
            <span className="w-1 h-1 bg-charcoal/20 rounded-full" />
            <span className="text-moss font-bold">{post.category}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal leading-tight">
            {post.title}
          </h1>
        </header>

        <div ref={articleRef} className="prose prose-xl prose-charcoal">
          <p className="text-2xl font-serif italic text-charcoal/60 mb-12 border-l-4 border-moss pl-8 py-2">
            {post.excerpt}
          </p>
          <div className="text-xl leading-relaxed text-charcoal/80 space-y-8 font-sans">
            {/* Fix: post.content is now properly defined in the BlogPost interface */}
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-charcoal/10 text-center">
          <h4 className="text-sm uppercase tracking-widest text-charcoal/40 mb-8">Ready for more?</h4>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
             <Button onClick={() => navigate('/blog')} variant="outline">Browse All Articles</Button>
             <Button onClick={() => navigate('/works')}>View Projects</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostDetail;