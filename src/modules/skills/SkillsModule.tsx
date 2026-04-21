"use client";

import { motion } from "framer-motion";
import { animations } from "@/core/AnimationEngine";

export function SkillsModule() {
  const languages = [
    { name: "Java", level: "90%", color: "border-accent-primary" },
    { name: "PHP", level: "85%", color: "border-accent-secondary" },
    { name: "JavaScript", level: "85%", color: "border-accent-energy" },
    { name: "MySQL", level: "80%", color: "border-text-primary" },
  ];

  const frameworks = ["Spring Boot", "Laravel", "React.js", "Microservices", "Tailwind CSS", "Bootstrap"];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-20 pt-12 relative">
      {/* Light Circuit Board Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[-1]" 
           style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, #0F172A 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* HEADER */}
      <motion.div variants={animations.slideLeft} initial="initial" animate="animate" className="border-b-2 border-text-muted/20 pb-4">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">03 // SYS_SKILLS</h2>
        <div className="w-24 h-2 bg-accent-success mt-2" />
      </motion.div>

      {/* LANGUAGES (PILLARS) */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 pb-2">SEC_1: Core Logic</h3>
        <div className="flex flex-col md:flex-row gap-4 h-64 items-end">
          {languages.map((lang, i) => (
            <div key={lang.name} className="flex-1 flex flex-col items-center group">
              <span className="font-mono text-xs font-bold mb-2 opacity-50 group-hover:opacity-100 transition-opacity">{lang.level}</span>
              <motion.div 
                className={`w-full bg-surface-dark border-t-4 ${lang.color} relative overflow-hidden`}
                initial={{ height: 0 }}
                whileInView={{ height: lang.level }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 20, delay: i * 0.1 }}
              >
                <div className="absolute bottom-2 w-full text-center font-mono text-xs text-background-main transform -rotate-90 origin-center whitespace-nowrap">
                  {lang.name}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* FRAMEWORKS (SLIDING BLOCKS) */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 pb-2">SEC_2: Framework Blocks</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {frameworks.map((fw, i) => (
            <motion.div 
              key={fw}
              className="bg-surface-card border-2 border-text-muted/20 p-4 font-mono font-bold text-center hover:bg-surface-dark hover:text-background-main transition-colors cursor-default"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {fw}
            </motion.div>
          ))}
        </div>
      </section>

      {/* API HUB */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 pb-2">SEC_3: API Connectivity</h3>
        <div className="relative w-full h-32 border border-text-muted/20 bg-background-secondary flex justify-between items-center px-12">
           <div className="w-16 h-16 bg-surface-dark text-background-main flex items-center justify-center font-bold text-xs shadow-md z-10">REST</div>
           <div className="flex-1 h-[2px] relative grid grid-cols-1 rows-1 place-items-center">
              <div className="absolute w-full h-full bg-accent-primary" />
              <div className="absolute w-full h-[4px] bg-accent-energy/30 animate-pulse delay-75" />
           </div>
           <div className="w-16 h-16 bg-surface-dark border-l-4 border-accent-secondary text-background-main flex items-center justify-center font-bold text-xs shadow-md z-10">GQL</div>
           <div className="flex-1 h-[2px] relative grid grid-cols-1 rows-1 place-items-center">
              <div className="absolute w-full h-full bg-accent-success" />
           </div>
           <div className="w-16 h-16 bg-surface-dark border-l-4 border-accent-energy text-background-main flex items-center justify-center font-bold text-xs shadow-md z-10">WSS</div>
        </div>
      </section>

      {/* TERMINAL HIGHLIGHT */}
      <section className="mb-24">
        <h3 className="font-mono text-xl font-bold uppercase mb-8 pb-2">SEC_4: Deployment</h3>
        <div className="bg-surface-dark rounded-none p-6 text-background-main font-mono text-sm max-w-4xl border-l-8 border-text-muted/50">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 bg-accent-energy rounded-full" />
            <div className="w-3 h-3 bg-accent-warning rounded-full" />
            <div className="w-3 h-3 bg-accent-success rounded-full" />
          </div>
          <div className="opacity-80">
            <p className="text-accent-success mb-2">&gt; docker-compose up -d --build</p>
            <p>Building core_api...</p>
            <p>Creating proxy_node...</p>
            <p className="text-accent-energy mt-2">SYS: All containers running successfully.</p>
            <p className="mt-4 animate-pulse">_</p>
          </div>
        </div>
      </section>

    </div>
  );
}
