// ============================================================
// 🎬 BIRTHDAY INTRO — Cinematic Opening
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
  type: Math.random() > 0.5 ? 'star' : 'dot',
}));

const BOKEH = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 80 + 40,
  opacity: Math.random() * 0.12 + 0.04,
  duration: Math.random() * 6 + 6,
}));

const BALLOONS = [
  { color: '#ff85a1', x: 10, delay: 0 },
  { color: '#c77dff', x: 25, delay: 0.5 },
  { color: '#ff3d7f', x: 75, delay: 1 },
  { color: '#e0aaff', x: 88, delay: 1.5 },
  { color: '#ffd6e7', x: 50, delay: 0.8 },
];

export default function BirthdayIntro({ onEnter }) {
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState(0); // 0=loading, 1=text1, 2=text2, 3=text3, 4=button, 5=entering
  const [enterClicked, setEnterClicked] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2800),
      setTimeout(() => setPhase(3), 4800),
      setTimeout(() => setPhase(4), 6200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setEnterClicked(true);
    setPhase(5);
    setTimeout(onEnter, 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #2d0050 0%, #1a0020 40%, #0a0010 100%)' }}
      animate={enterClicked ? { scale: 1.1, opacity: 0, filter: 'blur(20px) brightness(3)' } : {}}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Bokeh background */}
      {BOKEH.map(b => (
        <motion.div
          key={b.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${b.x}%`, top: `${b.y}%`,
            width: b.size, height: b.size,
            background: `radial-gradient(circle, rgba(199,125,255,${b.opacity * 2}) 0%, rgba(255,61,127,${b.opacity}) 50%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Nine years of magic... */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.type === 'star'
              ? 'radial-gradient(circle, #fff 0%, rgba(255,133,161,0.8) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(199,125,255,0.8) 0%, transparent 70%)',
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Floating balloons */}
      {BALLOONS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${b.x}%`, bottom: '-10%' }}
          animate={{ y: [0, -window.innerHeight * 1.2] }}
          transition={{ duration: 12 + i * 2, delay: b.delay + 2, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{
            width: isMobile ? 30 : 45, height: isMobile ? 38 : 56,
            background: `radial-gradient(ellipse at 35% 35%, ${b.color}ff, ${b.color}99)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: `0 0 15px ${b.color}44, inset 0 0 10px rgba(255,255,255,0.2)`,
          }} />
          <div style={{
            width: 1, height: isMobile ? 40 : 60,
            background: `${b.color}88`,
            margin: '0 auto',
          }} />
        </motion.div>
      ))}

      {/* Volumetric light */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 60%, rgba(199,125,255,0.08) 0%, transparent 70%)',
      }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.p
              key="t1"
              className="font-inter text-2xl md:text-4xl text-white/80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              Hey... 👀
            </motion.p>
          )}
          {phase === 2 && (
            <motion.p
              key="t2"
              className="font-inter text-xl md:text-3xl text-white/80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              Someone made something <span style={{ color: '#ff85a1' }}>special</span> for you...
            </motion.p>
          )}
          {phase === 3 && (
            <motion.p
              key="t3"
              className="font-playfair text-3xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              style={{ textShadow: '0 0 30px rgba(199,125,255,0.8)' }}
            >
              Are you ready? ✨
            </motion.p>
          )}
        </AnimatePresence>

        {/* Enter Button */}
        <AnimatePresence>
          {phase >= 4 && !enterClicked && (
            <motion.div
              key="btn"
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
            >
              <motion.p
                className="font-playfair text-3xl md:text-5xl font-bold mb-12"
                style={{ textShadow: '0 0 30px rgba(199,125,255,0.8)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Are you ready? ✨
              </motion.p>
              <motion.button
                className="relative overflow-hidden font-inter font-bold text-lg md:text-2xl text-white px-10 md:px-16 py-5 md:py-7 rounded-full cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(30px)',
                  border: '2px solid rgba(199,125,255,0.5)',
                }}
                onClick={handleEnter}
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(199,125,255,0.6), 0 0 120px rgba(255,61,127,0.3)' }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(199,125,255,0.3)',
                    '0 0 60px rgba(255,61,127,0.5)',
                    '0 0 30px rgba(199,125,255,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Glass shimmer */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-100% center', '200% center'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">✨ ENTER THE SURPRISE</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entering animation */}
        <AnimatePresence>
          {enterClicked && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-4 h-4 rounded-full"
                style={{ background: 'white' }}
                animate={{ scale: [1, 80], opacity: [1, 0] }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
