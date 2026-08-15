// ============================================================
// 📸 MEMORY WALL — 3D Floating Photo Gallery
// ============================================================

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import photos from '../data/photos';
import PhotoViewer from './PhotoViewer';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useIsMobile } from '../hooks/useIsMobile';

function PhotoCard({ photo, index, onOpen, mouseX, mouseY, isMobile }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: (e.clientY - cy) / rect.height * 20,
      y: -(e.clientX - cx) / rect.width * 20,
    });
  };

  const row = Math.floor(index / 3);
  const floatDelay = index * 0.1;
  const floatDuration = 3 + (index % 4) * 0.5;

  const PLACEHOLDER_COLORS = [
    'linear-gradient(135deg, #ff85a1, #c77dff)',
    'linear-gradient(135deg, #c77dff, #7b2d8b)',
    'linear-gradient(135deg, #ff3d7f, #ff85a1)',
    'linear-gradient(135deg, #ffd6e7, #ff85a1)',
    'linear-gradient(135deg, #e0aaff, #c77dff)',
  ];

  return (
    <motion.div
      ref={cardRef}
      className="cursor-pointer"
      style={{
        perspective: '1000px',
        width: '100%',
      }}
      initial={{ opacity: 0, y: 40 + row * 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      animate={{ y: [0, -8, 0] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={() => onOpen(photo)}
    >
      <motion.div
        className="relative overflow-hidden"
        style={{
          borderRadius: 16,
          transformStyle: 'preserve-3d',
          background: photo.src ? 'transparent' : PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length],
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
        animate={isMobile ? {} : {
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 30px 80px rgba(255,61,127,0.3), 0 0 0 1px rgba(255,133,161,0.3)' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, duration: floatDuration }}
      >
        {/* Glass frame */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
          pointerEvents: 'none', borderRadius: 16,
        }} />

        {/* Photo or placeholder */}
        <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.caption}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length],
              padding: 16,
            }}>
              <span style={{ fontSize: 40, marginBottom: 8 }}>📸</span>
              <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                {photo.caption}
              </p>
            </div>
          )}
        </div>

        {/* Caption overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          padding: '24px 12px 12px',
          transform: 'translateZ(10px)',
        }}>
          <p style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 13, color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
          }}>
            {photo.caption}
          </p>
        </div>

        {/* Hover shine */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, borderRadius: 16, zIndex: 5,
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function MemoryWall() {
  const [viewerPhoto, setViewerPhoto] = useState(null);
  const [viewerIndex, setViewerIndex] = useState(0);
  const mouse = useMouseParallax();
  const isMobile = useIsMobile();

  const openPhoto = (photo) => {
    const idx = photos.findIndex(p => p.id === photo.id);
    setViewerIndex(idx);
    setViewerPhoto(photo);
  };

  const prevPhoto = () => {
    const newIdx = (viewerIndex - 1 + photos.length) % photos.length;
    setViewerIndex(newIdx);
    setViewerPhoto(photos[newIdx]);
  };

  const nextPhoto = () => {
    const newIdx = (viewerIndex + 1) % photos.length;
    setViewerIndex(newIdx);
    setViewerPhoto(photos[newIdx]);
  };

  return (
    <section className="relative py-20 px-4 md:px-8" style={{ background: 'linear-gradient(180deg, #0a0010, #150020, #0a0010)' }}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gradient-pink mb-4">
          📸 Memory Wall
        </h2>
        <p className="font-dancing text-xl text-white/60">
          10 years of beautiful moments ✨
        </p>
      </motion.div>

      <div
        className="grid gap-4 md:gap-6 max-w-6xl mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
      >
        {photos.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={i}
            onOpen={openPhoto}
            mouseX={mouse.x}
            mouseY={mouse.y}
            isMobile={isMobile}
          />
        ))}
      </div>

      {viewerPhoto && (
        <PhotoViewer
          photo={viewerPhoto}
          onClose={() => setViewerPhoto(null)}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}
