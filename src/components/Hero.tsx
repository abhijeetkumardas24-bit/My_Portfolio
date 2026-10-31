import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SpotlightDotGrid from './SpotlightDotGrid';

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, damping: 20, stiffness: 100, duration: 0.8 },
    },
  };

  return (
    <section 
      id="hero" 
      aria-label="Introduction - Abhijeet Kumar Das"
      className="min-h-screen w-full flex flex-col justify-center pt-24 pb-16 relative overflow-hidden"
    >

      {/* ── CSS Spotlight Dot Grid (passive slate + blue hover spotlight) */}
      <SpotlightDotGrid />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={startAnimation ? 'visible' : 'hidden'}
        className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start relative z-10"
      >
        {/* ── Personal Identity ── */}
        <motion.div variants={itemVariants} className="mb-6 flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[var(--text-primary)] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#3C91F6] animate-pulse" aria-hidden="true" />
            <span>ABHIJEET KUMAR DAS</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#3C91F6] font-mono pl-4">
            AI &amp; GENAI ENGINEER
          </span>
        </motion.div>

        {/* ── Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(3.5rem,8vw,8rem)] font-black tracking-[-0.06em] leading-[0.9] uppercase text-[var(--text-primary)] mb-8"
        >
          <span className="sr-only">Abhijeet Kumar Das — </span>
          <div className="overflow-hidden">IDEAS CREATE</div>
          <div className="overflow-hidden">POSSIBILITIES.</div>
          <div className="overflow-hidden">EXECUTION CREATES</div>
          <div className="overflow-hidden">REALITY.</div>
        </motion.h1>

        {/* ── Description */}
        <motion.div variants={itemVariants} className="max-w-xl mb-12">
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-medium">
            THINK BUILD REFINE
          </p>
        </motion.div>

        {/* ── CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
          <a
            href="#projects"
            className="group flex items-center gap-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-[var(--accent-primary)]/25 hover:shadow-[var(--accent-primary)]/40 transition-all duration-300"
          >
            VIEW MY WORK{' '}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-hairline)] px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:border-[var(--border-active)] hover:bg-[var(--bg-card)] transition-all duration-300"
          >
            LET'S CONNECT
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative blurred background ambient glow */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-[var(--accent-primary)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-[20%] w-96 h-96 bg-[var(--decorative-line)]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Hero;
