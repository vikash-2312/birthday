// ============================================================
// 💌 BIRTHDAY LETTER — Envelope + Paper reveal (Mobile-friendly)
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTER_LINES = [
  { text: "Dear Birthday Girl,", style: 'header' },
  { text: "", style: 'gap' },
  { text: "Today you turn 9! 🎂", style: 'normal' },
  { text: "", style: 'gap' },
  { text: "Nine years of smiles,", style: 'cursive' },
  { text: "nine years of laughter,", style: 'cursive' },
  { text: "nine years of beautiful memories.", style: 'cursive' },
  { text: "", style: 'gap' },
  { text: "You are growing into such a wonderful person.", style: 'normal' },
  { text: "", style: 'gap' },
  { text: "Never stop dreaming.", style: 'cursive' },
  { text: "Never stop laughing.", style: 'cursive' },
  { text: "Never stop being yourself.", style: 'cursive' },
  { text: "", style: 'gap' },
  { text: "You deserve all the happiness in the world.", style: 'normal' },
  { text: "", style: 'gap' },
  { text: "Happy 9th Birthday! 💗", style: 'header' },
  { text: "", style: 'gap' },
  { text: "Keep shining. ✨", style: 'cursive' },
];

export default function BirthdayLetter() {
  const [stage, setStage] = useState('closed'); // closed → open

  const handleClick = () => {
    if (stage === 'closed') setStage('open');
    else setStage('closed');
  };

  return (
    <section style={{ padding: '60px 16px', background: 'linear-gradient(180deg, #0a0010, #120020, #0a0010)' }}>
      <motion.div
        style={{ textAlign: 'center', marginBottom: 32 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(24px, 7vw, 48px)',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ff3d7f, #c77dff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 8px',
        }}>
          💌 A Special Letter
        </h2>
        <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: 18, color: 'rgba(255,255,255,0.6)' }}>
          Something written just for you...
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Envelope */}
        <motion.div
          style={{
            width: '100%',
            maxWidth: 340,
            height: 200,
            position: 'relative',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={handleClick}
          whileHover={stage === 'closed' ? { y: -6 } : {}}
          whileTap={{ scale: 0.98 }}
        >
          {/* Body */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
            borderRadius: 12,
            boxShadow: '0 15px 50px rgba(255,61,127,0.25), 0 0 0 1px rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            {/* Bottom triangle */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
              background: 'linear-gradient(135deg, rgba(199,125,255,0.35), rgba(255,133,161,0.35))',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '60%', background: 'rgba(255,255,255,0.07)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '60%', background: 'rgba(0,0,0,0.07)', clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />

            {stage === 'closed' && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: 36 }}>💌</span>
                <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>
                  Tap to open
                </p>
              </div>
            )}
          </div>

          {/* Flap */}
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '55%',
              background: 'linear-gradient(135deg, #ff3d7f, #ff85a1)',
              transformOrigin: 'top center',
              borderRadius: '12px 12px 0 0',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              zIndex: 5,
            }}
            animate={stage === 'open' ? { rotateX: -180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          />
        </motion.div>

        {/* Letter paper */}
        <AnimatePresence>
          {stage === 'open' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                width: '100%',
                maxWidth: 320,
                overflow: 'hidden',
                marginTop: -8,
                zIndex: 1,
                position: 'relative',
              }}
            >
              <div style={{
                background: 'linear-gradient(180deg, #fffef8 0%, #fff5f8 100%)',
                borderRadius: '0 0 12px 12px',
                padding: '20px 18px 24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                position: 'relative',
              }}>
                {/* Paper lines */}
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    top: 36 + i * 26, left: 12, right: 12,
                    height: 1, background: 'rgba(255,133,161,0.12)',
                  }} />
                ))}

                {LETTER_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.3 }}
                    style={{
                      fontFamily: line.style === 'header' ? 'Playfair Display, serif'
                        : line.style === 'cursive' ? 'Dancing Script, cursive'
                        : 'Inter, sans-serif',
                      fontSize: line.style === 'header' ? 15
                        : line.style === 'gap' ? 0
                        : 13,
                      fontWeight: line.style === 'header' ? 'bold' : 'normal',
                      color: line.style === 'gap' ? 'transparent'
                        : line.style === 'header' ? '#c9184a'
                        : '#4a0050',
                      lineHeight: line.style === 'gap' ? '0.6' : '1.6',
                      margin: 0,
                      marginBottom: line.style === 'gap' ? 4 : 2,
                      position: 'relative', zIndex: 1,
                    }}
                  >
                    {line.text || '\u00A0'}
                  </motion.p>
                ))}

                <motion.button
                  onClick={handleClick}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  style={{
                    marginTop: 16,
                    background: 'none',
                    border: '1px solid rgba(199,0,100,0.3)',
                    borderRadius: 20,
                    padding: '6px 14px',
                    fontFamily: 'Dancing Script, cursive',
                    fontSize: 13,
                    color: '#c9184a',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '16px auto 0',
                  }}
                >
                  Close letter ✕
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
