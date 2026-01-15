
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion as motionComponent, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import { MOOD_BOARD } from '../constants';
import OptimizedImage from '../components/UI/OptimizedImage';

const motion = motionComponent as any;

// Constants for the denser infinite canvas
const CANVAS_SIZE = 10000; 
const COLUMNS = 18; // More columns for a wider spread
const COLUMN_WIDTH = 320; // Smaller "preview" size
const GAP = 80; // Tighter gaps for a more cohesive "cosmos" look
const ITEM_COUNT = 120; // Increased count to fill blank spots

// Helper to generate a dense, non-overlapping masonry grid
const generateMasonryItems = () => {
  const items: any[] = [];
  const colHeights = new Array(COLUMNS).fill(CANVAS_SIZE * 0.05);

  for (let i = 0; i < ITEM_COUNT; i++) {
    const baseItem = MOOD_BOARD[i % MOOD_BOARD.length];
    const colIndex = i % COLUMNS;
    const isPortrait = Math.random() > 0.4;
    
    const width = COLUMN_WIDTH;
    const height = isPortrait ? width * 1.4 : width * 0.8;
    
    // Position with a slight random horizontal offset to feel "scattered" but aligned
    const x = colIndex * (COLUMN_WIDTH + GAP) + (Math.random() * 40 - 20) + (CANVAS_SIZE - (COLUMNS * (COLUMN_WIDTH + GAP))) / 2;
    const y = colHeights[colIndex];

    // Append width parameter to Unsplash URL for high-performance previews
    const previewUrl = `${baseItem.imageUrl.split('?')[0]}?q=80&w=600`;

    items.push({
      ...baseItem,
      imageUrl: previewUrl,
      id: `gallery-item-${i}`,
      x,
      y,
      width,
      height,
      aspectRatio: isPortrait ? 'aspect-[2/3]' : 'aspect-[3/2]'
    });

    colHeights[colIndex] += height + GAP + (Math.random() * 60); 
  }
  return items;
};

const MoodBoardPage: React.FC = () => {
  const galleryItems = useMemo(() => generateMasonryItems(), []);

  // Raw coordinates
  const rawX = useMotionValue(-CANVAS_SIZE / 2 + window.innerWidth / 2);
  const rawY = useMotionValue(-CANVAS_SIZE / 2 + window.innerHeight / 2);
  
  // Spring-based inertia for smoothness and acceleration
  const canvasX = useSpring(rawX, { stiffness: 120, damping: 24, restDelta: 0.1 });
  const canvasY = useSpring(rawY, { stiffness: 120, damping: 24, restDelta: 0.1 });
  
  const [isDragging, setIsDragging] = useState(false);
  const dragOrigin = useRef({ x: 0, y: 0, canvasX: 0, canvasY: 0 });

  // Custom Cursor Physics
  const cursorX = useSpring(0, { stiffness: 1000, damping: 60 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 60 });
  
  // React to movement speed for cursor scaling
  const xVelocity = useVelocity(canvasX);
  const yVelocity = useVelocity(canvasY);
  const totalVelocity = useTransform([xVelocity, yVelocity], ([vx, vy]: number[]) => {
    return Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
  });
  const cursorScale = useTransform(totalVelocity, [0, 2000], [1, 0.7]);
  const cursorOpacity = useTransform(totalVelocity, [0, 2000], [0.1, 0.4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);

      if (isDragging) {
        const dx = e.clientX - dragOrigin.current.x;
        const dy = e.clientY - dragOrigin.current.y;
        rawX.set(dragOrigin.current.canvasX + dx);
        rawY.set(dragOrigin.current.canvasY + dy);
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    // Wheel/Scroll handling for all directions
    const handleWheel = (e: WheelEvent) => {
      // Prevents browser back/forward on trackpads
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
      
      // Update target positions (raw motion values)
      rawX.set(rawX.get() - e.deltaX);
      rawY.set(rawY.get() - e.deltaY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragOrigin.current = {
      x: e.clientX,
      y: e.clientY,
      canvasX: rawX.get(),
      canvasY: rawY.get()
    };
  };

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-background select-none cursor-none"
      onMouseDown={onMouseDown}
    >
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0 overflow-hidden">
        <div className="absolute inset-0 animate-mesh-drift">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] rounded-full bg-moss blur-[200px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] rounded-full bg-moss blur-[200px]" />
          <div className="absolute top-[30%] right-[15%] w-[60%] h-[60%] rounded-full bg-charcoal blur-[220px]" />
        </div>
      </div>

      {/* Dynamic Custom Cursor */}
      <motion.div 
        style={{ x: cursorX, y: cursorY, scale: cursorScale, opacity: cursorOpacity }}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[100] hidden md:block"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="#000000" />
        </svg>
      </motion.div>

      {/* Infinite Canvas Container */}
      <motion.div 
        style={{ x: canvasX, y: canvasY, width: CANVAS_SIZE, height: CANVAS_SIZE }}
        className="absolute top-0 left-0 pointer-events-auto"
      >
        {galleryItems.map((item, index) => (
          <div 
            key={item.id} 
            className="absolute"
            style={{ 
              left: `${item.x}px`, 
              top: `${item.y}px`,
              width: `${item.width}px`
            }}
          >
            <GalleryPlate item={item} index={index} />
          </div>
        ))}
      </motion.div>

      {/* Info Overlay */}
      <div className="fixed bottom-12 left-12 pointer-events-none z-50">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/20 font-bold">Inspiration Archive</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-charcoal/10 font-medium italic">Drag or Scroll to Move</span>
        </div>
      </div>

      <style>{`
        @keyframes mesh-drift {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(2%, 3%) scale(1.05) rotate(0.5deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        .animate-mesh-drift {
          animation: mesh-drift 45s ease-in-out infinite;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .perspective-2000 {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

const GalleryPlate: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "600px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.08, 
        zIndex: 50,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="perspective-2000 relative group"
      onClick={(e) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative preserve-3d w-full cursor-none"
      >
        {/* FRONT */}
        <div className="backface-hidden w-full relative">
          <div className={`w-full bg-white transition-all duration-700 group-hover:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.15)] ${item.aspectRatio}`}>
            <OptimizedImage 
              src={item.imageUrl} 
              alt={item.title} 
              aspectRatio="aspect-auto" 
              className="w-full h-full object-cover rounded-none" 
            />
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 backface-hidden bg-charcoal flex flex-col justify-between p-8 text-white shadow-2xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-2xl leading-tight border-b border-white/10 pb-6">{item.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed font-sans line-clamp-4">{item.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-6">
            {item.tags.map((tag: string) => (
              <span key={tag} className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-bold border border-white/10 px-3 py-1.5">
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
