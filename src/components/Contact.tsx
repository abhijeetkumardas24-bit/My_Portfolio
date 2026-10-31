import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-36 w-full border-t border-[var(--border-hairline)] relative">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-start text-left gap-8 max-w-4xl w-full relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-widest uppercase text-[var(--text-dim)]"
        >
          GET IN TOUCH
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(2.75rem,7vw,6rem)] font-black tracking-tighter leading-[0.95] uppercase text-[var(--text-primary)]"
        >
          LET'S BUILD<br/>
          SOMETHING<br/>
          INTELLIGENT.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-2xl mt-2"
        >
          Connect with me directly on LinkedIn or explore my code repositories on GitHub.
        </motion.p>

        {/* Primary Contact Buttons — Only LinkedIn & GitHub */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-5 mt-4"
        >
          {/* LinkedIn Button */}
          <a 
            href="https://www.linkedin.com/in/abhijeet-kumar-das-0b4501324" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Connect with Abhijeet Kumar Das on LinkedIn"
            className="group flex items-center justify-center gap-2.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-[var(--accent-primary)]/25 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>LinkedIn Profile</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* GitHub Button */}
          <a 
            href="https://github.com/abhijeetkumardas24-bit" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="View Abhijeet Kumar Das's repositories on GitHub"
            className="group flex items-center justify-center gap-2.5 bg-[var(--bg-card)] border border-[var(--border-hairline)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] px-8 py-4 rounded-full font-bold text-base shadow-sm hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>GitHub Profile</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Minimal Footer Signature */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-xs text-[var(--text-dim)] uppercase tracking-widest font-mono flex items-center gap-2"
        >
          <span className="text-[var(--decorative-line)] font-bold">✦</span>
          <span>Abhijeet Kumar Das • 2026 Portfolio</span>
        </motion.div>

        </div>
      </div>
      
      {/* Decorative ambient background blur */}
      <div className="absolute bottom-0 left-0 w-full max-w-[600px] h-[360px] bg-gradient-to-t from-[var(--accent-primary)]/10 to-transparent blur-3xl pointer-events-none rounded-t-[100%]" />
    </section>
  );
};

export default Contact;
