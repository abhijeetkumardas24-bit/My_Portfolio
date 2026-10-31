import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Crosshair (+) marker — matches the reference screenshot ─────────────────
const Crosshair = ({
  size = 14,
  opacity = 0.32,
  style,
}: {
  size?: number;
  opacity?: number;
  style?: React.CSSProperties;
}) => (
  <span
    aria-hidden="true"
    style={{
      position: 'absolute',
      width: size,
      height: size,
      opacity,
      pointerEvents: 'none',
      ...style,
    }}
  >
    <span style={{
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: 1,
      transform: 'translateY(-50%)',
      background: 'var(--border-active)',
    }} />
    <span style={{
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      width: 1,
      transform: 'translateX(-50%)',
      background: 'var(--border-active)',
    }} />
  </span>
);

// ── Small square decorator ───────────────────────────────────────────────────
const TinySquare = ({
  size = 8,
  filled = false,
  color,
  opacity = 0.5,
  style,
}: {
  size?: number;
  filled?: boolean;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) => (
  <span
    aria-hidden="true"
    style={{
      position: 'absolute',
      width: size,
      height: size,
      opacity,
      pointerEvents: 'none',
      background: filled ? (color || 'var(--accent-primary)') : 'transparent',
      border: filled ? 'none' : `1.5px solid ${color || 'var(--border-active)'}`,
      borderRadius: '1px',
      ...style,
    }}
  />
);

// ── Code Window Preview Mockup (matches reference screenshot) ───────────────
const CodePreviewBox = () => (
  <div className="w-full h-[148px] rounded-xl bg-[#090d14]/90 border border-[#1b2535] p-5 shadow-xl flex flex-col justify-between">
    {/* Window dots */}
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#d4a373]/80" />
      <span className="w-2 h-2 rounded-full bg-[#d4a373]/80" />
      <span className="w-2 h-2 rounded-full bg-[#d4a373]/80" />
    </div>

    {/* Code-like lines */}
    <div className="flex flex-col gap-2.5 my-auto pl-1">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 border border-[#3b4b63] rounded-[1px] shrink-0" />
        <span className="h-1.5 w-16 bg-[#2d3b4e] rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 border border-[#3b4b63] rounded-[1px] shrink-0" />
        <span className="h-1.5 w-32 bg-[#c59b6d]/85 rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 border border-[#3b4b63] rounded-[1px] shrink-0" />
        <span className="h-1.5 w-44 bg-[#212f42] rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 border border-[#3b4b63] rounded-[1px] shrink-0" />
        <span className="h-1.5 w-24 bg-[#2d3b4e] rounded-full" />
      </div>
    </div>
  </div>
);

// ── Analytics / Chart Preview Mockup (matches reference screenshot) ──────────
const ChartPreviewBox = () => (
  <div className="w-full h-[148px] rounded-xl bg-[#090d14]/90 border border-[#1b2535] p-5 shadow-xl flex items-center justify-between">
    {/* Left: Bar Chart */}
    <div className="flex items-end gap-2.5 h-20 pb-1 border-b border-[#1b2434]/80 pr-6">
      <span className="w-2 h-7 rounded-t-[1px] bg-[#1c2b3e]" />
      <span className="w-2 h-14 rounded-t-[1px] bg-[#274872]" />
      <span className="w-2 h-9 rounded-t-[1px] bg-[#1c2b3e]" />
      <span className="w-2 h-18 rounded-t-[1px] bg-[#3c91f6]" />
      <span className="w-2 h-8 rounded-t-[1px] bg-[#1c2b3e]" />
      <span className="w-2 h-15 rounded-t-[1px] bg-[#c59b6d]" />
      <span className="w-2 h-11 rounded-t-[1px] bg-[#274872]" />
      <span className="w-2 h-16 rounded-t-[1px] bg-[#e2b383]" />
    </div>

    {/* Right: Bulleted Data Metric Lines */}
    <div className="flex flex-col justify-around h-20 pl-4 border-l border-[#1a2332]/80 flex-1">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d] shrink-0" />
        <span className="h-1.5 w-full max-w-[110px] bg-[#243346] rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3c91f6] shrink-0" />
        <span className="h-1.5 w-full max-w-[95px] bg-[#2b415a] rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4a5f78] shrink-0" />
        <span className="h-1.5 w-full max-w-[75px] bg-[#1d2938] rounded-full" />
      </div>
    </div>
  </div>
);

interface Project {
  id: string;
  title: string;
  badge?: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

const projectsList: Project[] = [
  {
    id: "01",
    title: "Resume Analyzer & Career Advisor",
    badge: "FEATURED",
    description:
      "Full-stack AI-driven ATS resume analyzer and career advising platform. Evaluates resumes against job descriptions to identify critical skill gaps, score keyword alignment, and deliver conversational recommendations with persistent session history.",
    tags: ["React", "FastAPI", "Gemini", "Supabase", "TailwindCSS"],
    githubUrl: "https://github.com/abhijeetkumardas24-bit/Resume-Analyzer",
    demoUrl: "https://resume-analyzer-black-three.vercel.app",
  },
  {
    id: "02",
    title: "PDF RAG Assistant with Topic Questions",
    badge: "RAG PIPELINE",
    description:
      "Full-stack local document intelligence application with ChromaDB and Hugging Face sentence transformers (all-MiniLM-L6-v2). Extracts text from multi-page PDFs, generates 5–8 document-specific suggested questions via Gemini, and delivers strictly grounded answers with source page citations.",
    tags: ["FastAPI", "ChromaDB", "Hugging Face", "Gemini", "Python"],
    githubUrl: "https://github.com/abhijeetkumardas24-bit/PDF_RAG_PROJECT",
    demoUrl: "https://github.com/abhijeetkumardas24-bit/PDF_RAG_PROJECT",
  },
  {
    id: "03",
    title: "Finance Agentic AI Assistant",
    badge: "MULTI-AGENT",
    description:
      "Multi-agent financial intelligence assistant engineered with the Agno framework and Groq-accelerated LLaMA-3.3-70B. Coordinates specialized autonomous agents with YFinance and DuckDuckGo tools to deliver real-time stock quotes, fundamental metrics, analyst ratings, and web news.",
    tags: ["Agno", "Groq", "LLaMA 3.3", "YFinance", "Python"],
    githubUrl: "https://github.com/abhijeetkumardas24-bit/FINANCE_AGENTIC_AI_PROJECT",
    demoUrl: "https://github.com/abhijeetkumardas24-bit/FINANCE_AGENTIC_AI_PROJECT",
  },
  {
    id: "04",
    title: "Financial Complaint Classification",
    badge: "89.15% ACCURACY",
    description:
      "Production-ready NLP classification system categorizing consumer financial complaints into product categories with 89.15% test accuracy. Implements an optimized TF-IDF vectorizer (250,000 n-gram features) paired with a tuned LinearSVC classifier and an interactive Streamlit dashboard.",
    tags: ["Scikit-Learn", "NLP", "LinearSVC", "Streamlit", "TF-IDF"],
    githubUrl: "https://github.com/abhijeetkumardas24-bit/complaint-classification",
    demoUrl: "https://github.com/abhijeetkumardas24-bit/complaint-classification",
  },
  {
    id: "05",
    title: "SMS & Email Spam Classifier",
    badge: "STACKING ENSEMBLE",
    description:
      "End-to-end NLP spam detection pipeline with 1-click live sample testing and real-time confidence scores. Features text preprocessing (tokenization, stopwords removal, Porter stemming) and a high-precision Stacking Ensemble model combining Naive Bayes, SVC, Extra Trees, and Random Forest.",
    tags: ["Python", "Streamlit", "Ensemble ML", "Scikit-Learn", "NLTK"],
    githubUrl: "https://github.com/abhijeetkumardas24-bit/SMS_SPAM_CLASSIFIER",
    demoUrl: "https://github.com/abhijeetkumardas24-bit/SMS_SPAM_CLASSIFIER",
  },
];

const Projects = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 w-full border-t border-[var(--border-hairline)] relative overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >

      {/* ── Exact geometric decorators matching the reference mockup ─────── */}
      {/* Top Left */}
      <Crosshair size={14} opacity={0.35} style={{ top: '10%', left: '3%' }} />
      <TinySquare size={8} filled color="#e2b383" style={{ top: '18%', left: '2%', opacity: 0.85 }} />

      {/* Near Title */}
      <TinySquare size={13} color="#2563eb" style={{ top: '13%', left: '29%', opacity: 0.7 }} />
      <Crosshair size={15} opacity={0.35} style={{ top: '24%', left: '33%' }} />

      {/* Between Code & Chart Preview Boxes */}
      <Crosshair size={15} opacity={0.35} style={{ top: '11%', left: '62%' }} />
      <TinySquare size={8} filled color="#2563eb" style={{ top: '16%', left: '66%', opacity: 0.85 }} />
      <TinySquare size={11} color="#c59b6d" style={{ top: '25%', left: '60%', opacity: 0.65 }} />

      {/* Left Margin flanking cards */}
      <TinySquare size={8} filled color="#2563eb" style={{ top: '35%', left: '2%', opacity: 0.85 }} />
      <TinySquare size={13} color="#c59b6d" style={{ top: '56%', left: '4%', opacity: 0.65 }} />
      <Crosshair size={15} opacity={0.35} style={{ top: '68%', left: '1.5%' }} />
      <TinySquare size={7} filled color="#2563eb" style={{ top: '88%', left: '10%', opacity: 0.75 }} />

      {/* Right Margin flanking cards */}
      <TinySquare size={9} color="#e2b383" style={{ top: '35%', right: '2.5%', opacity: 0.7 }} />
      <Crosshair size={15} opacity={0.35} style={{ top: '44%', right: '4%' }} />
      <TinySquare size={8} filled color="#e2b383" style={{ top: '78%', right: '4%', opacity: 0.85 }} />
      <Crosshair size={15} opacity={0.35} style={{ top: '86%', right: '7%' }} />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start relative z-10">

        {/* Top Header: 3-column layout matching reference screenshot */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-end mb-12">
          {/* Column 1: Heading & Navigation */}
          <div className="flex flex-col items-start text-left justify-between h-full">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold tracking-widest uppercase text-[var(--text-dim)] mb-2 block"
              >
                FEATURED WORK
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[var(--text-primary)]"
              >
                PROJECTS
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-sm text-[var(--text-secondary)] font-medium mt-1"
              >
                Slide horizontally to explore
              </motion.p>
            </div>
          </div>

          {/* Column 2: Code Editor Preview Box (hidden on smaller screens, matching reference on lg+) */}
          <div className="hidden lg:block">
            <CodePreviewBox />
          </div>

          {/* Column 3: Analytics / Chart Preview Box (hidden on smaller screens, matching reference on lg+) */}
          <div className="hidden lg:block">
            <ChartPreviewBox />
          </div>
        </div>

        {/* Horizontal Scrollable Carousel with side arrows */}
        <div className="w-full relative mt-2">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]/90 backdrop-blur hover:border-[var(--accent-primary)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95 cursor-pointer hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projectsList.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.1 }}
                className="snap-center shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] rounded-2xl p-7 md:p-8 bg-[var(--bg-card)] border border-[var(--border-hairline)] hover:border-[var(--border-active)] transition-all duration-300 flex flex-col justify-between min-h-[460px] shadow-lg group relative text-left"
              >
                {/* Top Section: Title & Optional Badge */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    {project.badge && (
                      <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-hairline)]">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-[15px] text-[var(--text-secondary)] font-normal leading-relaxed line-clamp-6">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Section: Hashtags and Direct Links */}
                <div className="flex flex-col gap-5 mt-6 pt-5 border-t border-[var(--border-hairline)]">
                  {/* Tags in Accent Blue */}
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-[var(--accent-primary)]">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-5 text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className="hover:text-[var(--accent-primary)] flex items-center gap-1 transition-colors"
                    >
                      View on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-11 h-11 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)]/90 backdrop-blur hover:border-[var(--accent-primary)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95 cursor-pointer hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Projects;
