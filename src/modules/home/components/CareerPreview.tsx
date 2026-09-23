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
             Nearly 3 years building production backends — REST APIs, microservices, personalized feeds, payment and payout workflows, caching, and performance troubleshooting.
           </p>

           <div className="flex flex-col gap-6 font-mono">
              <div className="border border-text-muted/20 p-6 bg-surface-card hover:-translate-y-2 transition-transform shadow-sm">
                <div className="text-xs text-text-muted mb-1">MudarDzApps Praxo // 08/2025 – Present</div>
                <div className="font-bold text-lg text-accent-energy mb-2">Software Engineer</div>
                <div className="text-sm text-text-secondary">
                  Java Spring Boot microservices for creator scoring, rewards, payouts, Redis-backed personalized feeds, and IMPS settlement workflows — cutting DB overhead by ~25%.
                </div>
              </div>
              
              <div className="border border-text-muted/20 p-6 bg-surface-card hover:-translate-y-2 transition-transform shadow-sm">
                <div className="text-xs text-text-muted mb-1">Spider Hit Infotech // 12/2023 – 07/2025</div>
                <div className="font-bold text-lg text-accent-primary mb-2">Software Developer</div>
                <div className="text-sm text-text-secondary">
                  Delivered 12+ enterprise and e-commerce apps with Laravel, MySQL, and React.js — auth, payments, bookings, and admin dashboards end to end.
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
                  &nbsp;&nbsp;role: <span className="text-accent-success">'Backend Engineer'</span>,<br/>
                  &nbsp;&nbsp;focus: <span className="text-accent-success">['Spring Boot', 'Redis']</span>,<br/>
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
