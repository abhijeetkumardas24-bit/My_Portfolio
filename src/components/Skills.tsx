import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "SQL", "C / C++"],
  },
  {
    title: "Frameworks & ML Stack",
    skills: ["LangChain", "LangGraph", "Scikit-learn", "Hugging Face"],
  },
  {
    title: "Backend & Infrastructure",
    skills: ["FastAPI", "Supabase"],
  },
  {
    title: "Tools & Data Stack",
    skills: ["Pandas / NumPy", "GitHub", "PostgreSQL", "Jupyter Notebook", "AWS SageMaker"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 w-full border-t border-[var(--border-hairline)] relative overflow-hidden bg-[#080B10] scroll-mt-24 sm:scroll-mt-28">
      {/* ─── Global Full-Width Technical Blueprint Grid & Ambient Glow ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle Technical Blueprint Grid */}
          <pattern id="skills-grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(165, 183, 207, 0.04)" strokeWidth="1" />
          </pattern>

          {/* Central Warm Ambient Radial Glow */}
          <radialGradient id="skills-warm-glow" cx="50%" cy="25%" r="50%">
            <stop offset="0%" stopColor="#D9C6AA" stopOpacity="0.12" />
            <stop offset="35%" stopColor="#D9C6AA" stopOpacity="0.03" />
            <stop offset="70%" stopColor="#3C91F6" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#080B10" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#skills-grid-pattern)" />
        <rect width="100%" height="100%" fill="url(#skills-warm-glow)" />
      </svg>

      {/* ─── Technical Illustrations SVG — Aligned to Section Content Container without Cutoff ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none flex justify-center overflow-hidden">
        <svg
          className="w-full max-w-[1440px] h-full"
          viewBox="0 0 1440 920"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Golden Drop Shadow Filter for Accents */}
            <filter id="gold-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#D9C6AA" floodOpacity="0.45" />
            </filter>
          </defs>

        {/* ─── Top-Right Large Dark Concentric Arc Sweeps ─── */}
        <g stroke="#28313D" strokeWidth="1.3" opacity="0.55">
          <circle cx="1460" cy="180" r="280" fill="none" />
          <circle cx="1460" cy="180" r="370" fill="none" />
          <circle cx="1460" cy="180" r="460" fill="none" />
        </g>

        {/* ─── Bottom-Left & Bottom-Right Corner Dark Concentric Arcs ─── */}
        <g stroke="#28313D" strokeWidth="1.2" opacity="0.5">
          <circle cx="-50" cy="850" r="260" fill="none" />
          <circle cx="-50" cy="850" r="330" fill="none" />
          <circle cx="1480" cy="880" r="280" fill="none" />
          <circle cx="1480" cy="880" r="360" fill="none" />
        </g>

        {/* ─── Interconnecting Dotted / Dashed Circuit Lines ─── */}
        <g stroke="#A5B7CF" strokeWidth="1" strokeDasharray="3 3" opacity="0.38">
          {/* Top route: Editor -> Cloud -> Server -> Database */}
          <path d="M 645 220 C 720 220, 755 145, 840 145" />
          <path d="M 850 155 C 850 185, 840 215, 875 215" />
          <path d="M 975 250 L 1000 250" />
          <path d="M 1105 250 L 1195 250 L 1195 235 L 1260 235" />
          <path d="M 1000 330 L 920 330 L 920 360" />

          {/* Bottom route: Chart -> Center Bus -> Gear -> File */}
          <path d="M 285 790 L 460 790 L 460 825 L 750 825 C 840 825, 870 790, 915 790" />
          <path d="M 935 790 C 975 790, 1010 810, 1055 810" />
          <path d="M 1105 810 C 1130 810, 1145 795, 1165 795" />
        </g>

        {/* ─── 1. TOP-LEFT: CODE BRACKETS < / > (Above SKILLS title) ─── */}
        <g transform="translate(95, 95)">
          {/* Grid intersection wires behind brackets */}
          <line x1="-55" y1="45" x2="165" y2="45" stroke="rgba(165, 183, 207, 0.08)" strokeWidth="1" />
          <line x1="45" y1="-30" x2="45" y2="120" stroke="rgba(165, 183, 207, 0.08)" strokeWidth="1" />

          {/* Glowing square node on left intersection */}
          <g transform="translate(-48, 37)">
            <rect x="0" y="0" width="15" height="15" rx="3.5" stroke="#D9C6AA" strokeWidth="1.5" fill="#080B10" filter="url(#gold-glow)" />
          </g>

          {/* Prominent Glowing < / > Brackets */}
          <g filter="url(#gold-glow)">
            {/* Left bracket < */}
            <path d="M 28 25 L 0 45 L 28 65" stroke="#D9C6AA" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Center slash / */}
            <path d="M 52 18 L 36 72" stroke="#D9C6AA" strokeWidth="3.4" strokeLinecap="round" fill="none" />
            {/* Right bracket > */}
            <path d="M 60 25 L 88 45 L 60 65" stroke="#D9C6AA" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>

          {/* Horizontal skeleton preview dashes to the right of brackets */}
          <line x1="110" y1="35" x2="155" y2="35" stroke="#A5B7CF" strokeWidth="1.3" opacity="0.4" />
          <line x1="110" y1="45" x2="175" y2="45" stroke="#A5B7CF" strokeWidth="1.3" opacity="0.4" />
          <line x1="110" y1="55" x2="145" y2="55" stroke="#A5B7CF" strokeWidth="1.3" opacity="0.4" />
        </g>

        {/* ─── 2. TOP-CENTER-LEFT: 3D ANGLED PERSPECTIVE CODE WINDOW (Above Card 2) ─── */}
        <g transform="translate(390, 105)">
          {/* Angled Perspective Window Polygon */}
          <polygon
            points="0,15 240,42 240,225 0,198"
            fill="#0C1017"
            fillOpacity="0.85"
            stroke="#3A4758"
            strokeWidth="1.5"
          />
          {/* Angled header divider line */}
          <line x1="0" y1="36" x2="240" y2="63" stroke="#28313D" strokeWidth="1.2" />

          {/* Window header dots */}
          <circle cx="16" cy="27" r="2.2" fill="#A5B7CF" opacity="0.75" />
          <circle cx="27" cy="28.2" r="2.2" fill="#A5B7CF" opacity="0.75" />
          <circle cx="38" cy="29.4" r="2.2" fill="#A5B7CF" opacity="0.75" />

          {/* Code Skeleton Lines following angled slope */}
          <line x1="18" y1="58" x2="95" y2="67" stroke="#D9C6AA" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
          <line x1="38" y1="78" x2="145" y2="90" stroke="#A5B7CF" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
          <line x1="38" y1="98" x2="120" y2="107" stroke="#A5B7CF" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
          <line x1="18" y1="118" x2="80" y2="125" stroke="#D9C6AA" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          <line x1="38" y1="138" x2="165" y2="152" stroke="#A5B7CF" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
          <line x1="38" y1="158" x2="110" y2="166" stroke="#A5B7CF" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
          <line x1="18" y1="178" x2="32" y2="179.5" stroke="#D9C6AA" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />

          {/* Secondary right-hand code block */}
          <line x1="150" y1="80" x2="195" y2="85" stroke="#A5B7CF" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
          <line x1="150" y1="98" x2="185" y2="102" stroke="#A5B7CF" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
          <line x1="150" y1="116" x2="205" y2="122" stroke="#A5B7CF" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
        </g>

        {/* Small floating square chip beside code window */}
        <g transform="translate(710, 255)">
          <rect x="0" y="0" width="15" height="15" rx="3.5" stroke="#D9C6AA" strokeWidth="1.3" fill="#080B10" filter="url(#gold-glow)" />
        </g>

        {/* ─── 3. TOP-CENTER: CLOUD INFRASTRUCTURE (Above Card 3) ─── */}
        <g transform="translate(830, 140)">
          {/* Floating glowing golden chip on upper bus */}
          <g transform="translate(10, -5)">
            <rect x="0" y="0" width="16" height="16" rx="4" stroke="#D9C6AA" strokeWidth="1.4" fill="#080B10" filter="url(#gold-glow)" />
          </g>

          {/* Cloud Outline Icon */}
          <path
            d="M 32 82 C 12 82, 0 66, 8 46 C 2 24, 24 4, 46 8 C 60 -15, 102 -13, 118 7 C 138 0, 162 18, 158 40 C 174 50, 170 82, 146 82 Z"
            stroke="#A5B7CF"
            strokeWidth="1.6"
            fill="#0F141D"
            fillOpacity="0.45"
            opacity="0.85"
          />
        </g>

        {/* ─── 4. TOP-CENTER-RIGHT: 3-TIER SERVER RACK ─── */}
        <g transform="translate(995, 175)">
          {/* Server 1 */}
          <rect x="0" y="0" width="102" height="32" rx="6" stroke="#3A4758" strokeWidth="1.4" fill="#0E131C" fillOpacity="0.85" />
          <circle cx="16" cy="16" r="2.2" fill="#D9C6AA" filter="url(#gold-glow)" />
          <circle cx="28" cy="16" r="2.2" fill="#D9C6AA" opacity="0.6" />

          {/* Server 2 */}
          <rect x="0" y="44" width="102" height="32" rx="6" stroke="#3A4758" strokeWidth="1.4" fill="#0E131C" fillOpacity="0.85" />
          <circle cx="16" cy="60" r="2.2" fill="#D9C6AA" filter="url(#gold-glow)" />
          <circle cx="28" cy="60" r="2.2" fill="#D9C6AA" opacity="0.6" />

          {/* Server 3 */}
          <rect x="0" y="88" width="102" height="32" rx="6" stroke="#3A4758" strokeWidth="1.4" fill="#0E131C" fillOpacity="0.85" />
          <circle cx="16" cy="104" r="2.2" fill="#D9C6AA" filter="url(#gold-glow)" />
          <circle cx="28" cy="104" r="2.2" fill="#D9C6AA" opacity="0.6" />
        </g>

        {/* Golden Node on line between servers and database */}
        <circle cx="1195" cy="250" r="4" fill="#D9C6AA" filter="url(#gold-glow)" />

        {/* ─── 5. FAR TOP-RIGHT: 3D CYLINDRICAL DATABASE (Above Card 4) ─── */}
        <g transform="translate(1285, 175)">
          {/* Top disc cap */}
          <ellipse cx="50" cy="20" rx="48" ry="17" stroke="#D9C6AA" strokeWidth="1.8" fill="#121822" fillOpacity="0.85" />
          <ellipse cx="50" cy="20" rx="35" ry="12" stroke="#D9C6AA" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" fill="none" />

          {/* Middle tier */}
          <path d="M 2 20 L 2 56 C 2 73, 98 73, 98 56 L 98 20" stroke="#D9C6AA" strokeWidth="1.8" fill="#121822" fillOpacity="0.6" />
          <ellipse cx="50" cy="56" rx="48" ry="16" stroke="#D9C6AA" strokeWidth="1.2" opacity="0.7" fill="none" />

          {/* Bottom tier */}
          <path d="M 2 56 L 2 92 C 2 109, 98 109, 98 92 L 98 56" stroke="#D9C6AA" strokeWidth="1.8" fill="#121822" fillOpacity="0.6" />
          <ellipse cx="50" cy="92" rx="48" ry="16" stroke="#D9C6AA" strokeWidth="1.2" opacity="0.7" fill="none" />
        </g>

        {/* ─── 6. BOTTOM-LEFT: PERSPECTIVE TILTED ANALYTICS BAR CHART (Under Card 1) ─── */}
        <g transform="translate(130, 745)">
          {/* Angled Window Outline (Slanted / Perspective) */}
          <polygon
            points="0,18 165,0 165,115 0,133"
            fill="#0C1017"
            fillOpacity="0.85"
            stroke="#3A4758"
            strokeWidth="1.5"
          />
          {/* Slanted baseline */}
          <line x1="12" y1="112" x2="152" y2="97" stroke="#28313D" strokeWidth="1.2" />

          {/* 5 Vertical Bar Columns following perspective */}
          {/* Bar 1 */}
          <polygon points="18,88 32,86 32,110 18,111" stroke="#A5B7CF" strokeWidth="1.2" opacity="0.45" fill="none" />
          {/* Bar 2 */}
          <polygon points="44,72 58,70 58,107 44,108" stroke="#A5B7CF" strokeWidth="1.2" opacity="0.65" fill="none" />
          {/* Bar 3 */}
          <polygon points="70,55 84,53 84,104 70,105" stroke="#D9C6AA" strokeWidth="1.4" opacity="0.8" fill="none" />
          {/* Bar 4 */}
          <polygon points="96,75 110,73 110,101 96,102" stroke="#A5B7CF" strokeWidth="1.2" opacity="0.65" fill="none" />
          {/* Bar 5 (Tallest with glow) */}
          <polygon points="122,38 136,36 136,98 122,99" stroke="#D9C6AA" strokeWidth="1.6" filter="url(#gold-glow)" fill="none" />
        </g>

        {/* ─── 7. BOTTOM-CENTER: GLOWING CHIPS ON BUS (Under Card 2 & 3) ─── */}
        {/* Chip near chart exit */}
        <g transform="translate(452, 817)">
          <rect x="0" y="0" width="16" height="16" rx="3.5" stroke="#D9C6AA" strokeWidth="1.5" fill="#080B10" filter="url(#gold-glow)" />
        </g>
        {/* Central glowing chip under Card 3 */}
        <g transform="translate(907, 782)">
          <rect x="0" y="0" width="18" height="18" rx="4" stroke="#D9C6AA" strokeWidth="1.5" fill="#080B10" filter="url(#gold-glow)" />
        </g>

        {/* ─── 8. BOTTOM-RIGHT: MECHANICAL GEAR & DOCUMENT BLUEPRINT (Under Card 4) ─── */}
        {/* Mechanical Cog / Gear Icon */}
        <g transform="translate(1080, 810)" stroke="#A5B7CF" strokeWidth="1.5" opacity="0.75" fill="none">
          <circle cx="0" cy="0" r="11" />
          <circle cx="0" cy="0" r="22" strokeWidth="2.2" />
          {/* 8 outer teeth */}
          <rect x="-4.5" y="-31" width="9" height="9" rx="1.5" fill="#080B10" stroke="#A5B7CF" strokeWidth="1.4" />
          <rect x="-4.5" y="22" width="9" height="9" rx="1.5" fill="#080B10" stroke="#A5B7CF" strokeWidth="1.4" />
          <rect x="-31" y="-4.5" width="9" height="9" rx="1.5" fill="#080B10" stroke="#A5B7CF" strokeWidth="1.4" />
          <rect x="22" y="-4.5" width="9" height="9" rx="1.5" fill="#080B10" stroke="#A5B7CF" strokeWidth="1.4" />
          <rect x="-23" y="-23" width="9" height="9" rx="1.5" transform="rotate(45, -18.5, -18.5)" fill="#080B10" stroke="#A5B7CF" strokeWidth="1.4" />
          <rect x="14" y="14" width="9" height="9" rx="1.5" transform="rotate(45, 18.5, 18.5)" fill="#080B10" stroke="#A5B7CF" strokeWidth="1.4" />
          <rect x="-23" y="14" width="9" height="9" rx="1.5" transform="rotate(-45, -18.5, 18.5)" fill="#080B10" stroke="#A5B7CF" strokeWidth="1.4" />
          <rect x="14" y="-23" width="9" height="9" rx="1.5" transform="rotate(-45, 18.5, -18.5)" fill="#080B10" stroke="#A5B7CF" strokeWidth="1.4" />
        </g>

        {/* Document File Blueprint with folded corner */}
        <g transform="translate(1180, 765)">
          <path d="M 0 0 L 46 0 L 68 22 L 68 95 L 0 95 Z" stroke="#3A4758" strokeWidth="1.5" fill="#0E131C" fillOpacity="0.85" />
          <path d="M 46 0 L 46 22 L 68 22" stroke="#3A4758" strokeWidth="1.5" fill="none" />
          <line x1="12" y1="36" x2="48" y2="36" stroke="#D9C6AA" strokeWidth="1.4" opacity="0.6" />
          <line x1="12" y1="50" x2="56" y2="50" stroke="#A5B7CF" strokeWidth="1.2" opacity="0.35" />
          <line x1="12" y1="64" x2="42" y2="64" stroke="#A5B7CF" strokeWidth="1.2" opacity="0.35" />
          <line x1="12" y1="78" x2="52" y2="78" stroke="#A5B7CF" strokeWidth="1.2" opacity="0.35" />
        </g>
      </svg>
      </div>

      {/* ─── Foreground Content ─── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start relative z-10">
        
        {/* Left-Aligned Main Section Heading with Underline Accent */}
        <div className="flex flex-col items-start text-left mb-12 sm:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-[var(--text-dim)] mb-2"
          >
            TECHNICAL CAPABILITIES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-[var(--text-primary)]"
          >
            SKILLS
          </motion.h2>
          {/* Underline accent bar */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '56px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="h-1 bg-[var(--text-primary)] rounded-full mt-3"
          />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {skillCategories.map((category, colIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: colIdx * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -6, 
                transition: { duration: 0.25, ease: "easeOut" } 
              }}
              className="group relative rounded-2xl p-7 md:p-8 bg-[#11161D] border border-[var(--border-hairline)] hover:border-[#3C91F6]/50 transition-all duration-300 shadow-xl flex flex-col cursor-default overflow-hidden text-left min-h-[300px]"
            >
              {/* Subtle top accent highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3C91F6]/0 to-transparent group-hover:via-[#3C91F6]/80 transition-all duration-500" />

              {/* Category Header */}
              <h3 className="font-sans text-[var(--text-primary)] font-bold text-base md:text-lg tracking-tight mb-6 group-hover:text-[#3C91F6] transition-colors duration-300">
                {category.title}
              </h3>

              {/* Skills List with Vibrant Blue Bullets */}
              <ul className="flex flex-col gap-3.5">
                {category.skills.map((skill) => (
                  <li 
                    key={skill} 
                    className="text-sm md:text-[15px] font-medium text-[var(--text-primary)]/85 group-hover:text-[var(--text-primary)] transition-colors flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#3C91F6] flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
