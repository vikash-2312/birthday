// ============================================================
// 🎂 BIRTHDAY CAKE — 3D CSS Cake with 10 Live Candles
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Candle } from './CandleAnimation';
import confetti from 'canvas-confetti';

const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i / 12) * 360,
  distance: 80 + Math.random() * 40,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 2 + 2,
  delay: Math.random() * 1.5,
}));

function CakeTier({ width, height, color, gradient, label, top = false }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width, height,
        background: gradient || `linear-gradient(135deg, ${color}, ${color}cc)`,
        borderRadius: top ? '50% 50% 10px 10px / 30% 30% 10px 10px' : '12px',
        boxShadow: `0 8px 30px ${color}55, inset 0 2px 6px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.15)`,
        border: '2px solid rgba(255,255,255,0.25)',
        overflow: 'hidden',
      }}
    >
      {/* Frosting drips */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute', top: -6,
          left: `${10 + i * 15}%`,
          width: 8 + Math.random() * 6,
          height: 12 + Math.random() * 10,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '0 0 50% 50%',
        }} />
      ))}
      {/* Cream stripes */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(255,255,255,0.06) 18px, rgba(255,255,255,0.06) 20px)',
      }} />
      {/* Sprinkles */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + i * 11}%`,
          top: `${20 + (i % 3) * 25}%`,
          width: 4, height: 8,
          background: ['#ff3d7f', '#ffd700', '#c77dff', '#00cfff', '#ff85a1'][i % 5],
          borderRadius: 2,
          transform: `rotate(${i * 35}deg)`,
        }} />
      ))}
      {label && (
        <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: 12, color: 'rgba(255,255,255,0.6)', position: 'absolute', bottom: 4 }}>
          {label}
        </span>
      )}
    </div>
  );
}

export default function BirthdayCake({ musicMode }) {
  const [blown, setBlown] = useState(false);
  const [blowing, setBlowing] = useState(false);
  const [wishSent, setWishSent] = useState(false);
  const [relit, setRelit] = useState(false);
  const [blownCount, setBlownCount] = useState(0);

  const handleBlow = () => {
    if (blown || blowing) return;
    setBlowing(true);

    // One by one blow out
    for (let i = 0; i < 10; i++) {
      setTimeout(() => setBlownCount(i + 1), i * 180 + 400);
    }

    setTimeout(() => {
      setBlown(true);
      setBlowing(false);
      setTimeout(() => {
        setWishSent(true);
        // Trigger confetti
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#ff3d7f', '#c77dff', '#ffd700', '#ff85a1', '#fff'],
          startVelocity: 40,
        });
        // Double burst
        setTimeout(() => confetti({
          particleCount: 150,
          spread: 120,
          origin: { x: 0.3, y: 0.6 },
          colors: ['#ff3d7f', '#c77dff', '#ffd700'],
        }), 300);
        setTimeout(() => confetti({
          particleCount: 150,
          spread: 120,
          origin: { x: 0.7, y: 0.6 },
          colors: ['#ff85a1', '#fff', '#c77dff'],
        }), 600);
      }, 9 * 180 + 600);
    }, 9 * 180 + 500);
  };

  const handleRelight = () => {
    setBlown(false);
    setBlowing(false);
    setWishSent(false);
    setBlownCount(0);
    setRelit(true);
    setTimeout(() => setRelit(false), 100);
  };

  return (
    <section className="relative py-12 px-4" style={{ background: 'linear-gradient(180deg, #0a0010 0%, #1a0030 50%, #0a0010 100%)' }}>
      {/* Section header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(26px, 7vw, 56px)',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ff3d7f, #c77dff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 8,
        }}>
          Make a Wish... 🎂
        </h2>
        <p style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>
          9 candles burning just for you
        </p>
      </motion.div>

      <div className="flex flex-col items-center">
        {/* Floating sparkles around cake */}
        <div className="relative" style={{ width: 280, height: 280 }}>
          {SPARKLES.map(s => (
            <motion.div
              key={s.id}
              className="absolute"
              style={{
                left: '50%', top: '50%',
                transform: `rotate(${s.angle}deg) translateX(${s.distance}px)`,
                width: s.size, height: s.size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ffd700, #ff85a1)',
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* THE CAKE */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
            {/* Candles row */}
            <div className="flex items-end gap-1 mb-1 z-10" style={{ height: 60 }}>
              {Array.from({ length: 9 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.3, type: 'spring', bounce: 0.5 }}
                >
                  <Candle
                    index={i}
                    blown={blownCount > i}
                    blowDelay={0}
                    relit={relit}
                  />
                </motion.div>
              ))}
            </div>

            {/* "10" topper */}
            <motion.div
              className="font-dancing text-white font-bold z-20 mb-1"
              style={{
                fontSize: 28,
                textShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,133,161,0.6)',
                background: 'linear-gradient(135deg, #ffd700, #ff85a1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              10
            </motion.div>

            {/* Top tier */}
            <CakeTier
              width={100} height={44}
              gradient="linear-gradient(135deg, #ff85a1, #c77dff)"
              top
            />

            {/* Decorative flowers */}
            <div className="flex gap-2 mt-1 mb-1 z-10">
              {['🌸', '🌺', '🌸', '🌺', '🌸'].map((f, i) => (
                <span key={i} style={{ fontSize: 12 }}>{f}</span>
              ))}
            </div>

            {/* Middle tier */}
            <CakeTier
              width={180} height={55}
              gradient="linear-gradient(135deg, #ff3d7f, #ff85a1)"
            />

            {/* Strawberries row */}
            <div className="flex gap-3 z-10 my-1">
              {['🍓', '🍓', '🍓', '🍓', '🍓'].map((s, i) => (
                <span key={i} style={{ fontSize: 14 }}>{s}</span>
              ))}
            </div>

            {/* Bottom tier */}
            <CakeTier
              width={240} height={65}
              gradient="linear-gradient(135deg, #c77dff, #7b2d8b)"
              label="Happy 10th Birthday! 🎀"
            />

            {/* Cake plate */}
            <div style={{
              width: 260, height: 12,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
              borderRadius: '0 0 8px 8px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            }} />

            {/* Shadow */}
            <div style={{
              width: 220, height: 20,
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
              filter: 'blur(8px)',
              marginTop: 4,
            }} />
          </div>
        </div>

        {/* Blow button */}
        <div className="mt-10 text-center">
          {!blown && !wishSent && (
            <motion.button
              className="btn-pink px-8 py-4 text-white font-bold text-lg md:text-xl"
              onClick={handleBlow}
              disabled={blowing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              animate={blowing ? { scale: [1, 1.02, 1] } : {}}
              transition={blowing ? { duration: 0.3, repeat: Infinity } : {}}
              style={{ fontSize: '1.1rem', padding: '14px 36px' }}
            >
              🕯️ {blowing ? `Blowing... ${blownCount}/10` : 'BLOW OUT THE CANDLES'}
            </motion.button>
          )}

          {/* Wish sent reveal */}
          <AnimatePresence>
            {wishSent && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-center"
              >
                <motion.h3
                  className="font-playfair text-3xl md:text-5xl font-bold mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #ffd700, #ff85a1, #c77dff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: 3 }}
                >
                  ✨ WISH SENT! ✨
                </motion.h3>
                <p className="font-dancing text-xl md:text-2xl text-pink-300 mb-6">
                  May every wish you make today come true. 💗
                </p>
                <motion.button
                  className="glass-pink px-6 py-3 rounded-full text-white/80 font-inter text-sm"
                  onClick={handleRelight}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🕯️ Relight candles
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
