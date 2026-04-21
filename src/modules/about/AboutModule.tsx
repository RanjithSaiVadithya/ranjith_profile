"use client";

import { motion } from "framer-motion";
import { animations } from "@/core/AnimationEngine";

export function AboutModule() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-24 pt-12">
      {/* HEADER */}
      <motion.div variants={animations.slideLeft} initial="initial" animate="animate">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">01 // ABOUT_ME</h2>
        <div className="w-24 h-2 bg-accent-primary" />
      </motion.div>

      {/* SEC 1: CAREER & ACADEMICS */}
      <section className="relative">
        <h3 className="font-mono text-xl font-bold uppercase mb-8 border-b-2 border-text-muted/20 pb-2">SEC_1: Career & Academics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Scan Line effect */}
          <motion.div 
            className="absolute left-0 w-full h-[2px] bg-accent-energy shadow-[0_0_10px_#06B6D4] z-10 pointer-events-none"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <div className="bg-surface-card border border-text-muted/20 p-6 relative overflow-hidden group">
            <div className="absolute top-2 right-2 bg-surface-dark text-background-main font-mono text-[10px] px-2 py-1 font-bold">ACTIVE</div>
            <h4 className="text-xl font-bold mb-2">Software Developer</h4>
            <p className="text-text-secondary font-mono text-sm">MudarDzApps Praxo // 08/2025 - Present</p>
            <div className="mt-4 border-t border-text-muted/20 pt-4 flex justify-between items-center text-sm font-mono text-text-muted">
              <span>ROLE: BACKEND/MICROSERVICES</span>
              <span className="text-accent-energy font-bold">SPRING BOOT</span>
            </div>
          </div>
          
          <div className="bg-surface-card border border-text-muted/20 p-6 relative overflow-hidden group">
            <div className="absolute top-2 right-2 bg-surface-dark text-background-main font-mono text-[10px] px-2 py-1 font-bold">VERIFIED</div>
            <h4 className="text-xl font-bold mb-2">Software Developer</h4>
            <p className="text-text-secondary font-mono text-sm">Spider Hit infotech // 05/2024 - 07/2025</p>
            <div className="mt-4 border-t border-text-muted/20 pt-4 flex justify-between items-center text-sm font-mono text-text-muted">
              <span>ROLE: FULL STACK</span>
              <span className="text-accent-success font-bold">LARAVEL/REACT</span>
            </div>
          </div>

          <div className="bg-surface-card border border-text-muted/20 p-6 relative overflow-hidden group md:col-span-2">
            <div className="absolute top-2 right-2 bg-text-muted text-background-main font-mono text-[10px] px-2 py-1 font-bold">GRADUATED</div>
            <h4 className="text-xl font-bold mb-2">B.Tech Electrical & Electronics Eng.</h4>
            <p className="text-text-secondary font-mono text-sm">Anatha Lakshmi Institute of Technology and Sciences // 2018 - 2022</p>
          </div>

        </div>
      </section>

      {/* SEC 2: PROXO SYSTEM DIAGRAM */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 border-b-2 border-text-muted/20 pb-2">SEC_2: Praxo Core Sys</h3>
        <div className="bg-background-secondary border border-text-muted/20 p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative">
          <div className="w-full md:w-1/3 bg-surface-dark text-background-main p-6 border-l-4 border-accent-primary">
            <h4 className="font-bold text-lg mb-2">CLIENT_PROXY</h4>
            <p className="text-xs font-mono text-text-muted">Distributing load across decentralized instances.</p>
          </div>
          
          <div className="hidden md:flex flex-1 items-center justify-center relative">
            <div className="w-full h-1 border-t-2 border-dashed border-text-muted relative">
              <motion.div 
                className="absolute top-[-3px] left-0 w-2 h-2 bg-accent-energy"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-surface-dark text-background-main p-6 border-r-4 border-accent-energy">
            <h4 className="font-bold text-lg mb-2">CORE_ROUTER</h4>
            <p className="text-xs font-mono text-text-muted">Process tracking & connection termination.</p>
          </div>
        </div>
      </section>

      {/* SEC 3: CELESTIORA */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 border-b-2 border-text-muted/20 pb-2">SEC_3: Celestiora Hub</h3>
        <div className="w-full min-h-[300px] bg-surface-dark flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-2">
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={i}
                className="border border-background-main/5 bg-background-main/5"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.9)", scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
          <motion.div 
            className="z-10 bg-background-main text-text-primary px-8 py-6 max-w-md border-b-4 border-accent-secondary"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-black text-2xl uppercase mb-2">Spider Hit Platform</h4>
            <p className="font-mono text-sm text-text-secondary">Delivering full-stack enterprise dashboards, modular APIs, and e-commerce scale solutions using Laravel & React.</p>
          </motion.div>
        </div>
      </section>

      {/* SEC 4: PHILOSOPHY */}
      <section className="mb-24">
        <div className="p-8 border-2 border-surface-dark bg-surface-card relative">
          <div className="absolute -top-3 left-4 bg-background-main px-2 font-mono text-sm font-bold text-surface-dark">
             &lt;PHILOSOPHY /&gt;
          </div>
          <p className="font-mono text-lg text-text-primary leading-relaxed">
            I don't just write code. I build <span className="bg-surface-dark text-background-main px-1 font-bold">ENGINES</span>. <br/><br/>
            I approach software architecture like mechanical engineering. Every microservice, state object, and database call is a gear in a larger system. It must be efficient, fault-tolerant, and exceptionally designed.
          </p>
          
          <button className="mt-8 px-6 py-3 bg-accent-primary text-surface-card font-bold font-mono tracking-widest uppercase hover:bg-surface-dark hover:text-background-main transition-colors border-2 border-transparent hover:border-accent-primary">
            INITIALIZE_CONTACT
          </button>
        </div>
      </section>

    </div>
  );
}
