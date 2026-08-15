// ============================================================
// ⭐ EASTER EGGS — 5 Hidden Interactions
// ============================================================

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EGG_MESSAGES = [
  { emoji: '🤫', text: "Psst... you found me! 🤫💗", sub: "Secret birthday level unlocked!" },
  { emoji: '👑', text: "You are officially awesome! 👑", sub: "This fact has been certified ✨" },
  { emoji: '🌟', text: "A shooting star just for you! 🌟", sub: "Make a wish..." },
  { emoji: '🎮', text: "Secret birthday level unlocked! 🎮✨", sub: "You're a birthday detective!" },
  { emoji: '💗', text: "You found ALL 5 secrets! 💗", sub: "You are extraordinary!" },
];

export default function EasterEggs() {
  const [found, setFound] = useState([]);
  const [activeEgg, setActiveEgg] = useState(null);
  const clickCountRef = useRef(0);
  const holdTimerRef = useRef(null);

  const triggerEgg = useCallback((index) => {
    if (found.includes(index)) return;
    setFound(prev => [...prev, index]);
    setActiveEgg(index);
    setTimeout(() => setActiveEgg(null), 3000);
  }, [found]);

  // EGG 1: Click logo/title 5 times
  const logoClickRef = useRef(0);
  const handleLogoClick = () => {
    logoClickRef.current++;
    if (logoClickRef.current >= 5) {
      logoClickRef.current = 0;
      triggerEgg(0);
    }
  };

  // EGG 2: Double click a star
  const handleStarDoubleClick = () => triggerEgg(1);

  // EGG 3: Hold button 2s
  const handleHoldStart = () => {
    holdTimerRef.current = setTimeout(() => triggerEgg(2), 2000);
  };
  const handleHoldEnd = () => clearTimeout(holdTimerRef.current);

  // EGG 4: Konami-like — type "10"
  const keyBufferRef = useRef('');
  useEffect(() => {
    const handler = (e) => {
      keyBufferRef.current = (keyBufferRef.current + e.key).slice(-2);
      if (keyBufferRef.current === '10') {
        triggerEgg(3);
        keyBufferRef.current = '';
      }
    };
    window.addEventListener('keypress', handler);
    return () => window.removeEventListener('keypress', handler);
  }, [triggerEgg]);

  // EGG 5: Find all 4 others
  useEffect(() => {
    if (found.length === 4 && !found.includes(4)) {
      setTimeout(() => triggerEgg(4), 500);
    }
  }, [found, triggerEgg]);

  return (
    <>
      {/* Hidden interactive elements scattered */}
      {/* Star (double click) */}
      <div
        style={{
          position: 'fixed', top: '12%', left: '5%', zIndex: 50,
          cursor: 'pointer', fontSize: 20, opacity: 0.3,
          transition: 'opacity 0.3s',
        }}
        onDoubleClick={handleStarDoubleClick}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.3'}
        title="👀"
      >
        ⭐
      </div>

      {/* Hold button */}
      <div
        style={{
          position: 'fixed', top: '12%', right: '5%', zIndex: 50,
          cursor: 'pointer', fontSize: 20, opacity: 0.3,
          transition: 'opacity 0.3s',
          userSelect: 'none',
        }}
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.3'}
        title="Hold me..."
      >
        ✨
      </div>

      {/* Click 5 times sparkle */}
      <div
        style={{
          position: 'fixed', bottom: '20%', left: '3%', zIndex: 50,
          cursor: 'pointer', fontSize: 18, opacity: 0.25,
          transition: 'opacity 0.3s',
          writingMode: 'vertical-rl',
        }}
        onClick={handleLogoClick}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.25'}
        title="Click 5 times..."
      >
        💗💗💗💗💗
      </div>

      {/* Egg popup */}
      <AnimatePresence>
        {activeEgg !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="fixed bottom-24 right-6 z-[150] max-w-xs"
          >
            <div className="glass-strong rounded-2xl px-6 py-4 text-center"
              style={{ border: '1px solid rgba(199,125,255,0.4)', boxShadow: '0 0 40px rgba(199,125,255,0.3)' }}>
              <span className="text-3xl block mb-2">{EGG_MESSAGES[activeEgg]?.emoji}</span>
              <p className="font-playfair font-bold text-gradient-pink text-sm mb-1">
                {EGG_MESSAGES[activeEgg]?.text}
              </p>
              <p className="font-dancing text-white/60 text-xs">
                {EGG_MESSAGES[activeEgg]?.sub}
              </p>
              <p className="font-inter text-white/30 text-xs mt-2">
                {found.length}/5 secrets found 🔍
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint at the bottom */}
      <div className="text-center py-2">
        <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>
          🔍 5 secrets are hidden on this page... can you find them all?
          (Tip: type "1" then "0" on your keyboard!)
        </p>
      </div>
    </>
  );
}
