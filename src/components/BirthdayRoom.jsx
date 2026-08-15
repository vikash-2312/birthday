// ============================================================
// 🎀 BIRTHDAY HERO — Main reveal (Mobile-first, no overlapping)
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import confetti from 'canvas-confetti';

export default function BirthdayRoom() {
  const isMobile = useIsMobile();
  const [clicked10, setClicked10] = useState(0);

  const handle10Click = () => {
    const n = clicked10 + 1;
    setClicked10(n);
    if (n >= 5) {
      setClicked10(0);
      confetti({ particleCount: 150, spread: 80, origin: { x: 0.5, y: 0.4 }, colors: ['#ffd700', '#ff3d7f', '#c77dff'] });
    }
  };

  const LIGHTS = Array.from({ length: isMobile ? 12 : 24 }, (_, i) => ({
    id: i, color: ['#ffd700', '#ff85a1', '#c77dff', '#fff'][i % 4], delay: i * 0.07,
  }));

  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0010 0%, #1a0030 30%, #2d0050 60%, #1a0020 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 16px 60px',
        boxSizing: 'border-box',
      }}
    >
      {/* Fairy lights */}
      <div style={{ position: 'absolute', top: '6%', left: 0, right: 0, height: 1, background: 'rgba(255,215,0,0.15)' }} />
      {LIGHTS.map(l => (
        <motion.div key={l.id} style={{
          position: 'absolute', top: '5%',
          left: `${(l.id / LIGHTS.length) * 100}%`,
          width: 7, height: 10, borderRadius: '40% 40% 60% 60%',
          background: l.color, boxShadow: `0 0 10px ${l.color}`,
        }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5 + l.id * 0.05, repeat: Infinity, delay: l.delay }}
        />
      ))}

      {/* Corner balloons (non-overlapping) */}
      <motion.div style={{ position: 'absolute', top: '12%', left: '2%', fontSize: isMobile ? 28 : 40 }}
        animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>🎈</motion.div>
      <motion.div style={{ position: 'absolute', top: '12%', right: '2%', fontSize: isMobile ? 28 : 40 }}
        animate={{ y: [0, -10, 0], rotate: [0, -3, 3, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>🎀</motion.div>
      <motion.div style={{ position: 'absolute', bottom: '10%', left: '4%', fontSize: isMobile ? 22 : 32 }}
        animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity }}>🎊</motion.div>
      <motion.div style={{ position: 'absolute', bottom: '10%', right: '4%', fontSize: isMobile ? 22 : 32 }}
        animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>✨</motion.div>

      {/* Content — stacked vertically, no overlap */}
      <div style={{
        width: '100%',
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Today is your special day
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.4 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 900,
            fontSize: isMobile ? 'clamp(26px, 8vw, 38px)' : 'clamp(40px, 8vw, 80px)',
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #ffd700 0%, #ff85a1 40%, #c77dff 70%, #ffd700 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(255,133,161,0.4))',
            margin: 0,
            padding: '0 8px',
          }}
        >
          🎀 HAPPY 9TH BIRTHDAY 🎀
        </motion.h1>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to right, transparent, rgba(255,133,161,0.6))' }} />
          <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: isMobile ? 20 : 28, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            16 August ✨
          </p>
          <div style={{ height: 1, width: 40, background: 'linear-gradient(to left, transparent, rgba(255,133,161,0.6))' }} />
        </motion.div>

        {/* Hero photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            width: isMobile ? 160 : 200,
            height: isMobile ? 210 : 260,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 0 50px rgba(255,61,127,0.4), 0 0 0 3px rgba(199,125,255,0.3)',
            border: '1px solid rgba(255,255,255,0.15)',
            flexShrink: 0,
          }}
        >
          <img
            src="/photos/photo10.jpg"
            alt="Birthday girl"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ fontFamily: 'Dancing Script, cursive', fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 }}
        >
          Absolutely glowing 💜
        </motion.p>

        {/* Clickable "10" easter egg */}
        <motion.div
          onClick={handle10Click}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
          <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: isMobile ? 18 : 24, color: 'rgba(255,255,255,0.65)' }}>
            Today, you turn{' '}
          </span>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 900,
            fontSize: isMobile ? 28 : 42,
            background: 'linear-gradient(135deg, #ffd700, #ff85a1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            9
          </span>
          <span style={{ fontFamily: 'Dancing Script, cursive', fontSize: isMobile ? 18 : 24, color: 'rgba(255,255,255,0.65)' }}>
            {' '}years old!
          </span>
        </motion.div>

        {clicked10 > 0 && clicked10 < 5 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            {5 - clicked10} more taps... 👀
          </motion.p>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll to explore
        </p>
        <motion.div
          style={{ width: 1, height: 24, background: 'linear-gradient(to bottom, rgba(255,133,161,0.6), transparent)' }}
          animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
