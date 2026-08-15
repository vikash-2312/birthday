// ============================================================
// 🔐 SECRET PASSWORD — Hidden area
// ============================================================

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import birthdayConfig from '../data/birthdayConfig';

export default function SecretPassword() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | wrong | unlocked
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === birthdayConfig.secretPassword) {
      setStatus('unlocked');
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#ff3d7f', '#c77dff', '#ffd700', '#fff'],
      });
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('idle'), 2000);
      setInput('');
    }
  };

  return (
    <section className="relative py-16 px-4" style={{ background: 'linear-gradient(180deg, #0a0010, #1a001a, #0a0010)' }}>
      <motion.div
        className="max-w-sm mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="glass-pink rounded-3xl p-8" style={{ border: '1px solid rgba(199,125,255,0.3)' }}>
          <AnimatePresence mode="wait">
            {status !== 'unlocked' ? (
              <motion.div key="locked" exit={{ opacity: 0, scale: 0.8 }}>
                <span className="text-5xl block mb-4">🔒</span>
                <h3 className="font-playfair text-2xl font-bold text-gradient-pink mb-2">
                  SECRET AREA
                </h3>
                <p className="font-dancing text-white/60 mb-6">
                  What's the birthday girl's age?
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Enter the secret number..."
                    className="w-full px-4 py-3 rounded-xl text-center font-inter text-white text-lg"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: status === 'wrong'
                        ? '2px solid rgba(255,50,50,0.6)'
                        : '2px solid rgba(199,125,255,0.4)',
                      outline: 'none',
                    }}
                    autoComplete="off"
                  />

                  <AnimatePresence>
                    {status === 'wrong' && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-dancing text-red-400 text-sm"
                      >
                        (Hint: How old are you turning today?)
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    className="btn-pink py-3 rounded-xl text-white font-bold"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Unlock 🔓
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                <motion.span
                  className="text-6xl block mb-4"
                  animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: 3 }}
                >
                  🎉
                </motion.span>
                <h3 className="font-playfair text-2xl font-bold mb-3"
                  style={{ background: 'linear-gradient(135deg, #ffd700, #ff3d7f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  YOU UNLOCKED A SECRET!
                </h3>
                <p className="font-dancing text-lg text-pink-300 leading-relaxed">
                  The real secret? You are one of the most special people in the world. 
                  And everyone who knows you is SO lucky. 💗👑✨
                </p>
                <p className="font-dancing text-white/50 text-sm mt-4">
                  Happy 10th Birthday! 🎂
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
