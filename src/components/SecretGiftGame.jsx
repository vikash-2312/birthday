// ============================================================
// 🎁 SECRET GIFT GAME — Pick the Right Box
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import birthdayConfig from '../data/birthdayConfig';

const GAME_GIFTS = [
  { id: 0, emoji: '🎁', color: 'linear-gradient(135deg, #ff3d7f, #c9184a)', accent: '#ffd700' },
  { id: 1, emoji: '🎀', color: 'linear-gradient(135deg, #c77dff, #7b2d8b)', accent: '#ff85a1' },
  { id: 2, emoji: '✨', color: 'linear-gradient(135deg, #ffd700, #ff8c00)', accent: '#c77dff' },
];

export default function SecretGiftGame() {
  const [selected, setSelected] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);
  const [shaking, setShaking] = useState(null);

  const correct = birthdayConfig.correctGiftIndex;

  const handleSelect = (id) => {
    if (won) return;
    setSelected(id);
    setAttempts(a => a + 1);

    if (id === correct) {
      setWon(true);
      // MEGA celebration
      const fire = (origin) => confetti({
        particleCount: 200,
        spread: 120,
        origin,
        colors: ['#ff3d7f', '#c77dff', '#ffd700', '#ff85a1', '#fff'],
        startVelocity: 50,
      });
      fire({ x: 0.5, y: 0.4 });
      setTimeout(() => fire({ x: 0.2, y: 0.5 }), 300);
      setTimeout(() => fire({ x: 0.8, y: 0.5 }), 600);
      setTimeout(() => fire({ x: 0.5, y: 0.6 }), 900);
    } else {
      setShaking(id);
      setTimeout(() => {
        setShaking(null);
        setSelected(null);
      }, 1000);
    }
  };

  const reset = () => {
    setSelected(null);
    setAttempts(0);
    setWon(false);
    setShaking(null);
  };

  return (
    <section className="relative py-20 px-4" style={{ background: 'linear-gradient(180deg, #0a0010, #200040, #0a0010)' }}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(28px, 8vw, 48px)',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ff3d7f, #c77dff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 16,
        }}>
          🔮 Secret Gift Game
        </h2>
        <p className="font-dancing text-xl text-white/70">
          One of these holds a special secret... can you find it?
        </p>
        {attempts > 0 && !won && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-inter text-sm text-white/50 mt-2"
          >
            Attempt {attempts} — keep trying! 🕵️‍♀️
          </motion.p>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!won ? (
          <motion.div
            key="game"
            className="flex items-end justify-center gap-4 md:gap-16 flex-wrap"
          >
            {GAME_GIFTS.map((gift, i) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{
                  opacity: 1, y: 0,
                  x: shaking === gift.id ? [0, -10, 10, -8, 8, -5, 5, 0] : 0,
                }}
                transition={{
                  opacity: { delay: i * 0.15 },
                  x: shaking === gift.id ? { duration: 0.6 } : {},
                }}
                whileHover={{ scale: 1.1, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(gift.id)}
                className="cursor-pointer flex flex-col items-center"
              >
                {/* Box */}
                <div style={{
                  width: 100 - i * 5, height: 100 - i * 5,
                  background: gift.color,
                  borderRadius: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 40,
                  boxShadow: selected === gift.id && shaking === gift.id
                    ? '0 0 30px rgba(255,0,0,0.5)'
                    : `0 10px 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.1)`,
                  border: `3px solid ${gift.accent}44`,
                  transition: 'box-shadow 0.3s',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {/* Ribbon cross */}
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 10, background: `${gift.accent}66`, transform: 'translateX(-50%)' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 10, background: `${gift.accent}66`, transform: 'translateY(-50%)' }} />
                  <span style={{ position: 'relative', zIndex: 1 }}>{gift.emoji}</span>
                </div>

                <p className="font-dancing text-white/60 mt-2 text-sm">Gift {i + 1}</p>

                {/* Wrong indicator */}
                <AnimatePresence>
                  {shaking === gift.id && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-inter text-red-400 text-xs mt-1"
                    >
                      Oops! 😭
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="won"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-center"
          >
            <motion.div
              className="text-8xl mb-6 inline-block"
              animate={{ rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: 3 }}
            >
              🎉
            </motion.div>
            <motion.h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(28px, 8vw, 60px)',
                fontWeight: 'bold',
                marginBottom: 16,
                background: 'linear-gradient(135deg, #ffd700, #ff3d7f, #c77dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              YOU FOUND THE SECRET!
            </motion.h3>
            <motion.p
              className="font-dancing text-2xl md:text-3xl text-pink-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              10 YEARS OF BEING AWESOME! 👑💗
            </motion.p>
            <motion.button
              className="glass-pink px-6 py-3 rounded-full text-white/70 font-inter text-sm"
              onClick={reset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Play Again ✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
