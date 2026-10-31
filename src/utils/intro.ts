export const INTRO_STORAGE_KEY = 'portfolio_intro_seen';

export const shouldSkipIntro = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReduced;
  } catch {
    return false;
  }
};
