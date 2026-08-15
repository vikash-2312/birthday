// ============================================================
// 💗 MEMORY CARDS — 10 3D Flip Cards (FIXED for mobile)
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { memoryCardMessages } from '../data/messages';

function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false);

  const cardColors = [
    'linear-gradient(135deg, #ff3d7f, #c9184a)',
    'linear-gradient(135deg, #c77dff, #7b2d8b)',
    'linear-gradient(135deg, #ff85a1, #ff3d7f)',
    'linear-gradient(135deg, #e0aaff, #c77dff)',
    'linear-gradient(135deg, #ffd700, #ff8c00)',
    'linear-gradient(135deg, #ff3d7f, #ff85a1)',
    'linear-gradient(135deg, #7b2d8b, #c77dff)',
    'linear-gradient(135deg, #c9184a, #ff3d7f)',
    'linear-gradient(135deg, #c77dff, #ff85a1)',
    'linear-gradient(135deg, #ffd700, #ff3d7f)',
  ];

  const toggle = (e) => {
    e.preventDefault();
    setFlipped(f => !f);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={toggle}
      onTouchEnd={toggle}
      style={{
        height: 180,
        cursor: 'pointer',
        perspective: '1000px',
        WebkitPerspective: '1000px',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* 3D flip container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          borderRadius: 16,
        }}
      >
        {/* Front face */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            boxSizing: 'border-box',
          }}
        >
          <span style={{ fontSize: 28, marginBottom: 8 }}>✨</span>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 11,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ff3d7f, #c77dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            lineHeight: 1.4,
            margin: '0 0 6px',
          }}>
            {card.front}
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.05em',
          }}>
            tap to flip
          </p>
        </div>

        {/* Back face */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 16,
            background: cardColors[index % cardColors.length],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 14,
            boxSizing: 'border-box',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2)',
          }}
        >
          <p style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: 13,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.5,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}>
            {card.back}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoryCards() {
  return (
    <section className="relative py-16 px-4 md:px-8" style={{ background: 'linear-gradient(180deg, #0a0010, #150025, #0a0010)' }}>
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(22px, 6vw, 48px)',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ff3d7f, #c77dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 8px',
            lineHeight: 1.3,
          }}
        >
          9 Things We Love About You 💗
        </h2>
        <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: 18, color: 'rgba(255,255,255,0.6)' }}>
          Tap each card to discover something special ✨
        </p>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {memoryCardMessages.map((card, i) => (
          <FlipCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
