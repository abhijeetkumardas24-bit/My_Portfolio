import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificates', href: '#certificates' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    // Always force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 40);

          // Auto-hide only on mobile screens (< 768px) to maximize reading space
          if (window.innerWidth < 768) {
            if (currentScrollY < 60) {
              setVisible(true);
            } else if (currentScrollY > lastScrollYRef.current + 8) {
              // Scrolling DOWN: slide navbar up so it doesn't cover section headers
              if (!mobileMenuOpen) {
                setVisible(false);
              }
            } else if (currentScrollY < lastScrollYRef.current - 8) {
              // Scrolling UP: reveal navbar smoothly
              setVisible(true);
            }
          } else {
            // Desktop: always keep visible
            setVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : -100, 
          opacity: visible ? 1 : 0 
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
          scrolled ? 'py-2.5 sm:py-4' : 'py-3.5 sm:py-8'
        }`}
      >
        <div 
          className={`flex items-center justify-between px-6 md:px-8 transition-all duration-500 relative ${
            scrolled 
              ? 'w-[95%] max-w-[1240px] rounded-full py-3 realistic-glass' 
              : 'w-full max-w-[1440px] bg-transparent py-2 border border-transparent'
          }`}
        >
          {/* Top specular gloss reflection line for realistic glass sheen */}
          <div 
            className={`absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-full transition-opacity duration-500 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`} 
            aria-hidden="true"
          />
          {/* Logo / Name */}
          <a 
            href="#" 
            aria-label="Abhijeet Kumar Das - Portfolio Home" 
            className="text-xl font-bold tracking-tight z-50 relative group text-[var(--text-primary)]"
          >
            <span className="uppercase inline-block">ABHIJEET</span>
            <span className="opacity-50 ml-1 inline-block">DAS</span>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-6">
            <div className="flex gap-7 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium relative group py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 block">
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--accent-primary)] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Contact CTA */}
            <a 
              href="#contact" 
              className="group flex items-center gap-1.5 text-sm font-bold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-1">
                LET'S TALK <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden z-50">
            <button 
              className="p-2 text-[var(--text-primary)] active:scale-95 transition-transform"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--bg-void)]/95 backdrop-blur-xl text-[var(--text-primary)] flex flex-col items-center justify-center gap-7 pt-16 px-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-3xl font-black tracking-tight hover:text-[var(--accent-primary)] active:scale-95 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="text-base font-bold mt-4 border border-[var(--border-hairline)] bg-[var(--accent-primary)] text-white px-8 py-3.5 rounded-full active:scale-95 transition-transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              LET'S TALK ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
