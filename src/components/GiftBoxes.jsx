// ============================================================
// 🎁 GIFT BOXES — Interactive 3D Gifts
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const GIFTS = [
  {
    id: 1,
    boxColor: 'linear-gradient(135deg, #ff3d7f, #ff85a1)',
    lidColor: 'linear-gradient(135deg, #c9184a, #ff3d7f)',
    ribbonColor: '#ffd700',
    emoji: '🎁',
    label: 'For You!',
    size: 'large',
    isSpecial: false,
    reveal: '10 years of pure sunshine! ☀️',
  },
  {
    id: 2,
    boxColor: 'linear-gradient(135deg, #c77dff, #7b2d8b)',
    lidColor: 'linear-gradient(135deg, #7b2d8b, #3d0066)',
    ribbonColor: '#ff85a1',
    emoji: '🎀',
    label: 'Open Me!',
    size: 'medium',
    isSpecial: true,
    reveal: 'THIS ONE IS FOR YOU 💗',
  },
  {
    id: 3,
    boxColor: 'linear-gradient(135deg, #ffd700, #ffb700)',
    lidColor: 'linear-gradient(135deg, #ffb700, #ff8c00)',
    ribbonColor: '#c77dff',
    emoji: '✨',
    label: 'Secret?',
    size: 'small',
    isSpecial: false,
    reveal: 'The real gift is YOU! 💕',
  },
];

function GiftBox({ gift, onClick, opened }) {
  const sizes = { large: 120, medium: 100, small: 85 };
  const size = sizes[gift.size];

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      onClick={() => !opened && onClick(gift)}
      whileHover={!opened ? { y: -15 } : {}}
      animate={opened ? {} : {
        y: [0, -8, 0],
      }}
      transition={!opened ? { duration: 3 + gift.id * 0.5, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      {/* Lid */}
      <motion.div
        style={{
          width: size + 16, height: size * 0.3,
          background: gift.lidColor,
          borderRadius: '8px 8px 0 0',
          position: 'relative',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        animate={opened ? { y: -80, rotateX: -60, opacity: 0 } : { y: 0, rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Ribbon cross on lid */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 16, background: gift.ribbonColor, opacity: 0.8 }} />
        {/* Bow */}
        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0 }}>
          <div style={{ width: 18, height: 12, background: gift.ribbonColor, borderRadius: '50% 50% 0 50%', transform: 'rotate(-20deg)', opacity: 0.9 }} />
          <div style={{ width: 18, height: 12, background: gift.ribbonColor, borderRadius: '50% 50% 50% 0', transform: 'rotate(20deg)', opacity: 0.9 }} />
        </div>
      </motion.div>

      {/* Box body */}
      <motion.div
        style={{
          width: size, height: size,
          background: gift.boxColor,
          borderRadius: '0 0 12px 12px',
          position: 'relative',
          boxShadow: '0 15px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.1)',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        animate={opened ? { scale: [1, 1.2, 1], rotateZ: [0, 5, -5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Ribbon vertical */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 14, background: gift.ribbonColor, opacity: 0.7 }} />
        {/* Side 3D effect */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 14, background: 'rgba(0,0,0,0.2)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 14, background: 'rgba(0,0,0,0.15)' }} />
        {/* Shine */}
        <div style={{ position: 'absolute', top: 8, left: 8, width: '30%', height: '20%', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', filter: 'blur(4px)' }} />

        {/* Glow if special */}
        {gift.isSpecial && !opened && (
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'rgba(255,215,0,0.1)', borderRadius: '0 0 12px 12px' }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Open reveal */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(255,215,0,0.2)', backdropFilter: 'blur(10px)' }}
            >
              <motion.span
                style={{ fontSize: size * 0.4 }}
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                {gift.emoji}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Shadow */}
      <div style={{
        width: size * 0.8, height: 10,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
        filter: 'blur(5px)',
        marginTop: 4,
      }} />

      {/* Label */}
      <motion.p
        className="font-dancing text-white/70 mt-2 text-sm"
        whileHover={{ color: 'rgba(255,133,161,1)' }}
      >
        {gift.isSpecial && !opened ? '👀 ' : ''}{gift.label}
      </motion.p>

      {/* Light beam for special */}
      {gift.isSpecial && !opened && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: '100%', left: '50%', transform: 'translateX(-50%)',
            width: 2, height: 40,
            background: 'linear-gradient(to top, rgba(255,215,0,0.8), transparent)',
          }}
          animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

export default function GiftBoxes() {
  const [openedGifts, setOpenedGifts] = useState([]);
  const [revealMessage, setRevealMessage] = useState(null);

  const handleGiftClick = (gift) => {
    if (openedGifts.includes(gift.id)) return;
    setOpenedGifts(prev => [...prev, gift.id]);
    setRevealMessage(gift.reveal);

    if (gift.isSpecial) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#ff3d7f', '#c77dff', '#ffd700', '#ff85a1', '#fff'],
      });
    }

    setTimeout(() => setRevealMessage(null), 4000);
  };

  return (
    <section className="relative py-20 px-4" style={{ background: 'linear-gradient(180deg, #0a0010, #1a0020, #0a0010)' }}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gradient-pink mb-3">
          🎁 Your Gifts
        </h2>
        <p className="font-dancing text-xl text-white/60">
          👀 I wonder what's inside...
        </p>
      </motion.div>

      <div className="flex items-end justify-center gap-6 md:gap-12 flex-wrap relative">
        {GIFTS.map((gift, i) => (
          <motion.div
            key={gift.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            style={{ position: 'relative' }}
          >
            <GiftBox
              gift={gift}
              onClick={handleGiftClick}
              opened={openedGifts.includes(gift.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Reveal message */}
      <AnimatePresence>
        {revealMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="fixed inset-x-4 bottom-20 md:bottom-12 z-50 flex justify-center"
          >
            <div className="glass-pink px-8 py-5 rounded-2xl text-center max-w-sm"
              style={{ border: '1px solid rgba(255,61,127,0.4)', boxShadow: '0 0 60px rgba(255,61,127,0.3)' }}>
              <p className="font-playfair text-xl md:text-2xl font-bold text-gradient-pink">
                {revealMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
