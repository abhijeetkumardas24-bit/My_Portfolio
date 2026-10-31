import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface IntroPreloaderProps {
  onComplete: () => void;
  onReveal?: () => void;
}

const FULL_TEXT = 'WELCOME DEVS';

// Hand-drawn wavy circle path around the text
const HAND_DRAWN_PATH =
  'M 140 38 C 210 28, 300 24, 385 30 C 435 34, 485 45, 515 65 C 535 78, 538 98, 524 116 C 505 138, 460 152, 400 160 C 310 170, 210 166, 135 156 C 70 148, 25 132, 16 108 C 8 84, 25 58, 70 42 C 110 28, 165 30, 220 34 C 260 37, 290 42, 310 46';

// Left flowing wavy ribbon curve (matching user's reference image)
const LEFT_RIBBON_PATH =
  'M 170 -20 C 130 90, 45 150, 42 260 C 38 370, 115 450, 95 560 C 75 670, 15 740, 22 820 C 28 870, 75 895, 125 920';

// Right looping wavy ribbon curve (matching user's reference image)
const RIGHT_RIBBON_PATH =
  'M 340 210 C 230 215, 210 270, 230 325 C 255 385, 300 415, 295 490 C 285 585, 205 675, 185 755 C 165 830, 215 885, 305 920';

// Scattered starry dots matching the reference image's constellation spacing
const STAR_DOTS = [
  { top: '14%', left: '42%', size: 2, delay: 0.1, opacity: 0.75 },
  { top: '18%', left: '72%', size: 1.5, delay: 0.8, opacity: 0.45 },
  { top: '22%', left: '26%', size: 2, delay: 1.2, opacity: 0.8 },
  { top: '23%', left: '56%', size: 1.5, delay: 0.3, opacity: 0.5 },
  { top: '30%', left: '34%', size: 2.5, delay: 0.6, opacity: 0.9 },
  { top: '31%', left: '50%', size: 1.5, delay: 1.4, opacity: 0.6 },
  { top: '33%', left: '76%', size: 2, delay: 0.2, opacity: 0.7 },
  { top: '37%', left: '58%', size: 2, delay: 0.9, opacity: 0.75 },
  { top: '40%', left: '38%', size: 1.5, delay: 1.1, opacity: 0.5 },
  { top: '44%', left: '56%', size: 2, delay: 0.4, opacity: 0.85 },
  { top: '48%', left: '28%', size: 2, delay: 1.5, opacity: 0.6 },
  { top: '49%', left: '48%', size: 1.5, delay: 0.7, opacity: 0.65 },
  { top: '50%', left: '64%', size: 2, delay: 1.0, opacity: 0.7 },
  { top: '57%', left: '45%', size: 2, delay: 0.5, opacity: 0.8 },
  { top: '61%', left: '72%', size: 1.5, delay: 1.3, opacity: 0.5 },
  { top: '63%', left: '24%', size: 2.5, delay: 0.3, opacity: 0.75 },
  { top: '65%', left: '57%', size: 2, delay: 1.6, opacity: 0.85 },
  { top: '78%', left: '60%', size: 1.5, delay: 0.9, opacity: 0.55 },
  { top: '88%', left: '64%', size: 2, delay: 0.4, opacity: 0.7 },
];

const IntroPreloader: React.FC<IntroPreloaderProps> = ({ onComplete, onReveal }) => {
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);

  const handleFinish = useCallback(() => {
    onReveal?.();
    onComplete();
  }, [onComplete, onReveal]);

  // Handle ESC key to skip
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleFinish]);

  // Blinking cursor cycle
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);
    return () => clearInterval(cursorInterval);
  }, []);

  // Main animation timeline
  useEffect(() => {
    // Phase 1: 0–1.8s
    // Initial pause of 220ms, then type 12 characters over ~1.1s (approx 90ms/char)
    const typingTimers: ReturnType<typeof setTimeout>[] = [];
    const startDelay = 220;
    const charInterval = 90;

    for (let i = 1; i <= FULL_TEXT.length; i++) {
      const timer = setTimeout(() => {
        setDisplayedCount(i);
      }, startDelay + (i - 1) * charInterval);
      typingTimers.push(timer);
    }

    // Phase 2: 1.8s - 3.0s -> Start drawing wavy circle outline
    const drawTimer = setTimeout(() => {
      setIsDrawing(true);
    }, 1800);

    // Phase 3: 3.0s -> Scale up & fade out overlay, unlock page scroll and reveal hero
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      onReveal?.();
    }, 3000);

    // Phase 4: 3.7s -> Unmount intro overlay
    const completeTimer = setTimeout(() => {
      handleFinish();
    }, 3700);

    return () => {
      typingTimers.forEach(clearTimeout);
      clearTimeout(drawTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [handleFinish, onReveal]);

  const displayedText = FULL_TEXT.slice(0, displayedCount);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center select-none overflow-hidden ${
        isExiting ? 'pointer-events-none' : ''
      }`}
      style={{
        backgroundColor: '#080B10', // Site's --bg-void
      }}
      aria-live="polite"
      aria-label="Welcome Devs animation"
    >
      {/* ── Layer 1: Organic Fluid Dark Blobs (Inspired by reference image) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
        fill="none"
        aria-hidden="true"
      >
        {/* Soft background dark contour */}
        <path
          d="M 0 0 L 280 0 C 230 160, 110 260, 120 420 C 130 580, 290 680, 240 840 C 210 930, 90 980, 0 1000 Z"
          fill="#0c1119"
          opacity="0.8"
        />
        <path
          d="M 1000 0 L 760 0 C 820 180, 890 320, 840 480 C 790 620, 860 760, 910 870 C 940 930, 980 970, 1000 1000 Z"
          fill="#0c1119"
          opacity="0.8"
        />

        {/* Second layered darker fluid contour */}
        <path
          d="M 0 160 C 90 280, 100 460, 40 640 C 0 740, 0 820, 0 880 Z"
          fill="#11161D"
          opacity="0.6"
        />
        <path
          d="M 1000 320 C 920 440, 900 620, 960 780 C 990 850, 1000 900, 1000 920 Z"
          fill="#11161D"
          opacity="0.6"
        />
        <path
          d="M 220 1000 C 340 920, 560 930, 720 1000 Z"
          fill="#11161D"
          opacity="0.5"
        />
      </svg>

      {/* ── Layer 2: Left Flowing Wavy Ribbon (Warm Champagne / Decorative Line Color) ── */}
      <div className="absolute left-0 top-0 h-full w-[45vw] min-w-[200px] max-w-[520px] pointer-events-none overflow-visible">
        <svg
          viewBox="0 0 320 900"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="warmRibbonGradLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D9C6AA" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#F4F2EC" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#D9C6AA" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#EBD7BC" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <motion.path
            d={LEFT_RIBBON_PATH}
            fill="none"
            stroke="url(#warmRibbonGradLeft)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              filter:
                'drop-shadow(0 0 8px rgba(217, 198, 170, 0.6)) drop-shadow(0 0 18px rgba(217, 198, 170, 0.3))',
            }}
          />
        </svg>
      </div>

      {/* ── Layer 3: Right Looping Wavy Ribbon (Warm Champagne / Decorative Line Color) ── */}
      <div className="absolute right-0 top-0 h-full w-[45vw] min-w-[200px] max-w-[520px] pointer-events-none overflow-visible">
        <svg
          viewBox="0 0 320 900"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="warmRibbonGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EBD7BC" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#D9C6AA" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#F4F2EC" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D9C6AA" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <motion.path
            d={RIGHT_RIBBON_PATH}
            fill="none"
            stroke="url(#warmRibbonGradRight)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              filter:
                'drop-shadow(0 0 8px rgba(217, 198, 170, 0.6)) drop-shadow(0 0 18px rgba(217, 198, 170, 0.3))',
            }}
          />
        </svg>
      </div>

      {/* ── Layer 4: Scattered Starry Constellation Dots ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STAR_DOTS.map((dot, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-[#F4F2EC]"
            style={{
              top: dot.top,
              left: dot.left,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              boxShadow: '0 0 6px rgba(244, 242, 236, 0.8), 0 0 12px rgba(217, 198, 170, 0.5)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [dot.opacity * 0.4, dot.opacity, dot.opacity * 0.4],
            }}
            transition={{
              duration: 2.4 + (index % 3) * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      {/* ── Top-Right: Minimal Skip Button ── */}
      <button
        type="button"
        onClick={handleFinish}
        aria-label="Skip introductory animation"
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-[#D9C6AA]/70 hover:text-[#F4F2EC] bg-white/[0.03] hover:bg-white/[0.07] border border-[#D9C6AA]/20 hover:border-[#D9C6AA]/60 transition-all duration-200 backdrop-blur-md cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(217,198,170,0.25)]"
      >
        <span>Skip</span>
        <span className="text-[10px] opacity-60 group-hover:opacity-100 font-mono">
          [ESC]
        </span>
      </button>

      {/* ── Center Content Wrapper (Text + Wavy Circle) ── */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={
          isExiting
            ? { scale: 1.07, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-flex items-center justify-center px-7 py-5 sm:px-12 sm:py-7 md:px-16 md:py-9 mx-4 max-w-full z-10"
      >
        {/* Ghost text element keeps layout footprint rock-solid so SVG and container never jump */}
        <div
          className="invisible select-none font-black uppercase tracking-[0.2em] sm:tracking-[0.24em] text-2xl sm:text-4xl md:text-5xl lg:text-6xl flex items-center"
          aria-hidden="true"
        >
          <span>{FULL_TEXT}</span>
          <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 ml-2 sm:ml-3" />
        </div>

        {/* Active typing text + glowing decorative cursor dot */}
        <div className="absolute inset-0 flex items-center justify-center px-7 py-5 sm:px-12 sm:py-7 md:px-16 md:py-9">
          <span
            className="font-black uppercase tracking-[0.2em] sm:tracking-[0.24em] text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F4F2EC] select-none whitespace-nowrap"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              textShadow:
                '0 0 20px rgba(244, 242, 236, 0.6), 0 0 40px rgba(217, 198, 170, 0.35)',
            }}
          >
            {displayedText}
          </span>

          {/* Accent blinking dot / cursor using the site's decorative line color #D9C6AA */}
          <span
            className={`inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#D9C6AA] shadow-[0_0_12px_#D9C6AA,0_0_24px_rgba(217,198,170,0.85)] ml-2 sm:ml-3 align-middle transition-opacity duration-150 ${
              cursorVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Responsive Wavy Hand-Drawn Circle SVG with site's decorative line color */}
        <svg
          viewBox="0 0 540 180"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <motion.path
            d={HAND_DRAWN_PATH}
            fill="none"
            stroke="#D9C6AA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isDrawing
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.15 },
            }}
            style={{
              filter:
                'drop-shadow(0 0 8px #D9C6AA) drop-shadow(0 0 18px rgba(217, 198, 170, 0.6))',
            }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default IntroPreloader;
