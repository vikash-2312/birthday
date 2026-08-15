// ============================================================
// 🖱️ MOUSE PARALLAX HOOK
// ============================================================

import { useState, useEffect } from 'react';

export function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,   // -1 to 1
        y: (e.clientY / window.innerHeight - 0.5) * 2,  // -1 to 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
}
