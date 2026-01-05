import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRevealButton, setShowRevealButton] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  
  // 1. SPRING PHYSICS SETUP
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring coordinates for "Liquid/Lag" effect
  const springConfig = { stiffness: 60, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 2. WIGGLE DETECTION LOGIC
  const movementBuffer = useRef<{ x: number; y: number; time: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // We only track wiggle if the screen is NOT fully revealed
      if (isFullyRevealed) return;

      const now = Date.now();
      movementBuffer.current.push({ x: e.clientX, y: e.clientY, time: now });

      // Keep only last 1.5 seconds of data
      movementBuffer.current = movementBuffer.current.filter(p => now - p.time < 1500);

      // Calculate total distance traveled in 1.5s
      if (movementBuffer.current.length > 2) {
        let totalDist = 0;
        for (let i = 1; i < movementBuffer.current.length; i++) {
          const d = Math.hypot(
            movementBuffer.current[i].x - movementBuffer.current[i - 1].x,
            movementBuffer.current[i].y - movementBuffer.current[i - 1].y
          );
          totalDist += d;
        }

        // Trigger reveal button if wiggle intensity is high enough
        if (totalDist > 1400 && !showRevealButton) {
          setShowRevealButton(true);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showRevealButton, isFullyRevealed]);

  // Transform spring values into a CSS mask string
  // This creates the "peephole" effect
  const maskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(circle 250px at ${x}px ${y}px, transparent 0%, transparent 100%, black 100%)`
  );

  const handleReveal = () => {
    setIsFullyRevealed(true);
    setShowRevealButton(false); // Hide the button once clicked
  };

  const handleHide = () => {
    setIsFullyRevealed(false);
    movementBuffer.current = []; // Reset wiggle tracking
  };

  return (
    <section 
      className={`relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#D4DCDA] ${isHovered && !isFullyRevealed ? 'cursor-none' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* LAYER 1: BOTTOM GALLERY (The revealed part) */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-12">
        {/* Smaller Branded Logo at Top Left (Only visible when revealed) */}
        <AnimatePresence>
          {isFullyRevealed && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-10 left-10 z-20"
            >
              <h2 className="font-serif text-2xl text-charcoal tracking-tight">
                Aditya <span className="text-moss font-instrument italic font-normal">Vishwakarma</span>
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl h-[60vh]"
          animate={{ scale: isFullyRevealed ? 1 : 0.98, opacity: isFullyRevealed ? 1 : 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl shadow-black/5">
            <img src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Nature 1" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl shadow-black/5 mt-12 md:mt-24">
            <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Nature 2" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl shadow-black/5 -mt-12 md:-mt-12">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Nature 3" />
          </div>
        </motion.div>
      </div>

      {/* LAYER 2: TOP MASKED CONTENT */}
      <motion.div 
        style={{ 
          maskImage: isFullyRevealed ? 'none' : maskImage,
          WebkitMaskImage: isFullyRevealed ? 'none' : maskImage,
        }}
        animate={{ opacity: isFullyRevealed ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 z-10 bg-[#FBFAF8] flex flex-col justify-center items-center pointer-events-none"
      >
        <div className="max-w-7xl mx-auto w-full text-center px-6">
          <motion.h1 
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none text-charcoal mb-8"
          >
            Aditya <span className="text-moss font-instrument italic font-normal">Vishwakarma</span>
          </motion.h1>
          <div className="w-32 h-[1px] bg-charcoal/20 mx-auto mb-10" />
          <p className="text-xl md:text-3xl text-charcoal/60 font-sans tracking-tight">
            Growth and Product, Based in San Francisco.
          </p>
        </div>
      </motion.div>

      {/* REVEAL / HIDE INTERFACE */}
      <div className="fixed top-10 right-10 z-50 pointer-events-auto">
        <AnimatePresence mode="wait">
          {showRevealButton && !isFullyRevealed && (
            <motion.div
              key="reveal-ui"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-4"
            >
              <span className="hidden md:block text-moss font-sans text-xs uppercase tracking-widest bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-moss/10 shadow-sm">
                Wiggle detected
              </span>
              <button
                onClick={handleReveal}
                className="px-8 py-3 bg-moss text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-charcoal transition-all duration-300 shadow-2xl shadow-moss/30 active:scale-95"
              >
                Reveal All
              </button>
            </motion.div>
          )}

          {isFullyRevealed && (
            <motion.button
              key="hide-ui"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleHide}
              className="px-8 py-3 bg-charcoal text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-moss transition-all duration-300 shadow-2xl shadow-black/20 active:scale-95"
            >
              Hide Layer
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* CUSTOM CURSOR ICON (Follows mouse inside the section) */}
      <AnimatePresence>
        {isHovered && !isFullyRevealed && (
          <motion.div
            style={{ 
              position: 'fixed',
              left: 0,
              top: 0,
              x: mouseX,
              y: mouseY
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none z-50 text-moss -ml-4 -mt-4"
          >
            <div className="relative">
                {/* Ping animation to draw attention to the mask center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-moss opacity-30 animate-ping" />
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HINT ELEMENT (Bottom Scroll Arrow) */}
      <motion.div 
        animate={{ opacity: isFullyRevealed ? 0 : 0.4 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none z-20 text-charcoal/40"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;