// ============================================================
// 🎮 MINI GAME — Catch the Hearts
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function MiniGame() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [won, setWon] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const counterRef = useRef(0);
  const intervalRef = useRef(null);
  const idRef = useRef(0);
  const GOAL = 9;

  const spawnHeart = useCallback(() => {
    const id = ++idRef.current;
    setHearts(prev => [...prev, {
      id,
      x: Math.random() * 85 + 5,
      size: Math.random() * 24 + 20,
      duration: Math.random() * 2 + 2,
      delay: 0,
      color: ['#ff3d7f', '#c77dff', '#ff85a1', '#ffd700'][Math.floor(Math.random() * 4)],
    }]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 4000);
  }, []);

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setWon(false);
    setHearts([]);
    counterRef.current = 0;
    intervalRef.current = setInterval(spawnHeart, 800);
  };

  const catchHeart = (id) => {
    setHearts(prev => prev.filter(h => h.id !== id));
    const newScore = counterRef.current + 1;
    counterRef.current = newScore;
    setScore(newScore);

    if (newScore >= GOAL) {
      clearInterval(intervalRef.current);
      setPlaying(false);
      setWon(true);
      setHearts([]);
      confetti({
        particleCount: 250,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#ff3d7f', '#c77dff', '#ffd700', '#ff85a1', '#fff'],
      });
      setTimeout(() => setShowUnlock(true), 1500);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setPlaying(false);
    setScore(0);
    setWon(false);
    setHearts([]);
    setShowUnlock(false);
    counterRef.current = 0;
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <section className="relative py-20 px-4" style={{ background: 'linear-gradient(180deg, #0a0010, #1a001a, #0a0010)' }}>
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gradient-pink mb-3">
          Catch 9 Hearts!
        </h2>
        <p className="font-dancing text-xl text-white/60">
          Tap 9 hearts to unlock a surprise! 💗
        </p>
      </motion.div>

      {/* Score */}
      <div className="text-center mb-6">
        <motion.div
          className="inline-block glass-pink px-6 py-3 rounded-full"
          animate={score > 0 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.2 }}
          key={score}
        >
          <span className="font-playfair text-2xl font-bold text-gradient-pink">
            ❤️ Score: {score} / 10
          </span>
        </motion.div>
      </div>

      {/* Game area */}
      <div
        className="relative mx-auto rounded-3xl overflow-hidden"
        style={{
          width: '100%', maxWidth: 500,
          height: 350,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,133,161,0.2)',
          boxShadow: '0 0 40px rgba(255,61,127,0.1)',
        }}
      >
        {/* Floating hearts */}
        <AnimatePresence>
          {hearts.map(h => (
            <motion.button
              key={h.id}
              style={{
                position: 'absolute',
                left: `${h.x}%`,
                bottom: '-10%',
                fontSize: h.size,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: h.color,
                lineHeight: 1,
                userSelect: 'none',
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -400, opacity: [0, 1, 1, 0] }}
              exit={{ scale: [1, 2, 0], opacity: 0 }}
              transition={{ duration: h.duration + 0.8, ease: 'easeOut' }}
              onClick={() => catchHeart(h.id)}
              onTouchStart={(e) => { e.preventDefault(); catchHeart(h.id); }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0 }}
            >
              💗
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Start / overlay */}
        {!playing && !won && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              className="btn-pink px-8 py-4 text-white font-bold text-lg rounded-full"
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              💗 Start Game!
            </motion.button>
          </div>
        )}

        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <motion.span className="text-5xl" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity }}>🎉</motion.span>
            <p className="font-playfair text-2xl font-bold text-gradient-pink text-center px-4">YOU DID IT!</p>
          </div>
        )}
      </div>

      {/* Caught hearts fix */}
      {playing && <div className="sr-only" aria-live="polite">Score: {score}</div>}

      {/* Proper catch handler */}
      {/* Hearts are rendered above */}

      {/* Score tracking */}
      <AnimatePresence>
        {showUnlock && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
            className="mt-8 text-center glass-pink rounded-3xl p-6 max-w-md mx-auto"
            style={{ border: '1px solid rgba(255,61,127,0.3)' }}
          >
            <span className="text-4xl block mb-3">🔓</span>
            <h3 className="font-playfair text-2xl font-bold text-gradient-pink mb-2">
              Secret Unlocked!
            </h3>
            <p className="font-dancing text-lg text-white/80">
              You have a heart full of love and a spirit full of joy. That's your greatest gift! 💗
            </p>
            <motion.button
              className="mt-4 glass px-5 py-2 rounded-full text-white/60 text-sm font-inter"
              onClick={reset}
              whileHover={{ scale: 1.05 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


