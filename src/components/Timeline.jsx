// ============================================================
// 📅 TIMELINE — 10-Year Journey (Mobile Responsive)
// ============================================================

import { motion } from 'framer-motion';
import { timelineItems } from '../data/messages';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Timeline() {
  const isMobile = useIsMobile();

  return (
    <section className="relative py-16 px-4 md:px-8" style={{ background: 'linear-gradient(180deg, #0a0010, #150030, #0a0010)' }}>
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
          marginBottom: 12,
        }}>
          ✨ 9 Years of Magic
        </h2>
        <p className="font-dancing text-xl text-white/60">
          Every year a new chapter 💗
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto relative" style={{ paddingLeft: isMobile ? 32 : 0 }}>
        {/* Main timeline line */}
        <div style={{
          position: 'absolute',
          left: isMobile ? 12 : '50%',
          top: 0, bottom: 0,
          width: 2,
          background: 'linear-gradient(to bottom, transparent, #ff3d7f, #c77dff, #ffd700, transparent)',
          transform: isMobile ? 'none' : 'translateX(-50%)',
        }} />

        {timelineItems.map((item, i) => {
          const isLeft = !isMobile && i % 2 === 0;
          return (
            <motion.div
              key={item.year}
              className="relative flex items-center mb-8"
              style={{
                flexDirection: isMobile ? 'row' : (isLeft ? 'row' : 'row-reverse'),
                width: '100%',
              }}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              {/* Card */}
              <div style={{
                width: isMobile ? '100%' : 'calc(50% - 30px)',
              }}>
                <motion.div
                  className="glass-pink rounded-2xl p-4"
                  style={{
                    border: `1px solid rgba(${item.year === 9 ? '255,215,0' : '255,133,161'},0.3)`,
                    boxShadow: item.year === 9 ? '0 0 30px rgba(255,215,0,0.2)' : 'none',
                  }}
                  whileHover={{ scale: 1.03, y: -3 }}
                >
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span style={{ fontSize: 24 }}>{item.emoji}</span>
                    <span className="font-playfair font-bold text-gradient-pink text-sm md:text-base">
                      {item.label}
                    </span>
                    {item.year === 9 && (
                      <span className="font-inter text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(255,215,0,0.2)', color: '#ffd700' }}>
                        TODAY!
                      </span>
                    )}
                  </div>
                  <p className="font-dancing text-white/70 text-sm md:text-base">{item.desc}</p>
                </motion.div>
              </div>

              {/* Center dot */}
              <div style={{
                position: 'absolute',
                left: isMobile ? -20 : '50%',
                transform: isMobile ? 'none' : 'translateX(-50%)',
                width: 16, height: 16,
                borderRadius: '50%',
                background: item.year === 9
                  ? 'linear-gradient(135deg, #ffd700, #ff3d7f)'
                  : 'linear-gradient(135deg, #ff3d7f, #c77dff)',
                boxShadow: item.year === 9
                  ? '0 0 20px rgba(255,215,0,0.8)'
                  : '0 0 10px rgba(255,61,127,0.5)',
                zIndex: 1,
              }} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
