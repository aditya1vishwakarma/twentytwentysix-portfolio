import React, { useState, useEffect } from 'react';
import { motion as motionComponent, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const motion = motionComponent as any;

const CircularScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isHovered, setIsHovered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Smooth the scroll progress so the circle fills organically
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track when reading is complete
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v: number) => {
      setIsFinished(v >= 0.99);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Footer avoidance: use a raw motion value so scroll events never trigger React re-renders
  const rawBottom = useMotionValue(24);
  const smoothBottom = useSpring(rawBottom, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.5
  });

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const handleScroll = () => {
      const footerRect = footer.getBoundingClientRect();
      const overlap = window.innerHeight - footerRect.top;
      rawBottom.set(overlap > 0 ? overlap + 20 : 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [rawBottom]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showText = isHovered || isFinished;

  return (
    <motion.button
      onClick={handleScrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        fixed z-50 flex items-center justify-end overflow-hidden
        right-6 lg:right-auto lg:left-[calc(50%+24rem+2rem)]
        bg-white/10 backdrop-blur-[20px] 
        shadow-[0_20px_60px_-12px_rgba(0,0,0,0.20)]
        text-charcoal font-sans text-xs uppercase tracking-widest font-bold
        cursor-pointer
      `}
      style={{
        height: '40px',
        borderRadius: '20px',
        width: showText ? '160px' : '40px',
        bottom: smoothBottom,
        transition: 'width 0.5s ease-out, shadow 0.5s ease-out',
        border: 'none',
      }}
    >
      {/* "Back to Top" Text */}
      <div
        className={`whitespace-nowrap transition-opacity duration-350 ${showText ? 'opacity-100 delay-150' : 'opacity-0'
          }`}
        style={{ paddingLeft: '20px', paddingRight: '48px' }}
      >
        Back to Top
      </div>

      {/* The 40x40 circle area pinned to the right */}
      <div className="absolute right-0 top-0 w-[40px] h-[40px] flex items-center justify-center rounded-full pointer-events-none">

        {/* Background track */}
        <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0 rotate-[-90deg]">
          <circle
            cx="20" cy="20" r="16"
            fill="transparent"
            stroke="rgba(51,51,51,0.05)"
            strokeWidth="3"
          />
        </svg>

        {/* Foreground progress ring */}
        <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0 rotate-[-90deg]">
          <motion.circle
            cx="20" cy="20" r="16"
            fill="transparent"
            stroke="var(--color-moss)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
          />
        </svg>
      </div>
    </motion.button>
  );
};

export default CircularScrollIndicator;
