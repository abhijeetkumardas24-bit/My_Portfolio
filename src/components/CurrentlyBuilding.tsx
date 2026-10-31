import { motion } from 'framer-motion';

const CurrentlyBuilding = () => {
  return (
    <section className="py-24 w-full border-t border-[var(--border-hairline)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full bg-[var(--bg-card)] border border-[var(--border-hairline)] text-[var(--text-primary)] rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden shadow-lg"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-dim)]">CURRENTLY BUILDING</span>
            <div className="flex items-center gap-2 bg-emerald-500/10 text-[var(--live-green)] border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
              <div className="w-2 h-2 rounded-full bg-[var(--live-green)] animate-pulse" />
              ACTIVE
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            RAG + GENAI <br className="hidden md:block"/> SYSTEMS
          </h2>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-3 relative z-10">
          <div className="flex justify-between text-xs font-bold text-[var(--text-dim)] uppercase">
            <span>Research</span>
            <span>Development</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--bg-elevated)] border border-[var(--border-hairline)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '65%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full bg-[var(--accent-primary)]"
            />
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2 font-medium">
            Developing scalable evaluation pipelines for Retrieval Augmented Generation architectures.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CurrentlyBuilding;
