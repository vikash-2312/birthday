// ============================================================
// 🕯️ CANDLE ANIMATION — Living CSS Flames
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLICKER_VARIANTS = ['flicker1', 'flicker2', 'flicker3'];

export function Candle({ index, blown, blowDelay = 0, relit = false }) {
  const variant = FLICKER_VARIANTS[index % 3];
  const speedFactor = 0.6 + Math.random() * 0.8;
  const isBlown = blown && !relit;

  const candleColors = [
    '#ff85a1', '#c77dff', '#ff3d7f', '#e0aaff', '#ffd6e7',
    '#ff85a1', '#c77dff', '#ff3d7f', '#e0aaff', '#ffd6e7',
  ];
  const color = candleColors[index % candleColors.length];

  return (
    <div className="flex flex-col items-center" style={{ width: 14 }}>
      {/* Smoke */}
      <AnimatePresence>
        {isBlown && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.6, 0.3, 0], y: -60, x: [0, 4, -3, 2], scaleX: [1, 1.5, 2] }}
            transition={{ duration: 2.5, ease: 'easeOut', delay: 0.1 }}
            style={{
              width: 4, height: 40,
              background: 'linear-gradient(to top, rgba(200,200,200,0.6), transparent)',
              borderRadius: '50%',
              filter: 'blur(3px)',
              marginBottom: -40,
            }}
          />
        )}
      </AnimatePresence>

      {/* Flame */}
      <AnimatePresence>
        {!isBlown && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: blowDelay }}
            style={{ position: 'relative', width: 10, height: 18 }}
          >
            {/* Outer glow */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: -4, left: '50%', transform: 'translateX(-50%)',
                width: 20, height: 20,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,165,0,0.5) 0%, transparent 70%)',
                filter: 'blur(4px)',
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: speedFactor * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Core flame layers */}
            {[
              { w: 8, h: 16, gradient: 'linear-gradient(to top, #ff6b00, #ffa500, #ffed00, rgba(255,255,200,0.9))', blur: 0 },
              { w: 5, h: 12, gradient: 'linear-gradient(to top, #ff4500, #ff8c00, #fffacd)', blur: 1 },
              { w: 3, h: 8, gradient: 'linear-gradient(to top, #fff, #fffacd)', blur: 0.5 },
            ].map((layer, li) => (
              <motion.div
                key={li}
                style={{
                  position: 'absolute',
                  bottom: 2, left: '50%', transform: 'translateX(-50%)',
                  width: layer.w, height: layer.h,
                  background: layer.gradient,
                  borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
                  filter: `blur(${layer.blur}px)`,
                }}
                animate={{
                  scaleX: [1, 0.85, 1.15, 0.9, 1],
                  scaleY: [1, 1.15, 0.9, 1.05, 1],
                  rotate: [-2, 3, -3, 2, -1],
                  opacity: [1, 0.95, 1, 0.92, 1],
                }}
                transition={{
                  duration: speedFactor * (0.3 + li * 0.1),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: li * 0.05,
                }}
              />
            ))}

            {/* Glow halo */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: -6, left: '50%', transform: 'translateX(-50%)',
                width: 28, height: 28,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,200,0,0.3) 0%, rgba(255,100,0,0.1) 50%, transparent 70%)',
                filter: 'blur(6px)',
              }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: speedFactor * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candle stick */}
      <div style={{
        width: 8, height: 32,
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        borderRadius: '3px 3px 2px 2px',
        boxShadow: `0 0 8px ${color}66`,
        position: 'relative',
      }}>
        {/* Wax drips */}
        <div style={{
          position: 'absolute', top: 2, left: 1,
          width: 2, height: 8,
          background: `${color}aa`,
          borderRadius: '0 0 3px 3px',
        }} />
        {/* Wick */}
        <div style={{
          position: 'absolute', top: -4, left: '50%',
          transform: 'translateX(-50%)',
          width: 1.5, height: 6,
          background: '#333',
          borderRadius: '2px',
        }} />
      </div>
    </div>
  );
}

export default Candle;
