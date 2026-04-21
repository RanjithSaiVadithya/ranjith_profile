"use client";

import { motion } from "framer-motion";
import { animations } from "@/core/AnimationEngine";

export function SkillsModule() {
  const backendSkills = [
    "Java Engine", "Spring Boot Framework", "Microservices Architecture", 
    "Laravel (PHP)", "RESTful API Integration", "Middleware Systems"
  ];

  const frontendSkills = [
    "React.js / Next.js", "JavaScript (ES6+)", "Tailwind CSS & Utility",
    "Framer Motion Physics", "HTML5 Semantics", "Responsive Layouts"
  ];

  const infrastructureSkills = [
    "MySQL Relational DB", "Query Optimization", "Razorpay Gateways",
    "SFTP/IMPS Pipelines", "Postman Testing", "Platform Analytics"
  ];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 pt-12 relative px-4 md:px-0">
      {/* Light Circuit Board Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[-1]" 
           style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, #0F172A 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* HEADER */}
      <motion.div variants={animations.slideLeft} initial="initial" animate="animate" className="border-b-2 border-text-muted/20 pb-4">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">03 // SYS_SKILLS</h2>
        <div className="w-24 h-2 bg-accent-primary mt-2" />
      </motion.div>

      {/* VISUAL NODE NETWORK: CORE SYSTEMS */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 pb-2 border-b border-text-muted/10">SEC_1: LOGIC NODES</h3>
        
        <div className="w-full relative bg-surface-card border border-text-muted/20 p-4 md:p-8 flex items-center justify-center overflow-hidden shadow-sm">
           {/* Responsive SVG ViewBox ensuring it scales globally without squishing items */}
           <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[21/9] flex items-center justify-center">
              
              {/* Central Core */}
              <div className="absolute z-20 w-16 h-16 md:w-24 md:h-24 bg-surface-dark border-4 border-background-main rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                 <span className="font-black text-white font-mono text-xs md:text-sm">CORE</span>
              </div>

              {/* Dynamic Connecting Lines Matrix */}
              <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <line x1="50" y1="50" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                 <line x1="50" y1="50" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                 <line x1="50" y1="50" x2="15" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                 <line x1="50" y1="50" x2="85" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                 <line x1="50" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
              </svg>

              {/* Floating Nodes positioned safely */}
              <motion.div 
                className="absolute z-10 top-[10%] left-[10%] md:top-[10%] md:left-[20%] bg-white border border-accent-primary p-2 md:p-3 shadow-md w-28 md:w-40 text-center"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, type: "spring" }}
              >
                <div className="text-[10px] md:text-xs font-mono font-bold text-background-main leading-tight">Java Spring</div>
                <div className="text-[8px] md:text-[10px] text-text-secondary mt-1">Microservices</div>
              </motion.div>

              <motion.div 
                className="absolute z-10 top-[10%] right-[10%] md:top-[10%] md:right-[20%] bg-white border border-accent-energy p-2 md:p-3 shadow-md w-28 md:w-40 text-center"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="text-[10px] md:text-xs font-mono font-bold text-background-main leading-tight">Laravel</div>
                <div className="text-[8px] md:text-[10px] text-text-secondary mt-1">MVC Framework</div>
              </motion.div>

              <motion.div 
                className="absolute z-10 bottom-[10%] left-[5%] md:bottom-[15%] md:left-[15%] bg-white border border-[#475569] p-2 md:p-3 shadow-md w-28 md:w-40 text-center"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="text-[10px] md:text-xs font-mono font-bold text-background-main leading-tight">MySQL Server</div>
                <div className="text-[8px] md:text-[10px] text-text-secondary mt-1">Optimization</div>
              </motion.div>

              <motion.div 
                className="absolute z-10 bottom-[10%] right-[5%] md:bottom-[15%] md:right-[15%] bg-white border border-accent-secondary p-2 md:p-3 shadow-md w-28 md:w-40 text-center"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="text-[10px] md:text-xs font-mono font-bold text-background-main leading-tight">React.js</div>
                <div className="text-[8px] md:text-[10px] text-text-secondary mt-1">UX & Context</div>
              </motion.div>

              <motion.div 
                className="absolute z-10 top-[45%] right-[0%] md:top-[45%] md:right-[5%] bg-white border border-[#111] p-2 md:p-3 shadow-md w-24 md:w-32 text-center hidden sm:block"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="text-[10px] md:text-xs font-mono font-bold text-background-main leading-tight">Linux</div>
                <div className="text-[8px] md:text-[10px] text-text-secondary mt-1">Servers</div>
              </motion.div>

           </div>
        </div>
      </section>

      {/* DETAILED TECH STACK ARSENAL */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 pb-2 border-b border-text-muted/10">SEC_2: TECHNICAL ARSENAL</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
           
           {/* BACKEND */}
           <div className="bg-surface-card border-t-4 border-accent-primary p-6">
              <h4 className="font-mono font-bold text-sm mb-4 border-b border-text-muted/20 pb-2 text-accent-primary">BACKEND_SYS</h4>
              <ul className="flex flex-col gap-3 font-mono text-xs text-text-secondary">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-primary" /> Java Spring Boot</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-primary" /> Microservices Architecture</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-primary" /> Laravel Framework</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-primary" /> PHP Core</li>
              </ul>
           </div>

           {/* FRONTEND */}
           <div className="bg-surface-card border-t-4 border-accent-energy p-6">
              <h4 className="font-mono font-bold text-sm mb-4 border-b border-text-muted/20 pb-2 text-accent-energy">FRONTEND_UI</h4>
              <ul className="flex flex-col gap-3 font-mono text-xs text-text-secondary">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-energy" /> React.js</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-energy" /> JavaScript (ES6+)</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-energy" /> HTML5 / CSS3</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-energy" /> WordPress Systems</li>
              </ul>
           </div>

           {/* DATA & TOOLS */}
           <div className="bg-surface-card border-t-4 border-[#94a3b8] p-6">
              <h4 className="font-mono font-bold text-sm mb-4 border-b border-text-muted/20 pb-2 text-[#94a3b8]">DATA & TOOLS</h4>
              <ul className="flex flex-col gap-3 font-mono text-xs text-text-secondary">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#94a3b8]" /> MySQL Database</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#94a3b8]" /> Git Version Control</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#94a3b8]" /> Postman Testing</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#94a3b8]" /> Linux CLI</li>
              </ul>
           </div>

           {/* ARCHITECTURE */}
           <div className="bg-surface-card border-t-4 border-accent-success p-6">
              <h4 className="font-mono font-bold text-sm mb-4 border-b border-text-muted/20 pb-2 text-accent-success">ARCHITECTURE</h4>
              <ul className="flex flex-col gap-3 font-mono text-xs text-text-secondary">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-success" /> REST API Development</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-success" /> Database Design</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-success" /> Payment Integrations</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent-success" /> Secure Payout Logic</li>
              </ul>
           </div>

        </div>
      </section>

      {/* API HUB */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 pb-2 border-b border-text-muted/10">SEC_3: CONNECTIVITY PROTOCOLS</h3>
        <div className="w-full relative py-12 px-4 md:px-12 border border-text-muted/20 bg-background-secondary overflow-hidden">
           
           {/* Line behind the blocks */}
           <div className="absolute top-[50%] left-0 w-full h-[2px] bg-text-muted/20 -translate-y-1/2 z-0" />

           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
             
             {/* REST */}
             <div className="flex flex-col items-center group cursor-default">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-dark text-background-main flex items-center justify-center font-bold text-sm md:text-base shadow-lg border-2 border-transparent group-hover:border-accent-primary transition-colors">REST</div>
               <span className="font-mono text-xs mt-4 mt-2 bg-white px-2 py-1 shadow-sm border border-text-muted/10">Entity APIs</span>
             </div>

             {/* GRAPHQL */}
             <div className="flex flex-col items-center group cursor-default">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-dark text-background-main flex items-center justify-center font-bold text-sm md:text-base shadow-lg border-2 border-transparent group-hover:border-accent-energy transition-colors">GQL</div>
               <span className="font-mono text-xs mt-4 mt-2 bg-white px-2 py-1 shadow-sm border border-text-muted/10">Dynamic Queries</span>
             </div>

             {/* WSS */}
             <div className="flex flex-col items-center group cursor-default">
               <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-dark text-background-main flex items-center justify-center font-bold text-sm md:text-base shadow-lg border-2 border-transparent group-hover:border-accent-success transition-colors">WSS</div>
               <span className="font-mono text-xs mt-4 mt-2 bg-white px-2 py-1 shadow-sm border border-text-muted/10">Real-Time Streams</span>
             </div>

           </div>
        </div>
      </section>

      {/* TERMINAL HIGHLIGHT */}
      <section className="mb-24">
        <h3 className="font-mono text-xl font-bold uppercase mb-8 pb-2 border-b border-text-muted/10">SEC_4: ENVIRONMENT DEPLOYMENT</h3>
        <div className="bg-surface-dark rounded-none p-4 md:p-8 text-background-main font-mono text-xs md:text-sm max-w-4xl border-l-8 border-accent-primary w-full overflow-x-auto custom-scrollbar shadow-2xl">
          <div className="flex gap-2 mb-6 border-b border-[#333] pb-4 w-full">
            <div className="w-3 h-3 bg-accent-warning rounded-full" />
            <div className="w-3 h-3 bg-accent-energy rounded-full" />
            <div className="w-3 h-3 bg-accent-success rounded-full" />
          </div>
          <div className="opacity-90">
            <p className="text-accent-success mb-3">&gt; root@system:~# ./deploy_architecture.sh</p>
            <p className="text-[#888] mb-1">Building java_core_ms...</p>
            <p className="text-[#888] mb-1">Creating laravel_api_node...</p>
            <p className="text-[#888] mb-1">Migrating relational schema to mysql_db_01...</p>
            <p className="text-[#888] mb-1">Booting react_frontend_ui...</p>
            <p className="text-accent-primary mt-4 mb-1">SYS: All containers running successfully across network grid.</p>
            <p className="text-accent-energy mb-1">SYS: Razorpay Handshake verified.</p>
            <p className="mt-4 animate-pulse text-white">_</p>
          </div>
        </div>
      </section>

    </div>
  );
}
