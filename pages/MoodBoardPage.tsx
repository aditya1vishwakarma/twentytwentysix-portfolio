
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion as motionComponent, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { MOOD_BOARD } from '../constants';

const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

const MoodBoardPage: React.FC = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  // Logic to fill with placeholders if the real MOOD_BOARD is short
  const displayItems = useMemo(() => {
    const items = [...MOOD_BOARD];
    if (items.length < 30) {
      const remaining = 30 - items.length;
      for (let i = 0; i < remaining; i++) {
        items.push({
          id: `placeholder-${i}`,
          title: 'Perspective',
          imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`,
          tags: ['Draft', 'Concept'],
          description: 'A structural placeholder for the evolving archive.'
        });
      }
    }
    return items.slice(0, 50);
  }, []);

  const totalImages = displayItems.length;
  const progress = totalImages > 0 ? (loadedCount / totalImages) * 100 : 100;

  // Custom Cursor Springs
  const cursorX = useSpring(0, { stiffness: 1000, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 50 });

  // Handle responsive resize
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Grid Layout Calculation
  const { galleryItems, contentWidth, contentHeight } = useMemo(() => {
    const isMobile = windowSize.width < 768;
    const isTablet = windowSize.width < 1024;
    const colCount = isMobile ? 4 : isTablet ? 6 : 10;
    const colWidth = isMobile ? 160 : isTablet ? 220 : 300;
    const gapSize = isMobile ? 24 : isTablet ? 40 : 60;

    const items: any[] = [];
    const colHeights = new Array(colCount).fill(0).map(() => Math.random() * 100);

    displayItems.forEach((baseItem, i) => {
      const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));
      const isPortrait = (i % 3 === 0) || (i % 7 === 0);
      const width = colWidth;
      const height = isPortrait ? width * 1.4 : width * 0.9;
      const x = shortestColIndex * (colWidth + gapSize);
      const y = colHeights[shortestColIndex];

      items.push({
        ...baseItem,
        id: baseItem.id || `gallery-item-${i}`,
        x,
        y,
        width,
        height,
        aspectRatio: isPortrait ? 'aspect-[2/3]' : 'aspect-[16/11]'
      });

      colHeights[shortestColIndex] += height + gapSize;
    });

    return { 
      galleryItems: items, 
      contentWidth: colCount * (colWidth + gapSize) - gapSize, 
      contentHeight: Math.max(...colHeights) 
    };
  }, [windowSize.width, displayItems]);

  // Motion Values for Canvas
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const canvasX = useSpring(rawX, { stiffness: 150, damping: 30 });
  const canvasY = useSpring(rawY, { stiffness: 150, damping: 30 });
  
  // Loading Progress Value for Animation
  const animatedProgress = useSpring(progress, { stiffness: 40, damping: 20 });
  const progressVelocity = useVelocity(animatedProgress);
  
  // Sky to Space Mapping
  const elevatorY = useTransform(animatedProgress, [0, 100], ['-66.6%', '0%']);
  const motionBlur = useTransform(progressVelocity, [-100, 0, 100], ['blur(8px)', 'blur(0px)', 'blur(8px)']);
  const spaceOpacity = useTransform(animatedProgress, [50, 100], [0, 1]);

  const [isDragging, setIsDragging] = useState(false);
  const dragOrigin = useRef({ x: 0, y: 0, canvasX: 0, canvasY: 0 });

  // Center canvas on load
  useEffect(() => {
    if (contentWidth > 0) {
      rawX.set(-(contentWidth / 2) + (windowSize.width / 2));
      rawY.set(-(contentHeight / 2) + (windowSize.height / 2));
    }
  }, [contentWidth, contentHeight, windowSize]);

  // Final loading trigger
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setIsFullyLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Global Interaction Listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);

      if (isDragging) {
        const dx = e.clientX - dragOrigin.current.x;
        const dy = e.clientY - dragOrigin.current.y;
        const minX = -(contentWidth - windowSize.width + 200);
        const minY = -(contentHeight - windowSize.height + 200);
        rawX.set(Math.min(Math.max(dragOrigin.current.canvasX + dx, minX), 200));
        rawY.set(Math.min(Math.max(dragOrigin.current.canvasY + dy, minY), 200));
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 1 && Math.abs(e.deltaY) < 1) return;
      e.preventDefault();
      const minX = -(contentWidth - windowSize.width + 200);
      const minY = -(contentHeight - windowSize.height + 200);
      rawX.set(Math.min(Math.max(rawX.get() - e.deltaX * 1.5, minX), 200));
      rawY.set(Math.min(Math.max(rawY.get() - e.deltaY * 1.5, minY), 200));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging, contentWidth, contentHeight, windowSize]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#090D20] select-none cursor-none">
      
      {/* Updated Home Button Link: Bigger and Stylized */}
      <Link 
        to="/#about" 
        className="fixed top-8 right-8 z-[250] font-instrument italic text-4xl px-10 py-4 text-[#FBFAF8] bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
      >
        Home
      </Link>

      {/* Reactive Custom Cursor */}
      <motion.div 
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[300] hidden md:block"
      >
        <div className="w-6 h-6 rounded-full bg-white opacity-10" />
      </motion.div>

      {/* LOADING OVERLAY: SPACE ELEVATOR */}
      <AnimatePresence>
        {!isFullyLoaded && (
          <motion.div 
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] overflow-hidden bg-[#090D20]"
          >
            <motion.div 
              style={{ y: elevatorY, filter: motionBlur }}
              className="absolute inset-0 h-[300%] w-full"
            >
              <div className="h-full w-full bg-gradient-to-t from-[#42B3F0] via-[#1a3a6b] to-[#090D20]" />
              
              <div className="absolute bottom-0 left-0 w-full h-[33.3%] pointer-events-none overflow-hidden opacity-60">
                <svg viewBox="0 0 1000 400" className="absolute bottom-[-50px] w-full h-auto preserve-3d">
                   <filter id="cloud-blur"><feGaussianBlur stdDeviation="40" /></filter>
                   <g filter="url(#cloud-blur)">
                      <ellipse cx="200" cy="350" rx="400" ry="150" fill="white" fillOpacity="0.4" />
                      <ellipse cx="800" cy="380" rx="500" ry="180" fill="white" fillOpacity="0.3" />
                      <ellipse cx="500" cy="400" rx="600" ry="120" fill="white" fillOpacity="0.5" />
                   </g>
                </svg>
              </div>

              <motion.div style={{ opacity: spaceOpacity }} className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse" />
                <div className="absolute top-[15%] left-[80%] w-0.5 h-0.5 bg-white rounded-full" />
                <div className="absolute top-[5%] left-[50%] w-1 h-1 bg-white rounded-full animate-pulse [animation-delay:1s]" />
              </motion.div>
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative text-center">
                <motion.div
                   className="font-instrument italic text-[#FBFAF8] leading-none"
                   style={{ fontSize: 'clamp(80px, 15vw, 240px)' }}
                >
                  {Math.round(progress)}%
                </motion.div>
                <div className="mt-4 overflow-hidden h-[1px] w-32 mx-auto bg-white/20 relative">
                  <motion.div 
                    style={{ width: `${progress}%` }}
                    className="absolute inset-0 bg-white"
                  />
                </div>
                <div className="mt-8 text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">
                  Ascending Archive
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INFINITE CANVAS MOOD BOARD */}
      <motion.div 
        style={{ x: canvasX, y: canvasY, width: contentWidth, height: contentHeight }}
        className="absolute top-0 left-0"
        onMouseDown={(e: any) => {
          if (e.button !== 0) return;
          setIsDragging(true);
          dragOrigin.current = { x: e.clientX, y: e.clientY, canvasX: rawX.get(), canvasY: rawY.get() };
        }}
      >
        {galleryItems.map((item) => (
          <div 
            key={item.id} 
            className="absolute"
            style={{ left: `${item.x}px`, top: `${item.y}px`, width: `${item.width}px` }}
          >
            <GalleryPlate 
              item={item} 
              isCanvasDragging={isDragging} 
              onLoad={() => setLoadedCount(prev => prev + 1)}
            />
          </div>
        ))}
      </motion.div>

      <div className="fixed bottom-12 left-12 pointer-events-none z-50 mix-blend-difference">
        <span className="text-[10px] uppercase tracking-[0.6em] text-white/50 font-black">My design inspirations</span>
      </div>

      <style>{`
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

const GalleryPlate: React.FC<{ item: any; isCanvasDragging: boolean; onLoad: () => void }> = ({ item, isCanvasDragging, onLoad }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "400px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      className="perspective-2000 relative group"
      onClick={(e: any) => {
        if (isCanvasDragging) return;
        e.stopPropagation();
        setIsFlipped(!isFlipped);
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative preserve-3d w-full"
      >
        <div className="backface-hidden w-full relative">
          <div className={`w-full bg-white/5 transition-all duration-700 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] ${item.aspectRatio}`}>
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              draggable="false"
              onLoad={onLoad}
              onError={onLoad} 
              className="w-full h-full object-cover select-none bg-charcoal/20"
            />
          </div>
        </div>

        <div 
          className="absolute inset-0 backface-hidden bg-[#FBFAF8] flex flex-col justify-between p-6 md:p-8 text-charcoal shadow-2xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg md:text-xl leading-tight border-b border-charcoal/10 pb-4">{item.title}</h3>
            <p className="text-charcoal/50 text-[10px] leading-relaxed font-sans uppercase tracking-wider line-clamp-4">{item.description}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag: string) => (
              <span key={tag} className="text-[7px] uppercase tracking-[0.2em] text-moss font-bold border border-moss/10 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoodBoardPage;
