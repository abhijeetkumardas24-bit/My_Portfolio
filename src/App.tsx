import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Contact from './components/Contact';
import IntroPreloader from './components/IntroPreloader';
import { shouldSkipIntro } from './utils/intro';

function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => !shouldSkipIntro());
  const [startHeroAnimation, setStartHeroAnimation] = useState<boolean>(() => shouldSkipIntro());
  const [isScrollLocked, setIsScrollLocked] = useState<boolean>(() => !shouldSkipIntro());
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.body.style.overflow = '';
    };
  }, []);

  // Lock page scroll strictly during intro playback, unlock immediately on reveal
  useEffect(() => {
    if (isScrollLocked) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) {
        lenisRef.current.start();
        lenisRef.current.resize();
      }
    }
  }, [isScrollLocked]);

  const handleReveal = () => {
    setIsScrollLocked(false);
    setStartHeroAnimation(true);
  };

  const handleIntroComplete = () => {
    setIsScrollLocked(false);
    setStartHeroAnimation(true);
    setShowIntro(false);
  };

  return (
    <div className="bg-[var(--bg-void)] text-[var(--text-primary)] font-sans w-full min-h-screen overflow-x-clip relative transition-colors duration-300">
      {showIntro && (
        <IntroPreloader
          onReveal={handleReveal}
          onComplete={handleIntroComplete}
        />
      )}

      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center w-full">
        <Hero startAnimation={startHeroAnimation} />
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
