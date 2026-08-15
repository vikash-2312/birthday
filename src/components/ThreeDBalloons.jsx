// ============================================================
// 🎈 3D BALLOON ROOM — Mobile-friendly balloon environment
// ============================================================

import { motion } from 'framer-motion';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useIsMobile } from '../hooks/useIsMobile';

const BALLOON_DATA = [
  { color: '#ff85a1', accent: '#ff3d7f', x: 5, size: 55, delay: 0, layer: 1 },
  { color: '#c77dff', accent: '#7b2d8b', x: 18, size: 45, delay: 0.4, layer: 2 },
  { color: '#ffd6e7', accent: '#ff85a1', x: 32, size: 65, delay: 0.8, layer: 0 },
  { color: '#ff3d7f', accent: '#c9184a', x: 48, size: 50, delay: 0.2, layer: 1 },
  { color: '#e0aaff', accent: '#c77dff', x: 62, size: 58, delay: 0.6, layer: 2 },
  { color: 'rgba(255,255,255,0.25)', accent: 'rgba(199,125,255,0.7)', x: 75, size: 42, delay: 1, layer: 0 },
  { color: '#ff85a1', accent: '#ff3d7f', x: 88, size: 52, delay: 0.3, layer: 1 },
  { color: '#ffd700', accent: '#ffb700', x: 25, size: 32, delay: 1.2, layer: 3 },
  { color: '#e0aaff', accent: '#c77dff', x: 72, size: 36, delay: 1.4, layer: 3 },
];

const MOBILE_BALLOON_DATA = [
  { color: '#ff85a1', accent: '#ff3d7f', x: 5, size: 42, delay: 0, layer: 1 },
  { color: '#c77dff', accent: '#7b2d8b', x: 25, size: 38, delay: 0.4, layer: 2 },
  { color: '#ff3d7f', accent: '#c9184a', x: 50, size: 46, delay: 0.2, layer: 1 },
  { color: '#e0aaff', accent: '#c77dff', x: 72, size: 40, delay: 0.6, layer: 2 },
  { color: '#ffd6e7', accent: '#ff85a1', x: 90, size: 36, delay: 0.8, layer: 0 },
];

function Balloon({ color, accent, x, size, delay, layer, mouseX, mouseY, isMobile }) {
  const isTransparent = color.includes('rgba');
  const parallaxStrength = isMobile ? 0 : [15, 10, 7, 3][layer] || 5;
  const floatDuration = 3 + layer * 0.5;
  const baseTop = [8, 5, 12, 16][layer % 4];

  const balloonStyle = isTransparent ? {
    background: `radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.35) 0%, ${color} 60%, transparent 100%)`,
    border: `1.5px solid rgba(255,255,255,0.35)`,
    boxShadow: `0 0 20px rgba(199,125,255,0.2)`,
  } : {
    background: `radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.45) 0%, ${color} 45%, ${accent} 100%)`,
    boxShadow: `0 ${size * 0.08}px ${size * 0.25}px ${accent}55`,
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${baseTop}%`,
        zIndex: 10 - layer,
        translateX: mouseX * parallaxStrength,
        translateY: mouseY * parallaxStrength * 0.4,
        filter: layer > 1 ? 'blur(0.5px)' : 'none',
        opacity: layer > 2 ? 0.65 : 1,
      }}
      animate={{ y: [0, -(size * 0.3), 0] }}
      transition={{ duration: floatDuration, delay, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Balloon body */}
        <div style={{
          position: 'relative',
          width: size, height: size * 1.15,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          ...balloonStyle,
        }}>
          {/* Highlight */}
          <div style={{
            position: 'absolute', top: '15%', left: '20%',
            width: '28%', height: '18%',
            background: 'rgba(255,255,255,0.55)',
            borderRadius: '50%',
            filter: 'blur(2px)',
          }} />
        </div>
        {/* Knot */}
        <div style={{
          width: 5, height: 5, background: accent, borderRadius: '50%', marginTop: -2,
        }} />
        {/* String */}
        <div style={{
          width: 1, height: size * 1.2,
          background: `${accent}66`,
        }} />
      </div>
    </motion.div>
  );
}

export default function ThreeDBalloons() {
  const mouse = useMouseParallax();
  const isMobile = useIsMobile();
  const balloons = isMobile ? MOBILE_BALLOON_DATA : BALLOON_DATA;
  const LIGHTS_COUNT = isMobile ? 12 : 20;

  return (
    <section
      style={{
        height: isMobile ? '40vh' : '55vh',
        background: 'linear-gradient(180deg, #0a0010 0%, #150025 50%, #0a0010 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(199,125,255,0.08) 0%, transparent 60%)',
      }} />

      {/* Fairy lights */}
      <div style={{ position: 'absolute', top: '8%', left: 0, right: 0, height: 1, background: 'rgba(255,215,0,0.15)' }} />
      {Array.from({ length: LIGHTS_COUNT }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', top: '7%',
            left: `${(i / LIGHTS_COUNT) * 100 + 2}%`,
            width: 6, height: 8, borderRadius: '40% 40% 60% 60%',
            background: ['#ffd700', '#ff85a1', '#c77dff', '#fff'][i % 4],
            boxShadow: `0 0 8px ${['#ffd700', '#ff85a1', '#c77dff', '#fff'][i % 4]}`,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5 + i * 0.08, repeat: Infinity, delay: i * 0.06 }}
        />
      ))}

      {balloons.map((b, i) => (
        <Balloon
          key={i}
          {...b}
          mouseX={mouse.x}
          mouseY={mouse.y}
          isMobile={isMobile}
        />
      ))}

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        textAlign: 'center', paddingBottom: 16, zIndex: 20,
      }}>
        <motion.p
          style={{ fontFamily: 'Dancing Script, cursive', fontSize: 16, color: 'rgba(255,255,255,0.4)' }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ↓ Keep scrolling ↓
        </motion.p>
      </div>
    </section>
  );
}
