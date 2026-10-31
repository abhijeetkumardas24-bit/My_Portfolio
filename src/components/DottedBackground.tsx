import { useEffect, useRef } from 'react';

/**
 * DottedBackground Component
 * Full-page subtle dotted-grid background with ambient pulse animation
 * and optional mouse-following radial highlight.
 */
const DottedBackground = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number | null = null;
    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateMouseGlow);
      }
    };

    const updateMouseGlow = () => {
      // Smooth lerp follow for elegant trail
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.setProperty('--mouse-x', `${currentX}px`);
        glowRef.current.style.setProperty('--mouse-y', `${currentY}px`);
      }

      if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
        rafId = requestAnimationFrame(updateMouseGlow);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Full-page Dotted Grid Pattern with Ambient Pulse */}
      <div className="absolute inset-0 dotted-grid-bg animate-dots-ambient" />

      {/* Subtle Mouse-Following Glow Layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), var(--dot-active-light, rgba(59, 111, 217, 0.25)), transparent 75%)`,
          maskImage: `radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)`,
        }}
      />
    </div>
  );
};

export default DottedBackground;
