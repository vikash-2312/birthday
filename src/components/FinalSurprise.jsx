// ============================================================
// 🎬 FINAL SURPRISE — Cinematic emotional ending
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { finalMessages } from '../data/messages';
import { Candle } from './CandleAnimation';

const FINAL_DELAY = 1800; // ms between messages

function FireworkBurst({ x, y, color }) {
  return (
    <motion.div
      style={{
        position: 'fixed', left: `${x}%`, top: `${y}%`,
        width: 8, height: 8,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        zIndex: 999,
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 12, opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
  );
}

export default function FinalSurprise({ onReplay }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [showMsg, setShowMsg] = useState(false);
  const [finished, setFinished] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [candlesRelit, setCandlesRelit] = useState(false);
  const [started, setStarted] = useState(false);

  const launchFireworks = () => {
    // Canvas confetti fireworks
    const colors = ['#ff3d7f', '#c77dff', '#ffd700', '#ff85a1', '#fff'];
    const fire = (opts) => confetti({ ...opts, colors });

    fire({ particleCount: 200, spread: 150, origin: { x: 0.5, y: 0.3 }, startVelocity: 60 });
    setTimeout(() => fire({ particleCount: 150, spread: 100, origin: { x: 0.2, y: 0.5 } }), 300);
    setTimeout(() => fire({ particleCount: 150, spread: 100, origin: { x: 0.8, y: 0.5 } }), 600);
    setTimeout(() => fire({ particleCount: 200, spread: 120, origin: { x: 0.5, y: 0.5 } }), 900);
    setTimeout(() => fire({ particleCount: 100, spread: 60, angle: 60, origin: { x: 0, y: 0.8 } }), 1200);
    setTimeout(() => fire({ particleCount: 100, spread: 60, angle: 120, origin: { x: 1, y: 0.8 } }), 1200);

    // Add burst visuals
    setFireworks([
      { id: 1, x: 30, y: 30, color: '#ff3d7f' },
      { id: 2, x: 70, y: 25, color: '#c77dff' },
      { id: 3, x: 50, y: 50, color: '#ffd700' },
    ]);
    setTimeout(() => setFireworks([]), 1500);
    setCandlesRelit(true);
  };

  const startSequence = () => {
    setStarted(true);
    setShowMsg(true);
  };

  useEffect(() => {
    if (!started) return;
    if (msgIndex >= finalMessages.length) {
      setFinished(true);
      launchFireworks();
      return;
    }

    const timer = setTimeout(() => {
      setShowMsg(false);
      setTimeout(() => {
        setMsgIndex(i => i + 1);
        setShowMsg(true);
      }, 600);
    }, FINAL_DELAY);

    return () => clearTimeout(timer);
  }, [msgIndex, started]);

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0010 0%, #05000d 100%)' }}
    >
      {/* Firework visuals */}
      {fireworks.map(f => (
        <FireworkBurst key={f.id} x={f.x} y={f.y} color={f.color} />
      ))}

      {/* Background glow when finished */}
      {finished && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(199,125,255,0.15) 0%, transparent 70%)',
          }}
        />
      )}

      {!started ? (
        // Entry trigger
        <motion.div
          className="flex flex-col items-center justify-center min-h-[80vh] text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="font-inter text-white/40 text-sm tracking-widest uppercase mb-6"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓ The final surprise awaits ↓
          </motion.p>
          <motion.button
            onClick={startSequence}
            className="btn-glass text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                '0 0 30px rgba(199,125,255,0.2)',
                '0 0 60px rgba(255,61,127,0.5)',
                '0 0 30px rgba(199,125,255,0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>✨ One Last Thing...</span>
          </motion.button>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Sequential messages */}
          {!finished && (
            <AnimatePresence mode="wait">
              {showMsg && msgIndex < finalMessages.length && (
                <motion.div
                  key={msgIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="max-w-xl mx-auto"
                >
                  <p
                    className="font-playfair font-bold text-center"
                    style={{
                      fontSize: msgIndex >= 5 ? 'clamp(28px, 8vw, 60px)' : 'clamp(22px, 5vw, 40px)',
                      background: msgIndex >= 5
                        ? 'linear-gradient(135deg, #ffd700, #ff3d7f, #c77dff)'
                        : 'linear-gradient(135deg, #ffd6e7, #c77dff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.2,
                    }}
                  >
                    {finalMessages[msgIndex]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Grand finale */}
          <AnimatePresence>
            {finished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
                className="text-center"
              >
                {/* Relit candles */}
                {candlesRelit && (
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 10 }, (_, i) => (
                      <Candle key={i} index={i} blown={false} />
                    ))}
                  </div>
                )}

                <motion.h2
                  className="font-playfair font-black mb-6"
                  style={{
                    fontSize: 'clamp(32px, 10vw, 80px)',
                    background: 'linear-gradient(135deg, #ffd700, #ff3d7f, #c77dff, #ffd700)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 30px rgba(255,133,161,0.5))',
                  }}
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  🎀 END OF SURPRISE 🎀
                </motion.h2>

                <motion.p
                  className="font-dancing text-2xl text-pink-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  We love you more than words can say 💗
                </motion.p>

                <motion.button
                  onClick={onReplay}
                  className="btn-pink px-8 py-4 text-white font-bold text-lg rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  9 Years of Magic ✨
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
