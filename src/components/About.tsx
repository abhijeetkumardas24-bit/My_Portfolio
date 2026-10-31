import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// 6x4 Dot Grid Matrix matching the mockup
const DotMatrix = ({ className = '' }: { className?: string }) => (
  <div className={`grid grid-cols-6 gap-2.5 pointer-events-none select-none ${className}`} aria-hidden="true">
    {Array.from({ length: 24 }).map((_, i) => (
      <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#A5B7CF]/25" />
    ))}
  </div>
);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked smooth grayscale transition
  // When scrolling and reaching the about section: grayscale 100% -> 0% (vivid full color)
  // When scrolling past or scrolling back up almost out of the section: smoothly transfers back to grayscale 100%
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center', 'end start'],
  });

  const rawGrayscale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.5, 0.72, 1],
    [100, 0, 0, 0, 100]
  );

  const smoothGrayscale = useSpring(rawGrayscale, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
  });

  const imageFilter = useTransform(smoothGrayscale, (val) => `grayscale(${val.toFixed(1)}%)`);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 w-full border-t border-[var(--border-hairline)] relative overflow-hidden bg-[#080B10]"
    >
      {/* ── Background Gold Curves & Ambient Glowing Nodes (Exact Mockup Match) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="about-gold-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#D9C6AA" floodOpacity="0.8" />
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#D9C6AA" floodOpacity="0.35" />
          </filter>
          <radialGradient id="about-ambient-glow" cx="78%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#D9C6AA" stopOpacity="0.12" />
            <stop offset="45%" stopColor="#3C91F6" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#080B10" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient radial glow centered behind portrait composition */}
        <rect width="100%" height="100%" fill="url(#about-ambient-glow)" />

        {/* Sweeping elegant champagne curves matching Image 2 */}
        <g stroke="#D9C6AA" strokeWidth="1.2" opacity="0.45" fill="none">
          {/* Top curve looping over the composition */}
          <path d="M 680 180 C 880 70, 1140 90, 1380 260" />
          {/* Main S-curve curving around photo with node */}
          <path d="M 720 380 C 660 480, 680 620, 780 720" strokeDasharray="4 6" opacity="0.35" />
          {/* Swooping lower curve */}
          <path d="M 620 540 C 720 720, 940 820, 1260 780" />
          {/* Bottom-left corner decorative arc on hairline */}
          <path d="M -40 830 C 60 820, 130 850, 190 910" opacity="0.4" />
        </g>

        {/* Luminous Golden Nodes on curve apexes matching Image 2 */}
        <circle cx="780" cy="625" r="5.5" fill="#D9C6AA" filter="url(#about-gold-glow)" />
        <circle cx="802" cy="735" r="4" fill="#D9C6AA" opacity="0.8" />
        <circle cx="1285" cy="120" r="5" fill="#D9C6AA" filter="url(#about-gold-glow)" />
        <circle cx="50" cy="855" r="3.5" fill="#D9C6AA" filter="url(#about-gold-glow)" />
      </svg>

      {/* ── Main Container: 2-Column Responsive Layout ── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

        {/* ── Left Column: Typography & Narrative (Matching Image 2) ── */}
        <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">
          
          {/* Top Dot Grid Matrix */}
          <DotMatrix className="mb-6 opacity-60" />

          {/* Category Tagline */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#D9C6AA] mb-2.5"
          >
            BACKGROUND &amp; OVERVIEW
          </motion.span>

          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black tracking-tight uppercase text-white mb-3 leading-none"
          >
            ABOUT ME
          </motion.h2>

          {/* Golden Underline Bar under ABOUT */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-1 sm:h-1.5 bg-[#D9C6AA] rounded-full mb-8"
          />

          {/* Body Narrative (Exact Text from Image 2) */}
          <div className="flex flex-col gap-6 max-w-xl text-[#A5B7CF] text-[15px] sm:text-base md:text-[16px] leading-[1.8] font-normal">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
            >
              I’m <strong className="text-white font-bold">Abhijeet Kumar Das</strong>, a Computer Science undergraduate
              with an interest in technology and software development. I focus on building my technical knowledge
              through academic learning and personal projects while gaining a broader understanding of the software
              development field. Beyond academics, I value collaboration, professional development, and maintaining a
              balanced approach to learning and work.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
            >
              What draws me to{' '}
              <strong className="text-[#D9C6AA] font-bold">Artificial Intelligence and Generative AI</strong> is
              their potential to make technology more intelligent, accessible, and useful. I’m particularly interested in
              how these technologies can understand information, generate meaningful outputs, and support a wide range
              of real-world applications. I enjoy learning about their capabilities and exploring how they can be
              integrated into software to create practical and effective solutions.
            </motion.p>
          </div>

          {/* Bottom Dot Grid Matrix */}
          <DotMatrix className="mt-8 opacity-40" />
        </div>

        {/* ── Right Column: Original Image ── */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative z-10 pt-6 lg:pt-0">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-2xl overflow-hidden border border-[#D9C6AA]/20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-[#090D14] group">
            {/* Portrait Image — original rectangular shape with scroll-linked grayscale effect */}
            <motion.img
              src="/profile.png"
              alt="Abhijeet Kumar Das - AI and Generative AI Engineer"
              width={768}
              height={1024}
              className="w-full h-auto object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              style={{
                filter: imageFilter,
                willChange: 'filter, transform',
              }}
              loading="eager"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
