import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X, ZoomIn, ExternalLink } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badge?: string;
  image: string;
  verifyUrl: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

const certificatesList: Certificate[] = [
  {
    id: "cert-oracle",
    title: "Oracle Certified Foundations Associate",
    issuer: "Oracle University",
    year: "2026",
    badge: "LATEST",
    image: "/certificates/oracle-cert.png",
    verifyUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=3411E1ECEC474809DC1307742A08E9589067FDE48463BC59DF5D736022F20510",
    summary: "Mastering cloud and AI infrastructure fundamentals through hands-on Oracle platform training.",
    bullets: [
      "Demonstrated proficiency in Oracle Cloud Infrastructure core concepts and services.",
      "Covered AI foundations including autonomous systems, data management, and cloud security.",
      "Completed hands-on labs validating real-world deployment and operational knowledge.",
    ],
    tags: ["Agentic AI", "Oracle University", "Autonomous Systems", "Cloud Infrastructure"],
  },
  {
    id: "cert-aws-nlp",
    title: "AWS Academy Graduate — ML for NLP",
    issuer: "Amazon Web Services",
    year: "2026",
    badge: "AWS ACADEMY",
    image: "/certificates/aws-nlp-cert.png",
    verifyUrl: "https://www.credly.com/badges/dd918487-75d5-4044-9003-d88815f777fc/public_url",
    summary: "Specialized machine learning training focused on natural language processing pipelines on AWS.",
    bullets: [
      "Built and fine-tuned transformer-based NLP models using AWS SageMaker.",
      "Explored text classification, sentiment analysis, and named entity recognition workflows.",
      "Integrated AWS services for end-to-end NLP model deployment and monitoring.",
    ],
    tags: ["NLP", "Transformers", "AWS Academy", "Deep Learning"],
  },
  {
    id: "cert-aws-ml",
    title: "AWS Academy Graduate — ML Foundations",
    issuer: "Amazon Web Services",
    year: "2026",
    badge: "AWS ACADEMY",
    image: "/certificates/aws-ml-cert.png",
    verifyUrl: "https://www.credly.com/badges/e1714812-2bcf-41eb-860a-888d40f955eb/public_url",
    summary: "Comprehensive foundation in machine learning concepts, algorithms, and AWS cloud tooling.",
    bullets: [
      "Covered supervised, unsupervised, and reinforcement learning paradigms in depth.",
      "Gained practical experience with Amazon SageMaker for training and deploying ML models.",
      "Applied feature engineering and model evaluation techniques to real-world datasets.",
    ],
    tags: ["Machine Learning", "SageMaker", "Supervised Learning", "AWS"],
  },
];

const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const total = certificatesList.length;

  const navigate = useCallback(
    (dir: 'prev' | 'next') => {
      setActiveIndex((prev) =>
        dir === 'next' ? (prev + 1) % total : (prev - 1 + total) % total
      );
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      } else if (e.key === 'ArrowLeft') {
        if (selectedCert) {
          const currentIndex = certificatesList.findIndex((c) => c.id === selectedCert.id);
          const prevIndex = (currentIndex - 1 + total) % total;
          setSelectedCert(certificatesList[prevIndex]);
          setActiveIndex(prevIndex);
        } else {
          navigate('prev');
        }
      } else if (e.key === 'ArrowRight') {
        if (selectedCert) {
          const currentIndex = certificatesList.findIndex((c) => c.id === selectedCert.id);
          const nextIndex = (currentIndex + 1) % total;
          setSelectedCert(certificatesList[nextIndex]);
          setActiveIndex(nextIndex);
        } else {
          navigate('next');
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, selectedCert, total]);

  // Lock body scroll when certificate modal is open
  useEffect(() => {
    if (selectedCert) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedCert]);

  // Compute symmetric offset for 3 cards: -1 (left peek), 0 (center active), +1 (right peek)
  const getOffset = (i: number, active: number, count: number) => {
    let diff = (i - active) % count;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  };

  const getCardStyle = (offset: number) => {
    if (offset === 0) {
      return {
        x: '0%',
        y: 0,
        scale: 1,
        zIndex: 30,
        opacity: 1,
        filter: 'blur(0px)',
      };
    }
    if (offset === 1) {
      return {
        x: '4.5%',
        y: -6,
        scale: 0.95,
        zIndex: 20,
        opacity: 0.72,
        filter: 'blur(0.5px)',
      };
    }
    if (offset === -1) {
      return {
        x: '-4.5%',
        y: -6,
        scale: 0.95,
        zIndex: 20,
        opacity: 0.72,
        filter: 'blur(0.5px)',
      };
    }
    return {
      x: offset > 0 ? '8%' : '-8%',
      y: -12,
      scale: 0.9,
      zIndex: 10,
      opacity: 0,
      filter: 'blur(1px)',
    };
  };

  const springTransition = {
    type: 'spring' as const,
    stiffness: 280,
    damping: 26,
    mass: 0.8,
  };

  return (
    <section
      id="certificates"
      className="py-24 md:py-32 w-full border-t border-[var(--border-hairline)] relative overflow-hidden bg-[#080B10]"
    >
      {/* ─── Academic & Verification Technical Line-Art Background ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        viewBox="0 0 1440 920"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Blueprint Grid Pattern */}
          <pattern id="cert-grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(165, 183, 207, 0.035)" strokeWidth="1" />
          </pattern>

          {/* Warm Champagne Ambient Radial Glow */}
          <radialGradient id="cert-warm-glow" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#D9C6AA" stopOpacity="0.10" />
            <stop offset="40%" stopColor="#D9C6AA" stopOpacity="0.025" />
            <stop offset="75%" stopColor="#3C91F6" stopOpacity="0.012" />
            <stop offset="100%" stopColor="#080B10" stopOpacity="0" />
          </radialGradient>

          {/* Golden Glow Filter for Seals & Sparkles */}
          <filter id="cert-gold-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#D9C6AA" floodOpacity="0.4" />
          </filter>

          {/* 4-point sparkle star symbol */}
          <g id="sparkle-star">
            <path
              d="M 0 -11 C 0.5 -3 3 -0.5 11 0 C 3 0.5 0.5 3 0 11 C -0.5 3 -3 0.5 -11 0 C -3 -0.5 -0.5 -3 0 -11 Z"
              fill="#D9C6AA"
            />
          </g>

          {/* Smaller sparkle star */}
          <g id="sparkle-star-sm">
            <path
              d="M 0 -7 C 0.3 -2 2 -0.3 7 0 C 2 0.3 0.3 2 0 7 C -0.3 2 -2 0.3 -7 0 C -2 -0.3 -0.3 -2 0 -7 Z"
              fill="#D9C6AA"
            />
          </g>
        </defs>

        {/* Blueprint Grid Background */}
        <rect width="100%" height="100%" fill="url(#cert-grid-pattern)" />

        {/* Warm Ambient Atmosphere */}
        <rect width="100%" height="100%" fill="url(#cert-warm-glow)" />

        {/* ─── Ambient Sweeping Orbital Arcs ─── */}
        <g stroke="#D9C6AA" strokeWidth="1.2" opacity="0.22">
          {/* Large graceful diagonal swoops across the canvas */}
          <path d="M -100 320 C 260 300, 580 440, 1020 720 C 1220 840, 1380 940, 1540 980" />
          <path d="M -80 340 C 280 320, 600 460, 1040 740 C 1240 860, 1400 960, 1560 1000" strokeDasharray="5 7" opacity="0.6" />
        </g>
        <g stroke="#28313D" strokeWidth="1.2" opacity="0.45">
          <circle cx="1400" cy="180" r="320" fill="none" />
          <circle cx="1400" cy="180" r="420" fill="none" strokeDasharray="4 6" />
          <circle cx="100" cy="850" r="280" fill="none" />
        </g>

        {/* ─── 1. TOP-RIGHT: TILTED FRAMED DIPLOMA & LAUREL BRANCH ─── */}
        <g transform="translate(1200, 290) rotate(14)">
          {/* Outer Certificate Frame */}
          <rect
            x="-125"
            y="-85"
            width="250"
            height="170"
            rx="6"
            stroke="#D9C6AA"
            strokeWidth="1.4"
            fill="#11161D"
            fillOpacity="0.4"
          />
          {/* Inner Certificate Decorative Border with corner notches */}
          <rect
            x="-115"
            y="-75"
            width="230"
            height="150"
            rx="3"
            stroke="#D9C6AA"
            strokeWidth="0.9"
            strokeDasharray="230 150"
            opacity="0.75"
            fill="none"
          />
          {/* Corner flourish markers */}
          <path d="M -111 -67 L -111 -71 L -107 -71" stroke="#D9C6AA" strokeWidth="1" fill="none" />
          <path d="M 111 -67 L 111 -71 L 107 -71" stroke="#D9C6AA" strokeWidth="1" fill="none" />
          <path d="M -111 67 L -111 71 L -107 71" stroke="#D9C6AA" strokeWidth="1" fill="none" />
          <path d="M 111 67 L 111 71 L 107 71" stroke="#D9C6AA" strokeWidth="1" fill="none" />

          {/* Certificate text blueprint skeleton lines */}
          <line x1="-90" y1="-50" x2="-20" y2="-50" stroke="#D9C6AA" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <line x1="-90" y1="-32" x2="30" y2="-32" stroke="#A5B7CF" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
          <line x1="-90" y1="-18" x2="40" y2="-18" stroke="#A5B7CF" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
          <line x1="-90" y1="-4" x2="25" y2="-4" stroke="#A5B7CF" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
          <line x1="-90" y1="10" x2="10" y2="10" stroke="#A5B7CF" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
          <line x1="-90" y1="24" x2="-10" y2="24" stroke="#A5B7CF" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />

          {/* Signature Line & Seal on the right */}
          <line x1="-90" y1="46" x2="-40" y2="46" stroke="#D9C6AA" strokeWidth="1" opacity="0.6" />

          {/* Rosette Medal / Ribbon Seal */}
          <g transform="translate(68, 26)" filter="url(#cert-gold-glow)">
            {/* Scalloped rosette seal */}
            <circle cx="0" cy="0" r="22" stroke="#D9C6AA" strokeWidth="1.4" fill="#11161D" fillOpacity="0.7" />
            <circle cx="0" cy="0" r="17" stroke="#D9C6AA" strokeWidth="0.9" strokeDasharray="3 2" fill="none" />
            <circle cx="0" cy="0" r="10" stroke="#D9C6AA" strokeWidth="1" fill="none" />
            {/* Ribbon Tails hanging down */}
            <path
              d="M -9 18 L -15 48 L -6 43 L 0 48 L -3 18 Z"
              stroke="#D9C6AA"
              strokeWidth="1.2"
              fill="#11161D"
              fillOpacity="0.8"
            />
            <path
              d="M 3 18 L 0 48 L 6 43 L 15 48 L 9 18 Z"
              stroke="#D9C6AA"
              strokeWidth="1.2"
              fill="#11161D"
              fillOpacity="0.8"
            />
          </g>
        </g>

        {/* ─── 2. TOP-RIGHT LAUREL BRANCH CURVING UPWARD ─── */}
        <g stroke="#D9C6AA" strokeWidth="1.2" fill="none" opacity="0.38">
          {/* Main curved stem */}
          <path d="M 1240 430 C 1270 360, 1290 280, 1275 200" />
          {/* Laurel leaf pairs along stem */}
          <path d="M 1246 410 C 1235 400, 1225 405, 1228 418 C 1238 418, 1244 415, 1246 410 Z" fill="#D9C6AA" fillOpacity="0.15" />
          <path d="M 1250 405 C 1262 398, 1272 402, 1268 414 C 1258 415, 1252 411, 1250 405 Z" fill="#D9C6AA" fillOpacity="0.15" />

          <path d="M 1260 365 C 1248 354, 1236 358, 1240 372 C 1250 373, 1258 370, 1260 365 Z" fill="#D9C6AA" fillOpacity="0.15" />
          <path d="M 1265 360 C 1278 352, 1288 356, 1284 370 C 1274 371, 1267 367, 1265 360 Z" fill="#D9C6AA" fillOpacity="0.15" />

          <path d="M 1275 320 C 1262 308, 1250 312, 1254 326 C 1264 327, 1272 324, 1275 320 Z" fill="#D9C6AA" fillOpacity="0.15" />
          <path d="M 1280 315 C 1293 306, 1303 310, 1299 324 C 1289 325, 1282 321, 1280 315 Z" fill="#D9C6AA" fillOpacity="0.15" />

          <path d="M 1283 270 C 1270 258, 1258 261, 1262 276 C 1272 277, 1280 274, 1283 270 Z" fill="#D9C6AA" fillOpacity="0.15" />
          <path d="M 1285 265 C 1298 255, 1308 260, 1304 274 C 1294 275, 1287 271, 1285 265 Z" fill="#D9C6AA" fillOpacity="0.15" />

          <path d="M 1281 225 C 1269 214, 1258 217, 1261 231 C 1271 232, 1278 229, 1281 225 Z" fill="#D9C6AA" fillOpacity="0.15" />
          <path d="M 1281 220 C 1293 210, 1304 214, 1299 228 C 1290 229, 1283 225, 1281 220 Z" fill="#D9C6AA" fillOpacity="0.15" />

          {/* Terminal top leaf */}
          <path d="M 1275 200 C 1272 186, 1280 180, 1286 188 C 1286 198, 1280 203, 1275 200 Z" fill="#D9C6AA" fillOpacity="0.2" />
        </g>

        {/* ─── 3. TOP-CENTER LAUREL FOLIAGE (Ascending above cards) ─── */}
        <g stroke="#D9C6AA" strokeWidth="1.2" fill="none" opacity="0.32" transform="translate(870, 270)">
          {/* Stem curving upward */}
          <path d="M 0 100 C 15 50, 20 0, 12 -50" />
          {/* Leaf pairs */}
          <path d="M 4 80 C -8 72, -14 78, -10 90 C -1 89, 4 85, 4 80 Z" fill="#D9C6AA" fillOpacity="0.18" />
          <path d="M 7 76 C 18 68, 25 74, 21 86 C 13 86, 7 81, 7 76 Z" fill="#D9C6AA" fillOpacity="0.18" />

          <path d="M 12 40 C 0 32, -6 38, -2 50 C 7 49, 12 45, 12 40 Z" fill="#D9C6AA" fillOpacity="0.18" />
          <path d="M 15 36 C 26 28, 33 34, 29 46 C 21 46, 15 41, 15 36 Z" fill="#D9C6AA" fillOpacity="0.18" />

          <path d="M 18 0 C 6 -8, 0 -2, 4 10 C 13 9, 18 5, 18 0 Z" fill="#D9C6AA" fillOpacity="0.18" />
          <path d="M 19 -4 C 30 -12, 37 -6, 33 6 C 25 6, 19 1, 19 -4 Z" fill="#D9C6AA" fillOpacity="0.18" />

          {/* Terminal tip leaf */}
          <path d="M 12 -50 C 9 -64, 18 -68, 22 -60 C 21 -50, 16 -46, 12 -50 Z" fill="#D9C6AA" fillOpacity="0.22" />
        </g>

        {/* ─── 4. MID/TOP-LEFT: TILTED FRAMED CERTIFICATE WITH SEAL ─── */}
        <g transform="translate(130, 490) rotate(-14)">
          {/* Outer Diploma Frame */}
          <rect
            x="-115"
            y="-75"
            width="230"
            height="150"
            rx="5"
            stroke="#D9C6AA"
            strokeWidth="1.3"
            fill="#11161D"
            fillOpacity="0.35"
          />
          {/* Inner Border */}
          <rect
            x="-105"
            y="-65"
            width="210"
            height="130"
            rx="2"
            stroke="#D9C6AA"
            strokeWidth="0.8"
            opacity="0.65"
            fill="none"
          />
          {/* Text lines */}
          <line x1="-80" y1="-45" x2="-10" y2="-45" stroke="#D9C6AA" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
          <line x1="-80" y1="-28" x2="30" y2="-28" stroke="#A5B7CF" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
          <line x1="-80" y1="-14" x2="40" y2="-14" stroke="#A5B7CF" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <line x1="-80" y1="0" x2="20" y2="0" stroke="#A5B7CF" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
          <line x1="-80" y1="14" x2="-5" y2="14" stroke="#A5B7CF" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />

          {/* Circular Seal with Ribbon Tails */}
          <g transform="translate(60, 20)" filter="url(#cert-gold-glow)">
            <circle cx="0" cy="0" r="19" stroke="#D9C6AA" strokeWidth="1.3" fill="#11161D" fillOpacity="0.8" />
            <circle cx="0" cy="0" r="14" stroke="#D9C6AA" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
            <circle cx="0" cy="0" r="8" stroke="#D9C6AA" strokeWidth="0.9" fill="none" />
            {/* Tails */}
            <path
              d="M -7 15 L -12 40 L -5 36 L 0 40 L -2 15 Z"
              stroke="#D9C6AA"
              strokeWidth="1.1"
              fill="#11161D"
              fillOpacity="0.8"
            />
            <path
              d="M 2 15 L 0 40 L 5 36 L 12 40 L 7 15 Z"
              stroke="#D9C6AA"
              strokeWidth="1.1"
              fill="#11161D"
              fillOpacity="0.8"
            />
          </g>
        </g>

        {/* ─── 5. BOTTOM-LEFT: ROLLED DIPLOMA SCROLL WITH SEAL & RIBBON ─── */}
        <g transform="translate(105, 835)" filter="url(#cert-gold-glow)">
          {/* Scroll cylinder rolled parchment tilted ~ -20deg */}
          <g transform="rotate(-22)">
            {/* Main body of rolled scroll */}
            <path
              d="M -90 -22 L 50 -22 L 50 22 L -90 22 Z"
              stroke="#D9C6AA"
              strokeWidth="1.3"
              fill="#11161D"
              fillOpacity="0.75"
            />
            {/* Right roll edge / outer cylinder curl */}
            <ellipse cx="50" cy="0" rx="10" ry="22" stroke="#D9C6AA" strokeWidth="1.3" fill="#11161D" fillOpacity="0.8" />
            {/* Left roll inner spiral curl */}
            <path
              d="M -90 -22 C -96 -22, -100 -12, -100 0 C -100 12, -96 22, -90 22 C -84 22, -80 12, -80 0 C -80 -8, -84 -14, -88 -14 C -91 -14, -93 -10, -93 -6"
              stroke="#D9C6AA"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Rolled parchment contour lines */}
            <line x1="-80" y1="-10" x2="40" y2="-10" stroke="#A5B7CF" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
            <line x1="-80" y1="10" x2="40" y2="10" stroke="#A5B7CF" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />

            {/* Ribbon Tie around the scroll center */}
            <rect x="-22" y="-23" width="16" height="46" rx="2" stroke="#D9C6AA" strokeWidth="1.2" fill="#080B10" />
            <line x1="-14" y1="-23" x2="-14" y2="23" stroke="#D9C6AA" strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Hanging Ribbon Tails and Rosette Seal */}
          <g transform="translate(10, 20)">
            <circle cx="0" cy="12" r="18" stroke="#D9C6AA" strokeWidth="1.3" fill="#11161D" fillOpacity="0.85" />
            <circle cx="0" cy="12" r="13" stroke="#D9C6AA" strokeWidth="0.8" strokeDasharray="2.5 2" fill="none" />
            <circle cx="0" cy="12" r="7" stroke="#D9C6AA" strokeWidth="1" fill="none" />
            {/* Medallion hanging tails */}
            <path
              d="M -7 28 L -12 55 L -4 50 L 1 55 L -1 28 Z"
              stroke="#D9C6AA"
              strokeWidth="1.1"
              fill="#11161D"
              fillOpacity="0.8"
            />
            <path
              d="M 1 28 L -1 55 L 4 50 L 12 55 L 7 28 Z"
              stroke="#D9C6AA"
              strokeWidth="1.1"
              fill="#11161D"
              fillOpacity="0.8"
            />
          </g>

          {/* Adjacent delicate branch with leaves */}
          <g stroke="#D9C6AA" strokeWidth="1.1" opacity="0.45" fill="none" transform="translate(-100, -20)">
            <path d="M 0 40 C 20 20, 35 -10, 45 -40" />
            <path d="M 15 22 C 8 16, 6 22, 10 30 C 18 29, 21 24, 15 22 Z" fill="#D9C6AA" fillOpacity="0.15" />
            <path d="M 28 4 C 20 -2, 18 4, 22 12 C 30 11, 33 6, 28 4 Z" fill="#D9C6AA" fillOpacity="0.15" />
            <path d="M 40 -18 C 32 -24, 30 -18, 34 -10 C 42 -11, 45 -16, 40 -18 Z" fill="#D9C6AA" fillOpacity="0.15" />
          </g>
        </g>

        {/* ─── 6. BOTTOM-RIGHT: GRADUATION MORTARBOARD CAP & LAUREL WREATH ─── */}
        <g transform="translate(1310, 815)">
          {/* Mortarboard Graduation Cap */}
          <g filter="url(#cert-gold-glow)">
            {/* Skull Cap Base (under the cap plane) */}
            <path
              d="M -52 14 C -52 46, 52 46, 52 14 C 42 26, -42 26, -52 14 Z"
              stroke="#D9C6AA"
              strokeWidth="1.3"
              fill="#11161D"
              fillOpacity="0.7"
            />
            <path
              d="M -46 25 C -46 54, 46 54, 46 25"
              stroke="#D9C6AA"
              strokeWidth="1.1"
              fill="none"
              opacity="0.8"
            />

            {/* Mortarboard Diamond Flat Top */}
            <polygon
              points="0,-36 126,0 0,36 -126,0"
              stroke="#D9C6AA"
              strokeWidth="1.6"
              fill="#11161D"
              fillOpacity="0.85"
            />
            {/* Center button */}
            <circle cx="0" cy="0" r="4.5" stroke="#D9C6AA" strokeWidth="1.2" fill="#D9C6AA" />

            {/* Tassel Draped over the corner */}
            {/* Cord curving down to right corner and hanging */}
            <path
              d="M 0 0 C 45 -4, 90 2, 98 16 C 104 26, 102 46, 98 62"
              stroke="#D9C6AA"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Tassel Ring / Band */}
            <rect x="94" y="60" width="8" height="4" rx="1" fill="#D9C6AA" />
            {/* Tassel Fringe / Brush */}
            <path
              d="M 94 64 L 91 94 L 105 94 L 102 64 Z"
              stroke="#D9C6AA"
              strokeWidth="1.1"
              fill="#11161D"
              fillOpacity="0.9"
            />
            {/* Tassel internal brush bristles */}
            <line x1="95" y1="68" x2="94" y2="92" stroke="#D9C6AA" strokeWidth="0.8" opacity="0.7" />
            <line x1="98" y1="68" x2="98" y2="93" stroke="#D9C6AA" strokeWidth="0.8" opacity="0.7" />
            <line x1="101" y1="68" x2="102" y2="92" stroke="#D9C6AA" strokeWidth="0.8" opacity="0.7" />
          </g>

          {/* Laurel branch curving up the right edge beside cap */}
          <g stroke="#D9C6AA" strokeWidth="1.2" opacity="0.38" fill="none" transform="translate(-20, -110)">
            <path d="M 40 80 C 60 10, 50 -70, 20 -140" />
            <path d="M 46 60 C 58 54, 65 60, 61 71 C 52 71, 46 66, 46 60 Z" fill="#D9C6AA" fillOpacity="0.16" />
            <path d="M 42 56 C 30 50, 24 56, 28 67 C 36 67, 42 62, 42 56 Z" fill="#D9C6AA" fillOpacity="0.16" />

            <path d="M 52 10 C 64 4, 71 10, 67 21 C 58 21, 52 16, 52 10 Z" fill="#D9C6AA" fillOpacity="0.16" />
            <path d="M 47 6 C 35 0, 29 6, 33 17 C 41 17, 47 12, 47 6 Z" fill="#D9C6AA" fillOpacity="0.16" />

            <path d="M 48 -40 C 60 -46, 67 -40, 63 -29 C 54 -29, 48 -34, 48 -40 Z" fill="#D9C6AA" fillOpacity="0.16" />
            <path d="M 42 -44 C 30 -50, 24 -44, 28 -33 C 36 -33, 42 -38, 42 -44 Z" fill="#D9C6AA" fillOpacity="0.16" />

            <path d="M 33 -90 C 45 -96, 52 -90, 48 -79 C 39 -79, 33 -84, 33 -90 Z" fill="#D9C6AA" fillOpacity="0.16" />
            <path d="M 27 -94 C 15 -100, 9 -94, 13 -83 C 21 -83, 27 -88, 27 -94 Z" fill="#D9C6AA" fillOpacity="0.16" />

            <path d="M 20 -140 C 24 -152, 14 -156, 9 -147 C 10 -137, 16 -134, 20 -140 Z" fill="#D9C6AA" fillOpacity="0.22" />
          </g>
        </g>

        {/* ─── 7. FLOATING 4-POINT SPARKLE STARS ─── */}
        <g opacity="0.75" filter="url(#cert-gold-glow)">
          {/* Top-Left near Title */}
          <use href="#sparkle-star-sm" x="38" y="328" />
          <use href="#sparkle-star" x="135" y="682" />
          <use href="#sparkle-star-sm" x="288" y="780" />

          {/* Top Center */}
          <use href="#sparkle-star" x="1035" y="268" />
          <use href="#sparkle-star-sm" x="720" y="300" />

          {/* Top Right around diploma & wreath */}
          <use href="#sparkle-star" x="1355" y="172" />
          <use href="#sparkle-star-sm" x="1060" y="390" />
          <use href="#sparkle-star" x="1410" y="668" />

          {/* Bottom Right near Cap */}
          <use href="#sparkle-star-sm" x="1132" y="884" />
        </g>

      </svg>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start relative z-10">

        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-[var(--text-dim)] mb-2"
          >
            CREDENTIALS &amp; VERIFICATIONS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[var(--text-primary)]"
          >
            CERTIFICATES
          </motion.h2>
        </div>

        {/* Row: Prev button + CardStack + Next button */}
        <div className="w-full flex items-center justify-center gap-3 sm:gap-4 md:gap-6">

          {/* Prev Button */}
          <button
            onClick={() => navigate('prev')}
            aria-label="Previous certificate"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full
              bg-[var(--bg-elevated)] border border-[var(--border-hairline)]
              text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white hover:border-[var(--accent-primary)]
              transition-all duration-200 shadow-md z-40 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* CardStack Container */}
          <div className="flex-1 max-w-3xl min-w-0 relative py-2 px-1 sm:px-2 md:px-4">
            <div className="grid grid-cols-1 grid-rows-1 items-stretch">
              {certificatesList.map((cert, i) => {
                const offset = getOffset(i, activeIndex, total);
                const isActive = offset === 0;
                const style = getCardStyle(offset);

                return (
                  <motion.div
                    key={cert.id}
                    style={{
                      gridArea: '1 / 1 / 2 / 2',
                      willChange: 'transform, opacity',
                      zIndex: style.zIndex,
                    }}
                    animate={{
                      x: style.x,
                      y: style.y,
                      scale: style.scale,
                      opacity: style.opacity,
                      filter: style.filter,
                    }}
                    transition={springTransition}
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(i);
                      } else {
                        setSelectedCert(cert);
                      }
                    }}
                    className={`w-full rounded-2xl border border-[var(--border-hairline)]
                      bg-[var(--bg-card)] backdrop-blur-md shadow-2xl overflow-hidden relative cursor-pointer
                      ${!isActive ? 'select-none hover:opacity-90' : 'hover:border-[var(--border-active)]'}`}
                  >
                    {/* Subtle dimming overlay for background cards */}
                    {!isActive && (
                      <div className="absolute inset-0 z-20 bg-[var(--bg-void)]/25 backdrop-blur-[1px] transition-opacity" />
                    )}

                    <div className="flex flex-col md:flex-row">

                      {/* ── Left: Text Content ── */}
                      <div className="flex flex-col gap-4 p-6 md:p-7 flex-1 justify-between min-w-0">

                        {/* Header */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
                            <h3 className="text-base sm:text-[17px] font-black tracking-tight text-[var(--text-primary)] leading-snug">
                              {cert.title}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {cert.badge && (
                                <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)]">
                                  {cert.badge}
                                </span>
                              )}
                              <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)]">
                                {cert.year}
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] font-semibold text-[var(--text-dim)] uppercase tracking-wider">
                            {cert.issuer}
                          </p>
                          <div className="h-px bg-[var(--border-hairline)] my-1" />
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {cert.summary}
                          </p>
                        </div>

                        {/* Bullets */}
                        <ul className="flex flex-col gap-2">
                          {cert.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] flex-shrink-0" />
                              <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {cert.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-[var(--text-secondary)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions: View Image Modal & Credly Verify */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCert(cert);
                            }}
                            tabIndex={isActive ? 0 : -1}
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-200 cursor-pointer shadow-sm ${
                              !isActive ? 'pointer-events-none' : ''
                            }`}
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>View Certificate</span>
                          </button>

                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isActive ? 0 : -1}
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 group/link ${
                              !isActive ? 'pointer-events-none' : ''
                            }`}
                          >
                            <span>View on Credly</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
                        </div>
                      </div>

                      {/* ── Right: Certificate Image (Click to Expand) ── */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isActive) {
                            setActiveIndex(i);
                          } else {
                            setSelectedCert(cert);
                          }
                        }}
                        className="md:w-[42%] flex-shrink-0 border-t md:border-t-0 md:border-l
                          border-[var(--border-hairline)] bg-[var(--bg-elevated)]
                          flex items-center justify-center p-5 md:p-6 min-h-[200px]
                          cursor-pointer group/img relative overflow-hidden"
                        title="Click to view full certificate"
                      >
                        <img
                          src={cert.image}
                          alt={`${cert.title} Certificate - Issued by ${cert.issuer}`}
                          width={800}
                          height={530}
                          className="w-full h-full max-h-[260px] object-contain rounded-lg
                            drop-shadow-lg transition-transform duration-300 group-hover/img:scale-[1.03]"
                          loading="lazy"
                          draggable={false}
                        />

                        {/* Hover Overlay Hint */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px] pointer-events-none">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-hairline)] text-xs font-semibold text-[var(--text-primary)] shadow-lg">
                            <ZoomIn className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                            <span>Click to Expand</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => navigate('next')}
            aria-label="Next certificate"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full
              bg-[var(--bg-elevated)] border border-[var(--border-hairline)]
              text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white hover:border-[var(--accent-primary)]
              transition-all duration-200 shadow-md z-40 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Dot indicators */}
        <div className="w-full flex justify-center gap-2 mt-6">
          {certificatesList.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Certificate ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? 'w-6 bg-[var(--accent-primary)]' : 'w-1.5 bg-[var(--border-active)] hover:bg-[var(--text-secondary)]'
              }`}
            />
          ))}
        </div>

      </div>

      {/* ── High-Resolution Certificate Lightbox Modal ── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[var(--bg-card)] border border-[var(--border-hairline)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-hairline)] bg-[var(--bg-elevated)]">
                <div className="flex flex-col min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] truncate">
                      {selectedCert.title}
                    </h3>
                    {selectedCert.badge && (
                      <span className="hidden sm:inline-block text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-hairline)]">
                        {selectedCert.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--text-dim)] font-medium">
                    Issued by {selectedCert.issuer} • {selectedCert.year}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white border border-[var(--accent-primary)]/30 transition-all duration-200"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close certificate preview"
                    className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body / Image Preview */}
              <div className="relative flex-1 bg-[var(--bg-void)]/90 p-4 sm:p-8 flex items-center justify-center overflow-auto min-h-[300px]">
                {/* Previous Button inside modal */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = certificatesList.findIndex((c) => c.id === selectedCert.id);
                    const prevIndex = (currentIndex - 1 + total) % total;
                    setSelectedCert(certificatesList[prevIndex]);
                    setActiveIndex(prevIndex);
                  }}
                  aria-label="Previous certificate"
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] transition-all shadow-lg cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} - Official Certificate Document from ${selectedCert.issuer}`}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                />

                {/* Next Button inside modal */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = certificatesList.findIndex((c) => c.id === selectedCert.id);
                    const nextIndex = (currentIndex + 1) % total;
                    setSelectedCert(certificatesList[nextIndex]);
                    setActiveIndex(nextIndex);
                  }}
                  aria-label="Next certificate"
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] transition-all shadow-lg cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Mobile Footer */}
              <div className="sm:hidden flex items-center justify-between px-4 py-3 border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)]">
                <span className="text-xs text-[var(--text-secondary)]">Official Credential</span>
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white border border-[var(--accent-primary)]/30 transition-all"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
