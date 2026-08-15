// ============================================================
// 🌌 DREAM UNIVERSE — Magical full-screen universe
// ============================================================

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useIsMobile } from '../hooks/useIsMobile';

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 0.5,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 3,
}));

const PLANETS = [
  { size: 60, color: 'radial-gradient(circle at 35% 35%, #ff85a1, #ff3d7f)', x: 15, y: 20, duration: 20 },
  { size: 40, color: 'radial-gradient(circle at 35% 35%, #e0aaff, #c77dff)', x: 80, y: 15, duration: 25 },
  { size: 25, color: 'radial-gradient(circle at 35% 35%, #ffd6e7, #ff85a1)', x: 70, y: 70, duration: 18 },
  { size: 15, color: 'radial-gradient(circle at 35% 35%, #ffd700, #ff8c00)', x: 20, y: 75, duration: 30 },
];

const SHOOTING_STARS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  startX: Math.random() * 50,
  startY: Math.random() * 30,
  delay: i * 4 + Math.random() * 3,
}));

export default function DreamUniverse() {
  const mouse = useMouseParallax();
  const isMobile = useIsMobile();
  const parallax = isMobile ? { x: 0, y: 0 } : mouse;

  return (
    <section
      className="relative overflow-hidden py-24 px-4"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #3d0066 0%, #1a0030 40%, #0a0010 100%)',
      }}
    >
      {/* Stars */}
      {STARS.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: 'white',
            translateX: parallax.x * (s.size * 3),
            translateY: parallax.y * (s.size * 2),
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Shooting stars */}
      {SHOOTING_STARS.map(ss => (
        <motion.div
          key={ss.id}
          style={{
            position: 'absolute',
            left: `${ss.startX}%`,
            top: `${ss.startY}%`,
            width: 80, height: 2,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)',
            borderRadius: 2,
          }}
          animate={{
            x: [0, 200],
            y: [0, 200],
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: ss.delay,
            repeat: Infinity,
            repeatDelay: ss.delay + 3,
            ease: 'easeIn',
          }}
        />
      ))}

      {/* Glowing planets */}
      {PLANETS.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${p.size}px ${p.color.split(',')[1]?.split(')')[0] || 'rgba(255,133,161,0.4)'}44`,
            translateX: parallax.x * (i * 5 + 5),
            translateY: parallax.y * (i * 3 + 3),
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: p.duration / 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Floating hearts */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`heart-${i}`}
          style={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            top: `${60 + (i % 3) * 10}%`,
            fontSize: 12 + i * 2,
            opacity: 0.3,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        >
          💗
        </motion.div>
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[80vh]">
        <motion.p
          className="font-inter text-white/50 text-lg md:text-xl mb-4 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Your Little Universe
        </motion.p>

        {/* Glowing "10" */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
        >
          {/* Glow rings */}
          {[300, 220, 160].map((size, ri) => (
            <motion.div
              key={ri}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                width: size, height: size,
                borderRadius: '50%',
                border: `1px solid rgba(255,61,127,${0.15 - ri * 0.04})`,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3 + ri, repeat: Infinity, ease: 'easeInOut', delay: ri * 0.5 }}
            />
          ))}

          <motion.h1
            className="font-playfair font-black"
            style={{
              fontSize: 'clamp(100px, 25vw, 200px)',
              background: 'linear-gradient(135deg, #ffd700, #ff3d7f, #c77dff, #ffd700)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              position: 'relative', zIndex: 1,
              filter: 'drop-shadow(0 0 40px rgba(255,61,127,0.5))',
            }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            9
          </motion.h1>
        </motion.div>

        <motion.p
          className="font-dancing text-3xl md:text-4xl mt-4 mb-8"
          style={{ color: '#ffd6e7' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          animate={{ textShadow: ['0 0 20px rgba(255,133,161,0.5)', '0 0 40px rgba(255,133,161,0.9)', '0 0 20px rgba(255,133,161,0.5)'] }}
        >
          9 Years of Magic ✨
        </motion.p>

        <motion.p
          className="font-inter text-white/40 max-w-md text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Every star up there is a memory you've created. And there are so many more to come.
        </motion.p>
      </div>
    </section>
  );
}
