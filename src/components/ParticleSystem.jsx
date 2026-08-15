// ============================================================
// 🎈 PARTICLE SYSTEM — Global living particles
// ============================================================

import { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

export default function ParticleSystem({ active = true, intense = false }) {
  const canvasRef = useRef(null);
  const isMobile = useIsMobile();
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const COUNT = isMobile ? (intense ? 40 : 20) : (intense ? 100 : 50);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const TYPES = ['star', 'heart', 'spark', 'dot'];

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.3 - 0.2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        color: [
          'rgba(255,133,161,',
          'rgba(199,125,255,',
          'rgba(255,61,127,',
          'rgba(255,215,0,',
          'rgba(255,255,255,',
        ][Math.floor(Math.random() * 5)],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      };
    }

    particlesRef.current = Array.from({ length: COUNT }, createParticle);

    const drawHeart = (ctx, x, y, size, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 10, size / 10);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5, -5, -10, 3, 0, 10);
      ctx.bezierCurveTo(10, 3, 5, -5, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (ctx, x, y, size, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const r = i % 2 === 0 ? size : size * 0.4;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.phase += p.speed;
        p.x += p.vx + Math.sin(p.phase) * 0.3;
        p.y += p.vy;
        p.opacity += p.opacityDir * 0.005;
        if (p.opacity > 0.7) p.opacityDir = -1;
        if (p.opacity < 0.05) p.opacityDir = 1;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        const col = `${p.color}${p.opacity.toFixed(2)})`;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size * 3, col);
        } else if (p.type === 'star') {
          drawStar(ctx, p.x, p.y, p.size * 2, col);
        } else if (p.type === 'spark') {
          ctx.save();
          ctx.shadowBlur = 8;
          ctx.shadowColor = col;
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    if (active) animate();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active, intense, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
