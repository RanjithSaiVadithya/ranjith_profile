"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { animations } from "@/core/AnimationEngine";
import { User, Globe, ShieldCheck, Boxes, MessageCircle, CreditCard, BarChart3, MoreHorizontal, Database, Server, ArrowRight, ArrowDown, KeyRound, Reply } from "lucide-react";
import { GameDemoCard } from "@/components/game/GameDemoCard";
import { FullStackEvolutionGame } from "@/components/game/FullStackEvolutionGame";

export function SkillsModule() {
  const [isGameOpen, setIsGameOpen] = useState(false);
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
        <div className="w-full relative bg-surface-card border border-text-muted/20 p-4 md:p-8 overflow-hidden shadow-sm">
          <div className="border border-text-muted/25 rounded-2xl bg-background-secondary/30 p-4 md:p-6">
            <h4 className="text-lg md:text-3xl font-black text-center text-text-primary">
              Workflow System Design - Request to Response
            </h4>
            <p className="text-center text-[11px] md:text-sm text-text-secondary mt-2">
              One of my workflow system design patterns with a clear request-to-response path.
            </p>

            {/* Unified web-style topology for desktop + mobile */}
            <div className="mt-6 overflow-x-auto pb-2">
              <div className="min-w-[980px]">
              <div className="grid grid-cols-[1.1fr_auto_1fr_auto_2fr_auto_1fr_auto_1fr] gap-2 items-stretch">
                <div className="rounded-2xl border border-[#b8c7d9] bg-[#eef4fb] p-3">
                  <p className="font-bold text-[#234f7f] text-xs text-center">1. Users</p>
                  <div className="mt-3 space-y-2 text-[11px] text-text-primary">
                    <div className="flex items-center gap-2"><User size={14} /> Mobile / Web</div>
                    <div className="flex items-center gap-2"><User size={14} /> Admin / User</div>
                  </div>
                </div>
                <div className="flex items-center justify-center text-text-secondary"><ArrowRight size={16} /></div>
                <div className="rounded-2xl border border-[#e4d3a2] bg-[#fff7df] p-3">
                  <p className="font-bold text-[#8a6500] text-xs text-center">2. API Gateway</p>
                  <div className="mt-3 space-y-2 text-[11px] text-text-primary">
                    <div className="flex items-center gap-2"><ShieldCheck size={14} /> Auth</div>
                    <div className="flex items-center gap-2"><Globe size={14} /> Validate</div>
                    <div className="flex items-center gap-2"><ArrowRight size={14} /> Route</div>
                  </div>
                </div>
                <div className="flex items-center justify-center text-text-secondary"><ArrowRight size={16} /></div>
                <div className="rounded-2xl border border-[#c9b6de] bg-[#f7f1ff] p-3">
                  <p className="font-bold text-[#5b3b80] text-xs text-center">4. Microservices</p>
                  <div className="grid grid-cols-5 gap-1 mt-3 text-center text-[10px] text-text-primary">
                    <div className="bg-white border border-text-muted/20 rounded-lg p-1 flex flex-col items-center gap-1"><MessageCircle size={12} />Chat</div>
                    <div className="bg-white border border-text-muted/20 rounded-lg p-1 flex flex-col items-center gap-1"><CreditCard size={12} />Pay</div>
                    <div className="bg-white border border-text-muted/20 rounded-lg p-1 flex flex-col items-center gap-1"><BarChart3 size={12} />Stats</div>
                    <div className="bg-white border border-text-muted/20 rounded-lg p-1 flex flex-col items-center gap-1"><Server size={12} />Jobs</div>
                    <div className="bg-white border border-text-muted/20 rounded-lg p-1 flex flex-col items-center gap-1"><MoreHorizontal size={12} />More</div>
                  </div>
                  <div className="mt-3 rounded-lg bg-white/70 border border-text-muted/20 p-2 text-[10px] text-text-secondary text-center">
                    Independent services, easy scaling.
                  </div>
                </div>
                <div className="flex items-center justify-center text-text-secondary"><ArrowRight size={16} /></div>
                <div className="rounded-2xl border border-[#bfd8b8] bg-[#eef9eb] p-3">
                  <p className="font-bold text-[#2f6d22] text-xs text-center">5. Redis Cache</p>
                  <div className="mt-3 space-y-1 text-[11px] text-text-primary">
                    <div>Hit: return fast</div>
                    <div>Miss: read DB + update</div>
                  </div>
                </div>
                <div className="flex items-center justify-center text-text-secondary"><ArrowRight size={16} /></div>
                <div className="rounded-2xl border border-[#b8c7d9] bg-[#eef4fb] p-3">
                  <p className="font-bold text-[#234f7f] text-xs text-center">6. Database</p>
                  <div className="mt-3 space-y-1 text-[11px] text-text-primary">
                    <div className="flex items-center gap-2"><Database size={13} /> Persistent data</div>
                    <div>Users, msgs, payments, analytics</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr_auto_2.2fr_auto_1fr_auto_1fr] mt-2 items-center text-[11px] text-text-muted">
                <div />
                <div />
                <div className="text-center border-t border-dashed border-text-muted/50 pt-1 text-[10px]">Auth ↓</div>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div className="text-center border-t border-dashed border-text-muted/50 pt-1 text-[10px]">Return ↓</div>
              </div>

              <div className="grid grid-cols-[1fr_1fr_2.2fr_1fr_1fr] gap-3 mt-4 items-center">
                <div />
                <div className="rounded-xl border border-[#bfd8b8] bg-[#f3faef] p-3 text-center">
                  <p className="font-bold text-[#2f6d22] text-xs flex items-center justify-center gap-1"><KeyRound size={12} />3. Identity Provider</p>
                  <p className="text-[11px] text-text-secondary mt-1">Auth / token check</p>
                </div>
                <div className="rounded-xl border border-[#c1daef] bg-[#eef7ff] p-3 text-center">
                  <p className="font-bold text-[#2b5f88] text-xs flex items-center justify-center gap-1"><Reply size={12} />7. Response Back</p>
                  <p className="text-[11px] text-text-secondary mt-1">
                    DB → Service → Gateway → User
                  </p>
                </div>
                <div />
                <div />
              </div>

              <div className="mt-4 rounded-xl border border-text-muted/20 bg-white p-3">
                <div className="grid grid-cols-6 gap-2 text-center text-[10px] text-text-secondary">
                  <div className="font-semibold text-text-primary">Key</div>
                  <div>API Gateway entry</div>
                  <div>Service modularity</div>
                  <div>Redis speed</div>
                  <div>Persistent DB</div>
                  <div>Secure auth</div>
                </div>
              </div>
              </div>
            </div>
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

      <GameDemoCard
        title="The Full-Stack Evolution // Skill Challenge"
        description="Try the live mini-game built for this portfolio: defend system integrity, clear bugs, and unlock architecture rank upgrades."
        onPlay={() => setIsGameOpen(true)}
      />

      <FullStackEvolutionGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />

    </div>
  );
}
