"use client";

import { motion } from "framer-motion";

export function CareerPreview() {
  return (
    <div className="sticky top-0 h-[100dvh] w-full bg-background-main flex flex-col items-center justify-center relative overflow-hidden shadow-[0_-15px_30px_rgba(0,0,0,0.5)] text-text-primary">
       <div className="max-w-6xl w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         
         <div className="flex flex-col z-10">
           <motion.h2 
             className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             01 // CAREER
           </motion.h2>

           <p className="font-mono text-text-secondary text-sm md:text-base leading-relaxed mb-8 border-l-4 border-accent-primary pl-4">
             Delivered 12+ full-stack projects across e-commerce, admin dashboards, and enterprise platforms. Bringing backend architecture, REST API design, and clean scalable code to production environments.
           </p>

           <div className="flex flex-col gap-6 font-mono">
              <div className="border border-text-muted/20 p-6 bg-surface-card hover:-translate-y-2 transition-transform shadow-sm">
                <div className="text-xs text-text-muted mb-1">MudarDzApps Praxo // 2025 - Present</div>
                <div className="font-bold text-lg text-accent-energy mb-2">Software Developer (Microservices)</div>
                <div className="text-sm text-text-secondary">
                  Built creator workflow modules, scoring logic, grade-based earnings, and automated bank settlement systems using Java Spring Boot.
                </div>
              </div>
              
              <div className="border border-text-muted/20 p-6 bg-surface-card hover:-translate-y-2 transition-transform shadow-sm">
                <div className="text-xs text-text-muted mb-1">Spider Hit Infotech // 2024 - 2025</div>
                <div className="font-bold text-lg text-accent-primary mb-2">Software Developer (Full Stack)</div>
                <div className="text-sm text-text-secondary">
                  Delivered multi-panel admin CMS solutions and optimized e-commerce checkout flows using Laravel and React.js.
                </div>
              </div>
           </div>
         </div>

         {/* Abstract Workspace Visual */}
         <div className="hidden md:flex relative h-full w-full justify-center items-center">
            <div className="w-[300px] h-[400px] border-2 border-text-muted/20 bg-surface-card relative shadow-lg">
                <div className="absolute -left-8 top-12 w-24 h-24 bg-accent-primary/10 rounded-full blur-xl" />
                <div className="absolute -right-8 bottom-12 w-32 h-32 bg-accent-energy/10 rounded-full blur-xl" />
                
                <div className="w-full h-8 border-b-2 border-text-muted/20 flex gap-2 items-center px-4">
                  <div className="w-2 h-2 rounded-full bg-accent-warning" />
                  <div className="w-2 h-2 rounded-full bg-accent-primary" />
                </div>
                <div className="p-6 font-mono text-[10px] text-text-secondary leading-loose">
                  <span className="text-accent-primary">const</span> <span className="text-text-primary">developer</span> = {'{'} <br/>
                  &nbsp;&nbsp;role: <span className="text-accent-success">'Backend Architect'</span>,<br/>
                  &nbsp;&nbsp;focus: <span className="text-accent-success">['Spring', 'Laravel']</span>,<br/>
                  &nbsp;&nbsp;integrity: <span className="text-accent-primary">true</span><br/>
                  {'}'};
                  <br/><br/>
                  <div className="w-full h-px border-b border-dashed border-text-muted/30 my-4" />
                  &gt; Compiling modules...<br/>
                  &gt; Scalability checks passed.<br/>
                  <motion.div className="w-2 h-4 bg-text-primary inline-block mt-2" animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                </div>
            </div>
         </div>

       </div>
    </div>
  );
}
