import { useEffect, useRef } from 'react';

// Configuration Constants
const DOT_RADIUS = 1.5;
const DOT_SPACING = 20;
const HOVER_RADIUS = 130;
const LIGHT_DEFAULT_COLOR = 'rgba(17, 17, 17, 0.12)';
const LIGHT_ACTIVE_COLOR = '#3B6FD9'; // Preserved Blue hover accent
const DARK_DEFAULT_COLOR = '#28313D'; // Subtle border color
const DARK_ACTIVE_COLOR = '#3C91F6';  // Accent blue hover accent
const DECAY_RATE = 0.92;
const MAX_SCALE = 2.2;

interface Dot {
  x: number;
  y: number;
  intensity: number;
}

const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number | null = null;
    let dots: Dot[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseActive = false;

    // Media queries
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    let isDarkMode = darkModeQuery.matches || document.documentElement.classList.contains('dark');

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      isDarkMode = e.matches || document.documentElement.classList.contains('dark');
    };
    darkModeQuery.addEventListener('change', handleDarkModeChange);

    // Color helper functions
    const parseColor = (colorStr: string) => {
      if (colorStr.startsWith('#')) {
        const hex = colorStr.slice(1);
        const num = parseInt(hex, 16);
        return {
          r: (num >> 16) & 255,
          g: (num >> 8) & 255,
          b: num & 255,
          a: 1,
        };
      }
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        return {
          r: parseInt(match[1], 10),
          g: parseInt(match[2], 10),
          b: parseInt(match[3], 10),
          a: match[4] !== undefined ? parseFloat(match[4]) : 1,
        };
      }
      return { r: 0, g: 0, b: 0, a: 0.12 };
    };

    const interpolateColor = (
      c1: { r: number; g: number; b: number; a: number },
      c2: { r: number; g: number; b: number; a: number },
      t: number
    ) => {
      const r = Math.round(c1.r + (c2.r - c1.r) * t);
      const g = Math.round(c1.g + (c2.g - c1.g) * t);
      const b = Math.round(c1.b + (c2.b - c1.b) * t);
      const a = c1.a + (c2.a - c1.a) * t;
      return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
    };

    // Rebuild Dot Grid bounded to parent hero section
    const setupGrid = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const cols = Math.floor(width / DOT_SPACING) + 1;
      const rows = Math.floor(height / DOT_SPACING) + 1;
      const offsetX = (width - (cols - 1) * DOT_SPACING) / 2;
      const offsetY = (height - (rows - 1) * DOT_SPACING) / 2;

      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: offsetX + c * DOT_SPACING,
            y: offsetY + r * DOT_SPACING,
            intensity: 0,
          });
        }
      }
    };

    const drawFrame = (time: number) => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const defaultColorStr = isDarkMode ? DARK_DEFAULT_COLOR : LIGHT_DEFAULT_COLOR;
      const activeColorStr = isDarkMode ? DARK_ACTIVE_COLOR : LIGHT_ACTIVE_COLOR;
      const defaultColor = parseColor(defaultColorStr);
      const activeColor = parseColor(activeColorStr);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // 1. Mouse Interaction (Blue Hover & Scaling)
        if (!prefersReducedMotion && isMouseActive) {
          const dx = mouseX - dot.x;
          const dy = mouseY - dot.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < HOVER_RADIUS * HOVER_RADIUS) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / HOVER_RADIUS;
            const targetIntensity = Math.pow(falloff, 2);
            if (targetIntensity > dot.intensity) {
              dot.intensity = targetIntensity;
            }
          }
        }

        // 2. Trail Decay
        if (!prefersReducedMotion) {
          dot.intensity *= DECAY_RATE;
          if (dot.intensity < 0.001) {
            dot.intensity = 0;
          }
        } else {
          dot.intensity = 0;
        }

        // 3. Ambient Wave Effect
        let ambientAlpha = defaultColor.a;
        if (!prefersReducedMotion) {
          const wave = Math.sin(time * 0.0015 + dot.x * 0.01 + dot.y * 0.01);
          ambientAlpha = defaultColor.a * (0.75 + 0.25 * wave);
        }

        // 4. Interpolate Color & Radius
        const radius = DOT_RADIUS * (1 + (MAX_SCALE - 1) * dot.intensity);
        const baseColor = { ...defaultColor, a: ambientAlpha };
        const color =
          dot.intensity > 0
            ? interpolateColor(baseColor, activeColor, dot.intensity)
            : `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${baseColor.a.toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(drawFrame);
    };

    // Event Listeners for Cursor / Touch Position relative to hero parent
    const updateMousePos = (clientX: number, clientY: number) => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        mouseX = clientX - rect.left;
        mouseY = clientY - rect.top;
      } else {
        mouseX = clientX;
        mouseY = clientY;
      }
      isMouseActive = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePos(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isMouseActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    // Debounced Resize Observer
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setupGrid, 150);
    };
    window.addEventListener('resize', handleResize);

    setupGrid();
    animFrameId = requestAnimationFrame(drawFrame);

    return () => {
      darkModeQuery.removeEventListener('change', handleDarkModeChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default DotGrid;
