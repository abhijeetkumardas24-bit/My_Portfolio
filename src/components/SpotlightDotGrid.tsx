import { useEffect, useRef } from 'react';

interface Particle {
  ox: number; // Resting origin X
  oy: number; // Resting origin Y
  x: number;  // Current X
  y: number;  // Current Y
  vx: number; // Velocity X
  vy: number; // Velocity Y
}

// ─── Physics & Canvas Configuration ──────────────────────────────────────────
const DOT_SPACING   = 24;   // px — spacing between dots
const BASE_RADIUS   = 1.25; // px — resting dot radius
const MAX_RADIUS    = 2.3;  // px — peak illuminated dot radius
const REPEL_RADIUS  = 140;  // px — magnetic influence radius
const REPEL_FORCE   = 3.8;  // repulsive impulse strength
const SPRING        = 0.085;// spring return coefficient
const DAMPING       = 0.79; // velocity damping (viscous fluid feel)
// ─────────────────────────────────────────────────────────────────────────────

const SpotlightDotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const section = canvas.closest('section') || canvas.parentElement || document.body;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseInside = false;
    let isAnimating = false;
    let rafId: number | null = null;

    // ── Color blending for light and dark themes ─────────────────────────────
    const getColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return {
        isDark,
        passiveHex: isDark ? 'rgb(40, 49, 61)' : 'rgb(203, 213, 225)', // #28313D
        glowColor:  isDark ? 'rgba(60, 145, 246, 0.16)' : 'rgba(37, 99, 235, 0.12)', // #3C91F6
      };
    };

    const blendColor = (isDark: boolean, t: number) => {
      if (t <= 0) return isDark ? 'rgb(40, 49, 61)' : 'rgb(203, 213, 225)';
      if (isDark) {
        // Subtle border (#28313D -> 40, 49, 61) to Accent Blue (#3C91F6 -> 60, 145, 246)
        const r = Math.round(40 + 20 * t);
        const g = Math.round(49 + 96 * t);
        const b = Math.round(61 + 185 * t);
        return `rgb(${r},${g},${b})`;
      } else {
        // Light slate (#cbd5e1 -> 203, 213, 225) to royal blue (#2563eb -> 37, 99, 235)
        const r = Math.round(203 - 166 * t);
        const g = Math.round(213 - 114 * t);
        const b = Math.round(225 + 10 * t);
        return `rgb(${r},${g},${b})`;
      }
    };

    // ── Initialize Particle Matrix ───────────────────────────────────────────
    const initGrid = () => {
      const rect = section.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);

      if (width === 0 || height === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const cols = Math.ceil(width / DOT_SPACING) + 1;
      const rows = Math.ceil(height / DOT_SPACING) + 1;
      particles = new Array(cols * rows);

      let idx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * DOT_SPACING;
          const oy = r * DOT_SPACING;
          particles[idx++] = {
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
          };
        }
      }

      render();
    };

    // ── Physics & Render Frame ───────────────────────────────────────────────
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const { isDark, passiveHex, glowColor } = getColors();

      // Soft ambient radial glow under mouse cursor
      if (isMouseInside && mouseX > -5000 && !prefersReduced) {
        const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 220);
        glow.addColorStop(0, glowColor);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      let stillMoving = false;

      // Group passive resting dots to render in batch for maximum performance
      ctx.fillStyle = passiveHex;
      ctx.beginPath();

      const activeDots: { x: number; y: number; r: number; color: string }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReduced) {
          // Repulsion from mouse cursor
          if (isMouseInside && mouseX > -5000) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.hypot(dx, dy);

            if (dist < REPEL_RADIUS) {
              const proximity = 1 - dist / REPEL_RADIUS;
              const force = proximity * proximity * REPEL_FORCE;
              const angle = Math.atan2(dy, dx);
              p.vx += Math.cos(angle) * force;
              p.vy += Math.sin(angle) * force;
              stillMoving = true;
            }
          }

          // Spring physics toward origin
          const springX = (p.ox - p.x) * SPRING;
          const springY = (p.oy - p.y) * SPRING;
          p.vx = (p.vx + springX) * DAMPING;
          p.vy = (p.vy + springY) * DAMPING;
          p.x += p.vx;
          p.y += p.vy;

          if (Math.abs(p.vx) > 0.02 || Math.abs(p.vy) > 0.02 || Math.abs(p.ox - p.x) > 0.05 || Math.abs(p.oy - p.y) > 0.05) {
            stillMoving = true;
          }
        }

        // Proximity for color & scaling
        const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
        const isNear = isMouseInside && distToMouse < REPEL_RADIUS && !prefersReduced;

        if (isNear) {
          const t = Math.pow(1 - distToMouse / REPEL_RADIUS, 1.2);
          const r = BASE_RADIUS + t * (MAX_RADIUS - BASE_RADIUS);
          activeDots.push({
            x: p.x,
            y: p.y,
            r,
            color: blendColor(isDark, t),
          });
        } else {
          // Draw resting dot directly into batch path
          ctx.moveTo(p.x + BASE_RADIUS, p.y);
          ctx.arc(p.x, p.y, BASE_RADIUS, 0, Math.PI * 2);
        }
      }

      // Fill all batch resting dots
      ctx.fill();

      // Draw active illuminated & scaled dots individually
      for (let j = 0; j < activeDots.length; j++) {
        const d = activeDots[j];
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Keep animation running while interacting or settling
      if (isMouseInside || stillMoving) {
        rafId = requestAnimationFrame(render);
        isAnimating = true;
      } else {
        isAnimating = false;
        rafId = null;
      }
    };

    const wakeAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(render);
      }
    };

    // ── Mouse & Touch Event Listeners ─────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isMouseInside = true;
        wakeAnimation();
      } else {
        if (isMouseInside) {
          isMouseInside = false;
          mouseX = -9999;
          mouseY = -9999;
          wakeAnimation();
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = section.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        mouseX = touch.clientX - rect.left;
        mouseY = touch.clientY - rect.top;
        isMouseInside = true;
        wakeAnimation();
      }
    };

    const onMouseLeave = () => {
      isMouseInside = false;
      mouseX = -9999;
      mouseY = -9999;
      wakeAnimation();
    };

    // ── Window Resize Observer ───────────────────────────────────────────────
    let resizeTimer: number;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(initGrid, 120);
    });
    resizeObserver.observe(section);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove',  onTouchMove,  { passive: true });
    window.addEventListener('touchend',   onMouseLeave);
    window.addEventListener('touchcancel', onMouseLeave);
    document.addEventListener('mouseleave', onMouseLeave);

    initGrid();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onMouseLeave);
      window.removeEventListener('touchcancel', onMouseLeave);
      document.removeEventListener('mouseleave', onMouseLeave);
      resizeObserver.disconnect();
      window.clearTimeout(resizeTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
};

export default SpotlightDotGrid;
