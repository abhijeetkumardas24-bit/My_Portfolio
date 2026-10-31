import { motion } from 'framer-motion';

const experiences = [
  {
    year: "2026",
    title: "AI / GenAI Projects",
    location: "Personal & Academic",
    description: "Developing agentic AI systems, RAG evaluation platforms, and conversational AI career assistants using modern LLMs (Gemini, Groq, Llama).",
  },
  {
    year: "2025",
    title: "Machine Learning & Fundamentals",
    location: "NIST University",
    description: "Deep dive into machine learning algorithms, deep learning, NLP, and implementing practical models.",
  },
  {
    year: "2024",
    title: "Computer Science Engineering",
    location: "B.Tech Undergrad",
    description: "Started B.Tech CSE. Focused on data structures, algorithms, system design, and building full-stack applications.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 w-full border-t border-[var(--border-hairline)] relative">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row gap-12 md:gap-24">
        
        <div className="w-full md:w-1/4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-sm font-bold tracking-widest uppercase text-[var(--text-dim)] sticky top-32"
          >
            EXPERIENCE & TIMELINE
          </motion.h2>
        </div>
        
        <div className="w-full md:w-3/4 flex flex-col">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group relative flex flex-col md:flex-row gap-4 md:gap-12 py-10 border-t border-[var(--border-hairline)] first:border-0 hover:bg-[var(--bg-elevated)]/60 transition-colors duration-300 px-4 md:px-6 -mx-4 md:-mx-6 rounded-2xl cursor-default"
            >
              <div className="md:w-1/4">
                <span className="text-xl md:text-2xl font-black tracking-tight text-[var(--accent-primary)]">{exp.year}</span>
              </div>
              
              <div className="md:w-3/4 flex flex-col gap-3">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)]">{exp.title}</h3>
                <span className="text-sm font-bold tracking-widest uppercase text-[var(--text-dim)]">{exp.location}</span>
                
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="pt-4 text-[var(--text-secondary)] font-medium leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                <div className="w-8 h-8 rounded-full border border-[var(--border-hairline)] text-[var(--text-primary)] flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-[var(--bg-card)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
