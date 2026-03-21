
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion as motionComponent, AnimatePresence } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { MOOD_BOARD } from '../constants';
import type { MoodBoardItem } from '../types';

const { Link } = ReactRouterDOM as any;
const motion = motionComponent as any;

/* ─────────────────────────────────────────────
 * Individual Pane
 * Lies flat on XZ, faces upward — orthographic camera looks down.
 * Border mesh sits just below to act as a frame.
 * ───────────────────────────────────────────── */
interface PaneProps {
  item: MoodBoardItem;
  angle: number;
  radius: number;
  isSelected: boolean;
  onSelect: () => void;
}

const Pane: React.FC<PaneProps> = ({ item, angle, radius, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  // drei's useTexture handles crossOrigin automatically
  const texture = useTexture(item.imageUrl);

  const paneW = 3.0;
  const paneH = 2.2;

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const tangent = angle + Math.PI / 2;

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  const scale = isSelected ? 1.12 : hovered ? 1.06 : 1;
  const borderColor = isSelected ? '#3F6D0D' : hovered ? '#FBFAF8' : '#2A2A2A';

  return (
    <group position={[x, 0, z]} rotation={[0, -tangent, 0]}>
      {/* Border/frame (sits below the image) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} scale={scale}>
        <planeGeometry args={[paneW + 0.18, paneH + 0.18]} />
        <meshBasicMaterial color={borderColor} toneMapped={false} />
      </mesh>

      {/* Image pane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <planeGeometry args={[paneW, paneH]} />
        <meshBasicMaterial map={texture} side={THREE.FrontSide} toneMapped={false} />
      </mesh>

      {/* Glow on selection */}
      {isSelected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} scale={scale}>
          <planeGeometry args={[paneW + 0.5, paneH + 0.5]} />
          <meshBasicMaterial color="#3F6D0D" transparent opacity={0.12} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
};

/* ─────────────────────────────────────────────
 * Rotating Ring
 * ───────────────────────────────────────────── */
interface RingProps {
  speed: number;
  selectedId: string | null;
  onSelectItem: (item: MoodBoardItem | null) => void;
}

const RotatingRing: React.FC<RingProps> = ({ speed, selectedId, onSelectItem }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const items = MOOD_BOARD;
  const count = items.length;

  // Dynamic radius — enough spacing so panes don't overlap
  const radius = Math.max(4.5, count * 1.8);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <Pane
            key={item.id}
            item={item}
            angle={angle}
            radius={radius}
            isSelected={selectedId === item.id}
            onSelect={() => onSelectItem(selectedId === item.id ? null : item)}
          />
        );
      })}

      {/* Ring guide */}
      <mesh rotation={[0, 0, 0]} position={[0, -0.04, 0]}>
        <torusGeometry args={[radius, 0.025, 8, 128]} />
        <meshBasicMaterial color="#3F6D0D" transparent opacity={0.06} toneMapped={false} />
      </mesh>

      {/* Center dot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial color="#3F6D0D" transparent opacity={0.15} toneMapped={false} />
      </mesh>
    </group>
  );
};

/* ─────────────────────────────────────────────
 * Camera — resize-aware orthographic, looking straight down
 * ───────────────────────────────────────────── */
const TopDownCamera: React.FC = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    const aspect = size.width / size.height;
    const frustum = 8; // how many world-units visible vertically
    cam.left = -frustum * aspect;
    cam.right = frustum * aspect;
    cam.top = frustum;
    cam.bottom = -frustum;
    cam.near = 0.1;
    cam.far = 200;
    cam.position.set(0, 50, 0);
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

/* ─────────────────────────────────────────────
 * Page
 * ───────────────────────────────────────────── */
const MoodBoardV2Page: React.FC = () => {
  const [speed, setSpeed] = useState(0.15);
  const [selectedItem, setSelectedItem] = useState<MoodBoardItem | null>(null);

  const handleSelectItem = useCallback((item: MoodBoardItem | null) => {
    setSelectedItem(item);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0A0A0A] select-none">

      {/* ──── TOP BAR ──── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 pointer-events-none">
        {/* Slider */}
        <div className="flex items-center gap-5 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-semibold">
            Rotation
          </span>
          <div className="relative w-48 group">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="mood-slider w-full h-[2px] appearance-none bg-white/10 rounded-full outline-none cursor-pointer relative z-10"
            />
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-[#3F6D0D] to-[#6BBF2A] rounded-full pointer-events-none -translate-y-1/2"
              style={{ width: `${speed * 100}%` }}
            />
          </div>
          <span className="text-[10px] tabular-nums text-white/30 font-mono w-10 text-right">
            {speed.toFixed(2)}
          </span>
        </div>

        {/* Home */}
        <Link
          to="/#about"
          className="pointer-events-auto font-instrument italic text-2xl px-8 py-3 text-[#FBFAF8] bg-white/5 border border-white/10 rounded-full backdrop-blur-xl hover:bg-white/15 hover:border-white/30 transition-all duration-500 shadow-2xl active:scale-95"
        >
          Home
        </Link>
      </div>

      {/* ──── CANVAS ──── */}
      <Canvas
        orthographic
        camera={{ position: [0, 50, 0], zoom: 1, near: 0.1, far: 200 }}
        style={{ width: '100%', height: '100%' }}
        onPointerMissed={() => setSelectedItem(null)}
      >
        <TopDownCamera />
        <ambientLight intensity={1.5} />
        <React.Suspense fallback={null}>
          <RotatingRing
            speed={speed}
            selectedId={selectedItem?.id ?? null}
            onSelectItem={handleSelectItem}
          />
        </React.Suspense>
      </Canvas>

      {/* ──── DETAIL PANEL ──── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="detail-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed top-0 right-0 w-full md:w-[33.33vw] h-full z-40 bg-[#111111]/95 backdrop-blur-2xl border-l border-white/5 overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex flex-col h-full">
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="px-8 pb-12 pt-6 flex flex-col gap-6 flex-1">
                <h2 className="font-serif text-3xl md:text-4xl text-[#FBFAF8] leading-tight">
                  {selectedItem.title}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span key={tag} className="text-[9px] uppercase tracking-[0.25em] text-[#3F6D0D] font-bold border border-[#3F6D0D]/20 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="w-12 h-[1px] bg-white/10" />

                <p className="text-white/50 text-sm leading-relaxed font-sans">
                  {selectedItem.description}
                </p>

                {selectedItem.link && (
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-between group text-xs uppercase tracking-widest text-white/40 hover:text-[#3F6D0D] transition-colors pt-6 border-t border-white/5"
                  >
                    <span>Visit Source</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom hint */}
      <div className="fixed bottom-8 left-8 pointer-events-none z-30">
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/25 font-semibold">
          Click a pane to explore
        </span>
      </div>

      {/* Slider styles */}
      <style>{`
        .mood-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #FBFAF8;
          box-shadow: 0 0 12px rgba(255,255,255,0.15), 0 0 4px rgba(63,109,13,0.4);
          cursor: pointer;
          position: relative;
          z-index: 10;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .mood-slider::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          box-shadow: 0 0 20px rgba(255,255,255,0.25), 0 0 8px rgba(63,109,13,0.6);
        }
        .mood-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #FBFAF8;
          border: none;
          box-shadow: 0 0 12px rgba(255,255,255,0.15);
          cursor: pointer;
        }
        .mood-slider::-webkit-slider-runnable-track { background: transparent; }
        .mood-slider::-moz-range-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default MoodBoardV2Page;
