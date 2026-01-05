import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRevealButton, setShowRevealButton] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  
  // 1. SPRING PHYSICS SETUP
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Loupe dimensions
  const LOUPE_SIZE = 340; 
  const ZOOM_FACTOR = 2.2; 
  const LENS_RADIUS = (LOUPE_SIZE * 0.76) / 2;

  // Spring coordinates - heavy, premium feel for the loupe movement
  const springConfig = { stiffness: 35, damping: 20, mass: 1.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 2. WIGGLE DETECTION
  const movementBuffer = useRef<{ x: number; y: number; time: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get relative coordinates within the section if needed, but since it's full screen hero, clientX/Y is fine
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (isFullyRevealed) return;

      const now = Date.now();
      movementBuffer.current.push({ x: e.clientX, y: e.clientY, time: now });
      movementBuffer.current = movementBuffer.current.filter(p => now - p.time < 1500);

      if (movementBuffer.current.length > 2) {
        let totalDist = 0;
        for (let i = 1; i < movementBuffer.current.length; i++) {
          totalDist += Math.hypot(
            movementBuffer.current[i].x - movementBuffer.current[i - 1].x,
            movementBuffer.current[i].y - movementBuffer.current[i - 1].y
          );
        }
        if (totalDist > 1400 && !showRevealButton) setShowRevealButton(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showRevealButton, isFullyRevealed, mouseX, mouseY]);

  // Mask creates the hole in the white top layer
  const maskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(circle ${LENS_RADIUS}px at ${x}px ${y}px, transparent 100%, black 100%)`
  );

  // Magnification logic: the content inside the loupe moves in reverse proportional to zoom
  const magnifyX = useTransform(smoothX, (x) => (window.innerWidth / 2 - x) * (ZOOM_FACTOR - 1));
  const magnifyY = useTransform(smoothY, (y) => (window.innerHeight / 2 - y) * (ZOOM_FACTOR - 1));

  const handleReveal = () => { setIsFullyRevealed(true); setShowRevealButton(false); };
  const handleHide = () => { setIsFullyRevealed(false); movementBuffer.current = []; };

  // Shared Gallery Layout
  const GalleryContent = ({ isZoomed = false }) => (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl h-[60vh]"
      style={isZoomed ? { x: magnifyX, y: magnifyY, scale: ZOOM_FACTOR } : {}}
    >
      <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl">
        <img src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=800" className="w-full h-full object-cover grayscale" alt="Nature 1" />
      </div>
      <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl mt-12 md:mt-24">
        <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800" className="w-full h-full object-cover grayscale" alt="Nature 2" />
      </div>
      <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl -mt-12 md:-mt-12">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" className="w-full h-full object-cover grayscale" alt="Nature 3" />
      </div>
    </motion.div>
  );

  return (
    <section 
      className={`relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#D4DCDA] ${isHovered && !isFullyRevealed ? 'cursor-none' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* LAYER 1: BOTTOM GALLERY (Revealed State Content) */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-12">
        <AnimatePresence>
          {isFullyRevealed && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="absolute top-10 left-10 z-20 pointer-events-none"
            >
              <h2 className="font-serif text-2xl text-charcoal tracking-tight">
                Aditya <span className="text-moss font-instrument italic font-normal">Vishwakarma</span>
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={isFullyRevealed ? "opacity-100 scale-100 transition-all duration-1000" : "opacity-40 scale-95"}>
          <GalleryContent />
        </div>
      </div>

      {/* LAYER 2: TOP MASKED CONTENT (Static Landing View) */}
      <motion.div 
        style={{ 
          maskImage, 
          WebkitMaskImage: maskImage 
        }}
        animate={{ opacity: isFullyRevealed ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-10 bg-[#FBFAF8] flex flex-col justify-center items-center pointer-events-none"
      >
        <div className="max-w-7xl mx-auto w-full text-center px-6">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none text-charcoal mb-8">
            Aditya <span className="text-moss font-instrument italic font-normal">Vishwakarma</span>
          </h1>
          <div className="w-32 h-[1px] bg-charcoal/20 mx-auto mb-10" />
          <p className="text-xl md:text-3xl text-charcoal/60 font-sans tracking-tight">
            Growth and Product, Based in San Francisco.
          </p>
        </div>
      </motion.div>

      {/* REVEAL / HIDE INTERFACE (Contained within Section to avoid persistence on scroll) */}
      <div className="absolute top-10 right-10 z-50 pointer-events-auto">
        <AnimatePresence mode="wait">
          {showRevealButton && !isFullyRevealed && (
            <motion.button
              key="reveal-btn"
              onClick={handleReveal}
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-8 py-3 bg-moss text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-charcoal transition-all shadow-2xl active:scale-95"
            >
              Reveal All
            </motion.button>
          )}
          {isFullyRevealed && (
            <motion.button
              key="hide-btn"
              onClick={handleHide}
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-8 py-3 bg-charcoal text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-moss transition-all active:scale-95 shadow-lg"
            >
              Hide
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* CUSTOM SKEUOMORPHIC LOUPE */}
      <AnimatePresence>
        {isHovered && !isFullyRevealed && (
          <motion.div
            style={{ 
              position: 'fixed',
              left: 0, top: 0,
              x: smoothX, y: smoothY,
              width: LOUPE_SIZE, height: LOUPE_SIZE,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="pointer-events-none z-50 flex items-center justify-center"
          >
            {/* 1. The Lens Area (Magnified Content) */}
            <div 
              className="absolute overflow-hidden rounded-full flex items-center justify-center"
              style={{ width: LENS_RADIUS * 2, height: LENS_RADIUS * 2 }}
            >
               {/* This content is positioned relative to the screen, but masked to this circle */}
               <GalleryContent isZoomed={true} />
               
               {/* 2. Glass Physicality / Distortion layers */}
               <div className="absolute inset-0 rounded-full border-[12px] border-black/10 backdrop-blur-[3px] pointer-events-none" />
               <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none" />
               
               {/* Refraction simulation - chromatic aberration-like tint */}
               <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/5 via-transparent to-orange-500/5 mix-blend-overlay pointer-events-none" />
            </div>

            {/* 3. The Loupe Hardware (SVG) */}
            <svg width={LOUPE_SIZE} height={LOUPE_SIZE} viewBox="0 0 200 200" className="absolute top-0 left-0 drop-shadow-2xl">
              <defs>
                <radialGradient id="loupe-rim-depth" cx="50%" cy="50%" r="50%">
                  <stop offset="76%" stopColor="#0a0a0a" />
                  <stop offset="82%" stopColor="#2a2a2a" />
                  <stop offset="88%" stopColor="#151515" />
                  <stop offset="94%" stopColor="#222" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
                <linearGradient id="lens-glare-effect" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                  <stop offset="35%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Outer Shadow for depth */}
              <circle cx="100" cy="100" r="98" fill="black" opacity="0.3" />
              
              {/* Heavy Metallic Bezel */}
              <circle cx="100" cy="100" r="92" fill="url(#loupe-rim-depth)" />
              
              {/* Beveled Detail Lines */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#ffffff08" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="76" fill="none" stroke="#ffffff15" strokeWidth="0.3" />
              
              {/* Surface Glare on the Glass */}
              <circle cx="100" cy="100" r="76" fill="url(#lens-glare-effect)" />
              
              {/* Engraved Text on the Rim */}
              <path id="rim-text-path" d="M 35,100 A 65,65 0 0,1 165,100" fill="none" />
              <text fontSize="5.5" fontFamily="Inter" fontWeight="600" fill="white" opacity="0.5" letterSpacing="1.2">
                <textPath href="#rim-text-path" startOffset="50%" textAnchor="middle">
                  PHOTOGRAPHER'S LOUPE • 8.0X SYSTEM
                </textPath>
              </text>
              
              <path id="rim-text-path-bottom" d="M 35,100 A 65,65 0 0,0 165,100" fill="none" />
              <text fontSize="4.5" fontFamily="Inter" fill="white" opacity="0.2" letterSpacing="2">
                <textPath href="#rim-text-path-bottom" startOffset="50%" textAnchor="middle">
                  VISHWAKARMA OPTICS
                </textPath>
              </text>
              
              {/* Precision Reticle */}
              <g stroke="white" strokeOpacity="0.15" strokeWidth="0.4">
                 <line x1="100" y1="72" x2="100" y2="128" />
                 <line x1="72" y1="100" x2="128" y2="100" />
                 <circle cx="100" cy="100" r="1.5" fill="white" fillOpacity="0.1" stroke="none" />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL INDICATOR */}
      <motion.div 
        animate={{ opacity: isFullyRevealed ? 0 : 0.3 }} 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-charcoal/50 z-20"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;