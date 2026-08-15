// ============================================================
// 🎠 MEMORY CAROUSEL — 3D Rotating Photo Carousel
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import photos from '../data/photos';

const VISIBLE = photos.slice(0, 7);

export default function MemoryCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + VISIBLE.length) % VISIBLE.length);
  const next = () => setCurrent(c => (c + 1) % VISIBLE.length);

  const isMobile = useIsMobile();

  const getCardProps = (index) => {
    const diff = (index - current + VISIBLE.length) % VISIBLE.length;
    const normalDiff = diff > VISIBLE.length / 2 ? diff - VISIBLE.length : diff;

    const abs = Math.abs(normalDiff);
    if (abs > 2) return null; // hide cards far away

    const shiftAmount = isMobile ? 100 : 160;
    const x = normalDiff * shiftAmount;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.8 : 0.65;
    const rotateY = normalDiff * -25;
    const zIndex = 10 - abs;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.8 : 0.5;

    return { x, scale, rotateY, zIndex, opacity };
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0010, #1a001a, #0a0010)' }}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gradient-pink mb-3">
          🎠 Memory Carousel
        </h2>
        <p className="font-dancing text-xl text-white/60">
          Swipe through your memories →
        </p>
      </motion.div>

      {/* Carousel */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 320, perspective: '1000px' }}
      >
        {VISIBLE.map((photo, i) => {
          const props = getCardProps(i);
          if (!props) return null;
          return (
            <motion.div
              key={photo.id}
              style={{
                position: 'absolute',
                width: 200,
                height: 260,
                transformStyle: 'preserve-3d',
                cursor: props.zIndex === 10 ? 'default' : 'pointer',
              }}
              animate={{
                x: props.x,
                scale: props.scale,
                rotateY: props.rotateY,
                zIndex: props.zIndex,
                opacity: props.opacity,
              }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => {
                if (i !== current) {
                  const diff = (i - current + VISIBLE.length) % VISIBLE.length;
                  if (diff <= VISIBLE.length / 2) next();
                  else prev();
                }
              }}
            >
              <div style={{
                width: '100%', height: '100%',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: props.zIndex === 10
                  ? '0 20px 60px rgba(255,61,127,0.4), 0 0 0 2px rgba(255,133,161,0.3)'
                  : '0 10px 30px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '80%',
                    background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 40,
                  }}>
                    📸
                  </div>
                )}
                <div style={{
                  height: '20%', padding: '8px 10px',
                  background: 'rgba(20,0,30,0.95)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <p style={{
                    fontFamily: 'Dancing Script, cursive',
                    fontSize: 11, color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center',
                  }}>
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <motion.button
          onClick={prev}
          className="w-12 h-12 rounded-full glass-pink flex items-center justify-center text-white text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ border: '1px solid rgba(255,133,161,0.3)', background: 'rgba(255,61,127,0.1)', cursor: 'pointer' }}
        >
          ‹
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {VISIBLE.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? '#ff3d7f' : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer',
              }}
              animate={{ width: i === current ? 20 : 8 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          className="w-12 h-12 rounded-full glass-pink flex items-center justify-center text-white text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ border: '1px solid rgba(255,133,161,0.3)', background: 'rgba(255,61,127,0.1)', cursor: 'pointer' }}
        >
          ›
        </motion.button>
      </div>
    </section>
  );
}
