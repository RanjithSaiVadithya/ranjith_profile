"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { animations } from "@/core/AnimationEngine";

export function ProjectsModule() {
  const [filter, setFilter] = useState("ALL_SYSTEMS");

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 pt-12">
      {/* HEADER */}
      <motion.div variants={animations.slideLeft} initial="initial" animate="animate" className="flex flex-col md:flex-row md:justify-between md:items-end border-b-2 border-text-muted/20 pb-4 gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">02 // SYS_PROJECTS</h2>
          <div className="w-24 h-2 bg-text-primary mt-2" />
        </div>
        
        {/* Filter Console */}
        <div className="font-mono text-xs flex gap-4 text-text-secondary overflow-x-auto pb-2 md:pb-0">
          {["ALL_SYSTEMS", "MICROSERVICES", "FRONTEND", "FULLSTACK"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`hover:text-text-primary transition-colors ${filter === f ? "text-accent-energy font-bold border-b border-accent-energy" : ""} whitespace-nowrap`}
            >
              [{f}]
            </button>
          ))}
        </div>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* PROXO PROJECT */}
        <motion.div 
          className="bg-surface-card border border-text-muted/20 p-6 flex flex-col h-[400px] hover:border-surface-dark transition-colors group cursor-pointer"
          whileHover={{ y: -5 }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-text-muted/20 pb-2">
            <h3 className="font-bold text-xl uppercase">Praxo</h3>
            <span className="font-mono text-[10px] bg-text-muted/10 px-2 py-1">SYS.BACKEND</span>
          </div>
          <div className="flex-1 bg-surface-dark w-full relative overflow-hidden flex items-center justify-center border-l-4 border-accent-primary group-hover:border-accent-energy transition-colors">
            {/* Dark schematic */}
            <div className="font-mono text-background-main/50 text-[10px] grid grid-cols-3 gap-2 text-center">
               <div className="border border-background-main/20 p-2">NODE_SCORE</div>
               <div className="border border-background-main/20 p-2">SFTP/IMPS</div>
               <div className="border border-background-main/20 p-2">DB_SYNC</div>
            </div>
          </div>
          <p className="mt-4 font-mono text-sm text-text-secondary">Creator-driven social media platform with automated earning, scoring, and bank settlement workflows.</p>
        </motion.div>

        {/* RIDE WHEELS */}
        <motion.div 
          className="bg-surface-card border border-text-muted/20 p-6 flex flex-col h-[400px] hover:border-surface-dark transition-colors group cursor-pointer"
          whileHover={{ y: -5 }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-text-muted/20 pb-2">
            <h3 className="font-bold text-xl uppercase">Ride Wheels</h3>
            <span className="font-mono text-[10px] bg-text-muted/10 px-2 py-1">SYS.FULLSTACK</span>
          </div>
          <div className="flex-1 w-full relative flex gap-4 items-center justify-center">
            <div className="w-1/2 h-4/5 bg-background-secondary border border-text-muted/30 shadow-sm z-10 group-hover:translate-y-[-10px] transition-transform flex items-center justify-center font-mono text-xs font-bold text-text-muted">CLIENT</div>
            {/* Sync Line */}
            <div className="absolute top-1/2 left-1/4 w-1/2 h-[2px] bg-accent-primary z-0">
               <motion.div className="h-full w-4 bg-surface-card shadow-[0_0_8px_#2563EB]" animate={{ x: [0, 150, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
            </div>
            <div className="w-1/2 h-4/5 bg-surface-dark border-l-4 border-accent-primary z-10 group-hover:translate-y-[10px] transition-transform flex items-center justify-center font-mono text-xs font-bold text-background-main">SERVER</div>
          </div>
          <p className="mt-4 font-mono text-sm text-text-secondary">Dual-system vehicle rental architecture with real-time websocket sync.</p>
        </motion.div>

        {/* CELESTIORA HUB */}
        <motion.div 
          className="bg-surface-card border border-text-muted/20 p-6 flex flex-col h-[400px] hover:border-accent-secondary transition-colors group cursor-pointer md:col-span-2"
          whileHover={{ y: -5, borderColor: '#7C3AED' }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-text-muted/20 pb-2">
            <h3 className="font-bold text-xl uppercase">Pet Care E-Comm</h3>
            <span className="font-mono text-[10px] bg-accent-secondary/10 text-accent-secondary px-2 py-1 font-bold">SYS.COMMERCE</span>
          </div>
          <div className="flex-1 w-full bg-[#1A1A24] relative overflow-hidden flex items-center justify-center border-l-4 border-accent-secondary">
             {/* Circuit Layout using Violet */}
             <div className="relative w-full max-w-sm h-32 border border-accent-secondary/30 flex justify-between items-center p-8">
               <div className="w-12 h-12 border-2 border-accent-secondary flex items-center justify-center">
                 <div className="w-4 h-4 bg-accent-secondary animate-pulse" />
               </div>
               <div className="flex-1 h-[1px] bg-accent-secondary/50 relative">
                  <motion.div className="w-1/3 h-[3px] bg-background-main shadow-[0_0_10px_#7C3AED] absolute top-[-1px]" animate={{ left: ["0%", "66%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
               </div>
               <div className="w-24 h-16 border-2 border-background-main bg-background-main/5 flex items-center justify-center text-background-main font-mono text-[10px] text-center p-1">
                 RAZORPAY
               </div>
             </div>
          </div>
          <p className="mt-4 font-mono text-sm text-text-secondary">Full-scale e-commerce platform with real-time inventory, pricing logic, and online payments via Razorpay.</p>
        </motion.div>
      </div>
    </div>
  );
}
