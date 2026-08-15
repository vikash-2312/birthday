// ============================================================
// 🌸 FLOATING FLOWERS — Elegant petal rain
// ============================================================

import { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const PETALS = ['🌸', '🌺', '🌹', '💮', '✿'];

export default function FloatingFlowers() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const COUNT = isMobile ? 6 : 14;

    const petals = Array.from({ length: COUNT }, (_, i) => {
      const el = document.createElement('div');
      const petal = PETALS[Math.floor(Math.random() * PETALS.length)];
      el.textContent = petal;
      el.style.cssText = `
        position: fixed;
        top: -60px;
        left: ${Math.random() * 100}vw;
        font-size: ${12 + Math.random() * 14}px;
        opacity: ${0.2 + Math.random() * 0.4};
        animation: petalFall ${8 + Math.random() * 10}s ${Math.random() * 6}s linear infinite;
        pointer-events: none;
        z-index: 5;
        will-change: transform;
      `;
      container.appendChild(el);
      return el;
    });

    return () => petals.forEach(p => p.remove());
  }, [isMobile]);

  return <div ref={containerRef} aria-hidden="true" />;
}
