
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

  // 2. PHYSICS FOR FLUID BLOBS
  const springMain = { stiffness: 400, damping: 40, mass: 0.5 };
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

  const movementBuffer = useRef<{ x: number; y: number; time: number }[]>([]);

  useAnimationFrame((time, delta) => {
    const currentX = mouseX.get();
    const currentY = mouseY.get();
    const dist = Math.hypot(currentX - lastMousePos.current.x, currentY - lastMousePos.current.y);
    velocity.set((dist / (delta || 16)) * 1000);
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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "https://images.unsplash.com/photo-1518128958364-65859d70aa41?q=80&w=800",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800",
    "https://images.unsplash.com/photo-1433086566280-57820a221485?q=80&w=800",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=800",
    "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=800",
    "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=800",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800",
    "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=800",
    "https://images.unsplash.com/photo-1504567961542-e24d9439a724?q=80&w=800",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
    "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=800",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800",
    "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?q=80&w=800",
    "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800",
    "https://images.unsplash.com/photo-1518173946687-a4c036bc1b9d?q=80&w=800",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
    "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?q=80&w=800",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=800",
    "https://images.unsplash.com/photo-1527489377706-5bf97e608852?q=80&w=800"
  ];

  const handleReveal = () => { setIsFullyRevealed(true); setShowRevealButton(false); };
  const handleHide = () => { setIsFullyRevealed(false); movementBuffer.current = []; setSelectedImage(null); };

  return (
    <section
      ref={containerRef}
      className={`relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#D4DCDA] ${isHovered && !isFullyRevealed && !selectedImage ? 'cursor-none' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LAYER 1: BOTTOM GALLERY (Apple Photos Style) */}
      <div className="absolute inset-0 z-0 flex flex-col">
        {/* HEADER BAR */}
        <AnimatePresence>
          {isFullyRevealed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="w-full px-4 md:px-10 py-6 z-20 pointer-events-auto"
            >
              <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                {/* Left: Logo + Description */}
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-charcoal tracking-tight">
                    Aditya <span className="text-moss font-instrument italic font-normal">Vishwakarma</span>
                  </h2>
                  <p className="font-serif text-sm md:text-base text-charcoal/60 mt-1">
                    I am also a hobbyist photographer, here are some of my favorites.
                  </p>
                </div>
                {/* Right: Hide Button */}
                <motion.button
                  onClick={handleHide}
                  className="px-6 py-2.5 bg-charcoal text-white rounded-full font-sans text-xs tracking-widest uppercase hover:bg-moss transition-all active:scale-95 shadow-lg"
                >
                  Hide
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHOTO GRID - Edge to Edge */}
        <div className={`flex-1 w-full overflow-y-auto no-scrollbar transition-all duration-1000 ${isFullyRevealed ? "opacity-100" : "opacity-40"}`}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-0.5">
            {images.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.2 } }}
                onClick={() => isFullyRevealed && setSelectedImage(src)}
                className="cursor-pointer overflow-hidden aspect-square shadow-sm hover:shadow-2xl transition-shadow bg-white/10"
              >
                <img src={src} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* LIGHTBOX POPUP */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-full max-h-full bg-white shadow-2xl overflow-hidden"
                onClick={(e: any) => e.stopPropagation()}
              >
                <img src={selectedImage} className="max-w-full max-h-[80vh] object-contain" alt="Enlarged" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LAYER 2: THE SVG OVERLAY */}
      <svg className="absolute inset-0 z-10 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
          </filter>

          <mask id="hero-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <g filter="url(#goo)">
              {/* FIXED: Removed extra bracket from r={80} and handled scale properly */}
              <motion.circle cx={smoothX} cy={smoothY} r={100} fill="black" style={{ scale: blobScale }} />
              <motion.circle cx={trailX} cy={trailY} r={80} fill="black" />
              <motion.circle cx={slowX} cy={slowY} r={60} fill="black" />
            </g>
          </mask>
        </defs>

        <motion.g mask="url(#hero-mask)" animate={{ opacity: isFullyRevealed ? 0 : 1 }} transition={{ duration: 0.8 }}>
          <rect x="0" y="0" width="100%" height="100%" fill="#FBFAF8" />

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


      </svg>

      {/* UI CONTROLS - Only show Reveal button (Hide is now in header) */}
      <div className="absolute top-10 right-10 z-50 pointer-events-auto">
        <AnimatePresence mode="wait">
          {showRevealButton && !isFullyRevealed && (
            <motion.button
              key="reveal-btn" onClick={handleReveal}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="px-8 py-3 bg-moss text-white rounded-full font-sans text-sm tracking-widest uppercase hover:bg-charcoal transition-all shadow-2xl active:scale-95"
            >
              Reveal
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
