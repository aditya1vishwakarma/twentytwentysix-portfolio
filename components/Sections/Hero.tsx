
import React, { useState, useEffect, useRef } from 'react';
import { motion as motionComponent, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

// Fix: Cast motion to any to resolve property existence type errors for SVG and HTML motion elements
const motion = motionComponent as any;

const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRevealButton, setShowRevealButton] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. MOTION VALUES
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocity = useMotionValue(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // 2. PHYSICS FOR FLUID BLOBS (Varying lag for stretching effect)
  // Main blob follows closely
  const springMain = { stiffness: 400, damping: 40, mass: 0.5 };
  // Trailing blobs lag behind
  const springTrail = { stiffness: 180, damping: 25, mass: 1 };
  const springSlow = { stiffness: 100, damping: 20, mass: 1.5 };

  const smoothX = useSpring(mouseX, springMain);
  const smoothY = useSpring(mouseY, springMain);
  const trailX = useSpring(mouseX, springTrail);
  const trailY = useSpring(mouseY, springTrail);
  const slowX = useSpring(mouseX, springSlow);
  const slowY = useSpring(mouseY, springSlow);

  // 3. DYNAMIC PARAMETERS
  const blobScale = useTransform(velocity, [0, 2000], [1, 1.3]);
  const blobDistortion = useTransform(velocity, [0, 2000], [20, 60]);

  const movementBuffer = useRef<{ x: number; y: number; time: number }[]>([]);

  // Update velocity for distortion effects
  useAnimationFrame((time, delta) => {
    const currentX = mouseX.get();
    const currentY = mouseY.get();
    const dist = Math.hypot(currentX - lastMousePos.current.x, currentY - lastMousePos.current.y);
    velocity.set((dist / delta) * 1000);
    lastMousePos.current = { x: currentX, y: currentY };
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);

      if (isFullyRevealed) return;

      const now = Date.now();
      movementBuffer.current.push({ x, y, time: now });
      movementBuffer.current = movementBuffer.current.filter(p => now - p.time < 1500);

      if (movementBuffer.current.length > 10) {
        let totalDist = 0;
        for (let i = 1; i < movementBuffer.current.length; i++) {
          totalDist += Math.hypot(
            movementBuffer.current[i].x - movementBuffer.current[i - 1].x,
            movementBuffer.current[i].y - movementBuffer.current[i - 1].y
          );
        }
        if (totalDist > 1600 && !showRevealButton) setShowRevealButton(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showRevealButton, isFullyRevealed]);

  const handleReveal = () => { setIsFullyRevealed(true); setShowRevealButton(false); };
  const handleHide = () => { setIsFullyRevealed(false); movementBuffer.current = []; };

  return (
    <section 
      ref={containerRef}
      className={`relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#D4DCDA] ${isHovered && !isFullyRevealed ? 'cursor-none' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LAYER 1: BOTTOM GALLERY (REVEALED CONTENT) */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-12">
        <AnimatePresence>
          {isFullyRevealed && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
              className="absolute top-10 left-10 z-20 pointer-events-none"
            >
              <h2 className="font-serif text-2xl text-charcoal tracking-tight">
                Aditya <span className="text-moss font-instrument italic font-normal">Vishwakarma</span>
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={isFullyRevealed ? "opacity-100 scale-100 transition-all duration-1000" : "opacity-40 scale-95"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl h-[60vh]">
            <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl"><img src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=800" className="w-full h-full object-cover grayscale" /></div>
            <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl mt-24"><img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800" className="w-full h-full object-cover grayscale" /></div>
            <div className="overflow-hidden rounded-2xl bg-white/20 shadow-xl -mt-12"><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" className="w-full h-full object-cover grayscale" /></div>
          </div>
        </div>
      </div>

      {/* LAYER 2: THE SVG OVERLAY (MASKING THE TOP LAYER) */}
      <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          {/* THE GOOEY FILTER (Applied only to the black blobs in the mask) */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
          </filter>

          {/* TURBULENCE (Rippling based on speed) */}
          <filter id="distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" />
          </filter>

          {/* THE MASK: White shows the top layer, Black reveals the gallery underneath */}
          <mask id="hero-mask">
            {/* Start with a full white rectangle (entire top layer visible) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* The Blobs (Filled black to "punch a hole") */}
            <g filter="url(#goo)">
              {/* Main Nucleus (Slightly sharper) */}
              <motion.circle cx={smoothX} cy={smoothY} r={140} fill="black" style={{ scale: blobScale } as any} />
              {/* Stretching tails */}
              <motion.circle cx={trailX} cy={trailY} r={110} fill="black" />
              <motion.circle cx={slowX} cy={slowY} r={85} fill="black" />
            </g>
          </mask>
        </defs>

        {/* THE TOP LAYER RECT (Using the mask above) */}
        <motion.g mask="url(#hero-mask)" animate={{ opacity: isFullyRevealed ? 0 : 1 }} transition={{ duration: 0.8 }}>
          {/* Background of the top layer */}
          <rect x="0" y="0" width="100%" height="100%" fill="#FBFAF8" />
          
          {/* Typography inside the SVG to ensure perfect masking alignment */}
          <foreignObject x="0" y="0" width="100%" height="100%">
            <div className="flex flex-col justify-center items-center h-full w-full text-center px-4">
              <h1 className="font-serif leading-none text-charcoal mb-4 whitespace-nowrap text-[clamp(2.5rem,8.5vw,11rem)]">
                Aditya <span className="text-moss font-instrument italic font-normal">Vishwakarma</span>
              </h1>
              <div className="w-24 md:w-32 h-[1px] bg-charcoal/20 mx-auto mb-10" />
              <p className="text-lg md:text-3xl text-charcoal/60 font-sans tracking-tight">
                Product and Growth, Based in San Francisco.
              </p>
            </div>
          </foreignObject>
        </motion.g>
        
        {/* SUBTLE CURSOR INDICATOR (Only visible if not fully revealed) */}
        {!isFullyRevealed && isHovered && (
          <motion.circle cx={smoothX} cy={smoothY} r={4} fill="#2E4F0A" opacity="0.4" />
        )}
      </svg>

      {/* UI CONTROLS */}
      <div className="absolute top-10 right-10 z-50 pointer-events-auto">
        <AnimatePresence mode="wait">
          {showRevealButton && !isFullyRevealed && (
            <motion.button
              key="reveal-btn" onClick={handleReveal}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="px-8 py-3 bg-moss text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-charcoal transition-all shadow-2xl active:scale-95"
            >
              Reveal All
            </motion.button>
          )}
          {isFullyRevealed && (
            <motion.button
              key="hide-btn" onClick={handleHide}
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="px-8 py-3 bg-charcoal text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-moss transition-all active:scale-95 shadow-lg"
            >
              Hide
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
