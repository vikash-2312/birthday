// ============================================================
// 🖼️ PHOTO VIEWER — Fullscreen lightbox
// ============================================================

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhotoViewer({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-10 text-white/60 hover:text-white transition-colors"
        style={{ fontSize: 40, background: 'none', border: 'none', cursor: 'pointer' }}
      >
        ‹
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg md:max-w-2xl w-full mx-8"
      >
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(255,61,127,0.3), 0 40px 80px rgba(0,0,0,0.7)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.caption}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block', background: '#000' }}
            />
          ) : (
            <div style={{
              height: '50vh',
              background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: 32,
            }}>
              <span style={{ fontSize: 60, marginBottom: 16 }}>📸</span>
              <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: 20, color: 'white', textAlign: 'center' }}>
                {photo.caption}
              </p>
            </div>
          )}
        </div>

        {/* Caption below */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-4"
        >
          <p className="font-playfair text-lg md:text-xl text-white font-bold mb-1">
            {photo.caption}
          </p>
          <p className="font-dancing text-white/60 text-base">
            {photo.memory}
          </p>
        </motion.div>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-10 text-white/60 hover:text-white transition-colors"
        style={{ fontSize: 40, background: 'none', border: 'none', cursor: 'pointer' }}
      >
        ›
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass text-white/60 hover:text-white transition-colors flex items-center justify-center font-bold"
        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer' }}
      >
        ✕
      </button>
    </motion.div>
  );
}
