"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { animations } from "@/core/AnimationEngine";
import { GameDemoCard } from "@/components/game/GameDemoCard";
import { FullStackEvolutionGame } from "@/components/game/FullStackEvolutionGame";

export function ProjectsModule() {
  const [filter, setFilter] = useState("ALL_SYSTEMS");
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 pt-12">
      {/* HEADER */}
      <motion.div variants={animations.slideLeft} initial="initial" animate="animate" className="flex flex-col md:flex-row md:justify-between md:items-end border-b-2 border-text-muted/20 pb-4 gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">02 // SYS_PROJECTS</h2>
          <div className="w-24 h-2 bg-text-primary mt-2" />
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-3">
          <a
            href="/Ranjith_Sai_Vadithya.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-wide border border-accent-primary/40 text-accent-primary px-3 py-2 hover:bg-accent-primary hover:text-white transition-colors"
          >
            Download Resume PDF
          </a>

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
        </div>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 0. PRAXO (ADVANCED VERSION) FLAGSHIP */}
        <motion.div 
          id="praxo"
          className="bg-surface-card border border-text-muted/20 p-6 md:p-8 flex flex-col hover:border-accent-energy transition-all duration-300 group cursor-pointer md:col-span-2 relative overflow-hidden"
          whileHover={{ y: -5, borderColor: '#06B6D4' }}
        >
          {/* Abstract Grid Background inside Card */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

          <div className="flex justify-between items-center mb-6 border-b border-text-muted/20 pb-4 relative z-10">
            <div>
               <div className="flex items-center gap-3">
                 <h3 className="font-black text-3xl uppercase tracking-tight text-text-primary">Praxo</h3>
                 <span className="font-mono text-[9px] bg-accent-energy text-black px-2 py-1 font-bold animate-pulse">LIVE_RUNTIME</span>
               </div>
               <span className="font-mono text-xs text-text-secondary mt-1 block">Creator Economy Platform (Advanced Version)</span>
            </div>
            <span className="font-mono text-xs bg-accent-energy/10 text-accent-energy px-3 py-1.5 font-bold border border-accent-energy/30">SYS.MICROSERVICES</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            {/* Tech & Specs Side */}
            <div className="flex-1">
               <p className="font-mono text-sm text-text-primary mb-4 leading-relaxed">
                 A high-scale, creator-driven social platform designed for performance-based earnings, real-time engagement tracking, and automated financial workflows mapped to banking protocols.
               </p>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                 <div>
                   <h4 className="font-mono text-[10px] text-text-muted mb-1 border-b border-text-muted/20 pb-1">DATABASE & CACHE</h4>
                   <ul className="text-text-secondary font-mono text-[11px] space-y-1">
                     <li>- MySQL (Persistent)</li>
                     <li>- Redis (Feed/Rate Limit)</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-mono text-[10px] text-text-muted mb-1 border-b border-text-muted/20 pb-1">FINANCIAL PIPELINE</h4>
                   <ul className="text-text-secondary font-mono text-[11px] space-y-1">
                     <li>- Automated Batch Payouts</li>
                     <li>- SFTP / IMPS / NEFT</li>
                   </ul>
                 </div>
               </div>

               <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                 <span className="bg-[#5382A1]/10 text-[#5382A1] border border-[#5382A1]/30 px-2 py-0.5">Java (Spring Boot)</span>
                 <span className="bg-[#61DAFB]/10 text-[#61DAFB] border border-[#61DAFB]/30 px-2 py-0.5">React.js</span>
                 <span className="bg-[#DC382D]/10 text-[#DC382D] border border-[#DC382D]/30 px-2 py-0.5">Redis</span>
                 <span className="bg-text-primary/10 text-text-primary border border-text-primary/30 px-2 py-0.5">Microservices</span>
               </div>
            </div>

            {/* Architecture Visualizer Side */}
            <div className="flex-[0.8] w-full bg-surface-dark border p-4 border-text-muted/10 relative flex flex-col justify-center gap-4">
               
               {/* Traffic Layer */}
               <div className="flex justify-between items-center bg-background-main border border-text-muted/20 p-2 font-mono text-[10px] text-center w-3/4 mx-auto relative z-10">
                 <span className="text-accent-energy">CLIENT_REQUESTS</span>
               </div>
               
               {/* Routing Nodes */}
               <div className="flex justify-around items-center w-full px-4 relative z-10">
                 <div className="w-px h-6 bg-text-muted/30 absolute -top-6 left-1/4" />
                 <div className="w-px h-6 bg-text-muted/30 absolute -top-6 left-1/2" />
                 <div className="w-px h-6 bg-text-muted/30 absolute -top-6 right-1/4" />
                 
                 <div className="bg-[#5382A1]/10 border border-[#5382A1]/50 p-2 font-mono text-[9px] text-[#5382A1]">FEED_SVC</div>
                 <div className="bg-[#5382A1]/10 border border-[#5382A1]/50 p-2 font-mono text-[9px] text-[#5382A1]">USER_SVC</div>
                 <div className="bg-[#5382A1]/10 border border-[#5382A1]/50 p-2 font-mono text-[9px] text-[#5382A1]">PAYOUT_SVC</div>
               </div>

               {/* Data Layer */}
               <div className="flex justify-between items-center gap-4 w-full mt-2 relative z-10">
                 {/* Redis */}
                 <div className="flex-1 bg-[#DC382D]/10 border border-[#DC382D]/30 p-2 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#DC382D]">REDIS_CACHE</span>
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#DC382D]" animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
                 </div>
                 {/* SFTP/Bank */}
                 <div className="flex-1 bg-text-primary/10 border border-text-primary/30 p-2 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-text-primary">BANK_SFTP</span>
                    <motion.div className="w-1.5 h-1.5 bg-text-primary" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                 </div>
               </div>
               
            </div>
          </div>
        </motion.div>

        {/* 1. PET CARE E-COMMERCE */}
        <motion.div 
          id="pet-ecommerce"
          className="bg-surface-card border border-text-muted/20 p-6 flex flex-col hover:border-accent-secondary transition-colors group cursor-pointer"
          whileHover={{ y: -5, borderColor: '#7C3AED' }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-text-muted/20 pb-2">
            <div>
               <h3 className="font-bold text-xl uppercase">Pet Care E-Comm</h3>
            </div>
            <span className="font-mono text-[10px] bg-accent-secondary/10 text-accent-secondary px-2 py-1 font-bold">SYS.COMMERCE</span>
          </div>
          
          <div className="flex-1 bg-[#1A1A24] w-full relative overflow-hidden flex items-center justify-center border-l-4 border-accent-secondary min-h-[120px] mb-4">
             {/* Circuit Layout using Violet */}
             <div className="relative w-full h-full border border-accent-secondary/30 flex justify-between items-center p-4">
               <div className="w-8 h-8 border-2 border-accent-secondary flex items-center justify-center">
                 <div className="w-2 h-2 bg-accent-secondary animate-pulse" />
               </div>
               <div className="flex-1 h-[1px] bg-accent-secondary/50 relative">
                  <motion.div className="w-1/3 h-[2px] bg-background-main shadow-[0_0_8px_#7C3AED] absolute top-[-0.5px]" animate={{ left: ["0%", "66%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
               </div>
               <div className="w-20 h-10 border-2 border-background-main bg-background-main/5 flex items-center justify-center text-background-main font-mono text-[8px] text-center">
                 RAZORPAY
               </div>
             </div>
          </div>

          <p className="font-mono text-xs text-text-secondary leading-relaxed mb-4 flex-1">
            Laravel e-commerce platform featuring smart variant/brand sorting, live inventory logic, and Razorpay integration.
          </p>
          <div className="flex gap-2 font-mono text-[10px] mt-auto">
            <span className="bg-[#FF2D20]/10 text-[#FF2D20] px-1">Laravel</span>
            <span className="bg-[#7952B3]/10 text-[#7952B3] px-1">Bootstrap</span>
          </div>
        </motion.div>

        {/* 2. PALLAKI EVENT SERVICE */}
        <motion.div 
          className="bg-surface-card border border-text-muted/20 p-6 flex flex-col hover:border-accent-energy transition-colors group cursor-pointer"
          whileHover={{ y: -5 }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-text-muted/20 pb-2">
            <h3 className="font-bold text-xl uppercase">Pallaki Event Service</h3>
            <span className="font-mono text-[10px] bg-accent-energy/10 text-accent-energy px-2 py-1 font-bold">SYS.PORTAL</span>
          </div>
          <div className="flex-1 bg-surface-dark w-full relative overflow-hidden flex flex-col items-center justify-center border-l-4 border-accent-energy mb-4 min-h-[120px]">
            <div className="font-mono text-background-main/80 text-[10px] flex gap-4 text-center">
               <div className="border border-background-main/20 p-2">USER_DASH</div>
               <div className="border border-background-main/20 p-2">VENDOR_DASH</div>
               <div className="border border-background-main/20 p-2">ADMIN_DASH</div>
            </div>
            <motion.div className="w-full h-[1px] bg-accent-energy mt-4" style={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }} />
          </div>
          <p className="font-mono text-xs text-text-secondary leading-relaxed mb-4 flex-1">
            An event service booking platform tracking real-time inquiries, leads, and services securely via restricted access roles.
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] mt-auto">
             <span className="bg-[#FF2D20]/10 text-[#FF2D20] px-1">Laravel</span>
             <span className="bg-[#61DAFB]/10 text-[#61DAFB] px-1">React.js</span>
          </div>
        </motion.div>

        {/* 3. RIDE WHEELS (ADVANCED VERSION) */}
        <motion.div 
          id="ridewheels"
          className="bg-surface-card border border-text-muted/20 p-6 md:p-8 flex flex-col hover:border-accent-primary transition-colors group cursor-pointer md:col-span-2 relative overflow-hidden"
          whileHover={{ y: -5, borderColor: '#2563EB' }}
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <div className="flex justify-between items-center mb-6 border-b border-text-muted/20 pb-4 relative z-10">
            <div>
               <div className="flex flex-wrap items-center gap-3">
                 <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tight text-text-primary">Ride Wheels</h3>
                 <span className="font-mono text-[9px] bg-[#25D366]/20 text-[#25D366] px-2 py-1 font-bold border border-[#25D366]/30 animate-pulse">WHATSAPP_BUS_API</span>
               </div>
               <span className="font-mono text-xs text-text-secondary mt-1 block">Vehicle Rental Ecosystem (Advanced Version)</span>
            </div>
            <span className="font-mono text-[10px] bg-accent-primary/10 text-accent-primary px-3 py-1.5 font-bold border border-accent-primary/30">SYS.API_ARCHITECTURE</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex-[1.2]">
               <p className="font-mono text-sm text-text-primary mb-4 leading-relaxed font-bold">
                 Engineered the complete robust Laravel API backend driving a multi-role rental ecosystem consumed concurrently by Web, iOS, and Android platforms.
               </p>
               
               <ul className="text-text-secondary font-mono text-[11px] space-y-2 ml-4 list-disc mb-6">
                 <li><strong className="text-accent-primary font-bold">Triple-Client Architecture:</strong> Designed core REST APIs powering React Web, iOS apps, and Android clients natively.</li>
                 <li><strong className="text-accent-primary font-bold">Automated Comms:</strong> Integrated WhatsApp Business API for instant booking, status alerts, and lifecycle triggers.</li>
                 <li><strong className="text-accent-primary font-bold">Financial Engine:</strong> Handled end-to-end Razorpay flows preventing double bookings, managing commissions, and processing SFTP bank payouts securely.</li>
                 <li><strong className="text-accent-primary font-bold">Multi-Role Control:</strong> Segmented platform auth isolating features securely for Renters, Vehicle Owners, and Admins.</li>
               </ul>

               <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                 <span className="bg-[#FF2D20]/10 text-[#FF2D20] border border-[#FF2D20]/30 px-2 py-0.5">Laravel APIs</span>
                 <span className="bg-[#38B2AC]/10 text-[#38B2AC] border border-[#38B2AC]/30 px-2 py-0.5">Tailwind CSS</span>
                 <span className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 px-2 py-0.5">WhatsApp API</span>
                 <span className="bg-text-primary/10 text-text-primary border border-text-primary/30 px-2 py-0.5">Mobile API Layer</span>
               </div>
            </div>

            <div className="flex-1 w-full bg-[#050505] border border-text-muted/10 relative overflow-hidden flex flex-col p-6 items-center justify-center min-h-[250px]">
               <div className="w-full flex justify-between items-center z-10 mb-8 max-w-xs px-2">
                 <div className="font-mono text-[9px] border p-2 bg-[#111] text-accent-primary border-accent-primary/50 text-center w-12 hover:bg-accent-primary hover:text-white transition-colors cursor-default">WEB<br/>APP</div>
                 <div className="font-mono text-[9px] border p-2 bg-[#111] text-accent-primary border-accent-primary/50 text-center w-12 hover:bg-accent-primary hover:text-white transition-colors cursor-default">iOS<br/>APP</div>
                 <div className="font-mono text-[9px] border p-2 bg-[#111] text-accent-primary border-accent-primary/50 text-center w-12 hover:bg-accent-primary hover:text-white transition-colors cursor-default">AND<br/>APP</div>
               </div>

               {/* Connector Lines down to Laravel Core */}
               <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[70%] max-w-[200px] h-10 border-x border-t border-accent-primary/30 z-0 border-dashed" />
               <div className="absolute top-[30%] left-1/2 w-px h-10 border-l border-accent-primary/30 z-0 border-dashed" />

               <div className="z-10 flex border-2 border-accent-primary bg-accent-primary/10 px-6 py-3 gap-4 items-center shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                 <span className="font-mono text-[10px] text-accent-primary font-black uppercase tracking-widest">Laravel Core APIs</span>
               </div>

               <div className="absolute bottom-[30%] left-1/2 w-px h-8 bg-accent-primary/80 z-10" />

               <div className="w-full flex justify-between items-center z-10 max-w-[200px] mt-8">
                  <div className="text-[8px] font-mono border border-[#FF2D20]/50 text-[#FF2D20] p-1.5 bg-[#111]">RAZORPAY</div>
                  <div className="text-[8px] font-mono border border-[#25D366]/50 text-[#25D366] p-1.5 bg-[#111]">WHATSAPP</div>
                  <div className="text-[8px] font-mono border border-text-primary/50 text-text-primary p-1.5 bg-[#111]">SFTP BANK</div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* 4. RIGHTWAY BIO PHARMA */}
        <motion.div 
          className="bg-surface-card border border-text-muted/20 p-6 flex flex-col hover:border-text-primary transition-colors group cursor-pointer"
          whileHover={{ y: -5 }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-text-muted/20 pb-2">
            <h3 className="font-bold text-xl uppercase">RightWay Bio Pharma</h3>
            <span className="font-mono text-[10px] bg-text-muted/10 px-2 py-1">SYS.COMMERCE</span>
          </div>
          <p className="font-mono text-xs text-text-secondary leading-relaxed mb-4 flex-1">
            Pharmaceutical e-commerce architecture allowing customers to query item stock, manage carts, and transmit secure product inquiries directly to DB.
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] mt-auto">
             <span className="bg-[#FF2D20]/10 text-[#FF2D20] px-1">Laravel Blade</span>
             <span className="bg-text-primary/10 text-text-primary px-1">MySQL</span>
          </div>
        </motion.div>

        {/* 5. ADMIN AUTOMATION SYSTEM (n8n + Telegram) */}
        <motion.div 
          id="n8n-bot"
          className="bg-surface-card border border-text-muted/20 p-6 flex flex-col hover:border-[#FF6E4A] transition-colors group cursor-pointer"
          whileHover={{ y: -5, borderColor: '#FF6E4A' }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-text-muted/20 pb-2">
            <h3 className="font-bold text-xl uppercase tracking-tighter">n8n Telegram Bot</h3>
            <span className="font-mono text-[10px] bg-[#FF6E4A]/10 text-[#FF6E4A] px-2 py-1 font-bold">SYS.AUTOMATION</span>
          </div>
          
          <div className="flex-1 w-full relative flex flex-col gap-4 items-center justify-center mb-4 min-h-[120px] bg-[#050505] border border-text-muted/10 p-4">
            
            <div className="flex w-full items-center justify-between z-10 font-mono text-[8px]">
               <div className="border border-[#111] bg-surface-dark px-1 py-3 text-center w-[50px]">
                 <span className="text-[#0088cc] font-bold">TG_BOT</span>
               </div>
               
               <div className="flex-1 h-[1px] bg-[#FF6E4A]/30 relative mx-1">
                 <motion.div className="w-1/2 h-[2px] bg-[#FF6E4A] absolute top-[-0.5px]" animate={{ left: ["0%", "50%"] }} transition={{ duration: 1.5, repeat: Infinity }} />
               </div>

               <div className="border border-[#FF6E4A]/50 bg-[#FF6E4A]/10 px-1 py-3 text-center w-[50px]">
                 <span className="text-[#FF6E4A] font-bold">n8n</span>
               </div>

               <div className="flex-1 h-[1px] bg-[#FF6E4A]/30 relative mx-1">
                 <motion.div className="w-1/2 h-[2px] bg-[#FF6E4A] absolute top-[-0.5px]" animate={{ left: ["0%", "50%"] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
               </div>

               <div className="border border-[#F29111]/30 bg-[#111] px-1 py-3 text-center w-[50px]">
                 <span className="text-[#F29111] font-bold">MySQL</span>
               </div>
            </div>

            {/* Chat bubble representation */}
            <div className="w-full flex justify-start mt-2">
              <div className="bg-[#0088cc]/10 border border-[#0088cc]/30 rounded-r-lg rounded-bl-lg px-3 py-1.5 font-mono text-[8px] text-[#0088cc]">
                {">"} Today: 42 bookings | ₹18,500
              </div>
            </div>

          </div>
          <p className="font-mono text-xs text-text-secondary leading-relaxed mb-4 flex-1">
            Built an admin automation layer using Telegram bots and n8n, enabling real-time SQL-driven reporting and reducing reliance on legacy dashboards.
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] mt-auto">
             <span className="bg-[#FF6E4A]/10 text-[#FF6E4A] border border-[#FF6E4A]/30 px-1">n8n</span>
             <span className="bg-[#0088cc]/10 text-[#0088cc] border border-[#0088cc]/30 px-1">Telegram API</span>
             <span className="bg-text-primary/10 text-text-primary border border-text-primary/30 px-1">Webhook</span>
          </div>
        </motion.div>

        {/* 6. ATAL INCUBATION CENTRE */}
        <motion.div 
          className="bg-surface-card border border-text-muted/20 p-6 flex flex-col hover:border-accent-success transition-colors group cursor-pointer md:col-span-2"
          whileHover={{ y: -5, borderColor: '#10B981' }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-text-muted/20 pb-2">
            <h3 className="font-bold text-2xl uppercase">Atal Incubation Centre</h3>
            <span className="font-mono text-[10px] bg-accent-success/10 text-accent-success px-2 py-1 font-bold">SYS.MANAGEMENT</span>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 w-full bg-surface-dark relative overflow-hidden flex flex-col items-center justify-center border-l-4 border-accent-success min-h-[150px] p-4">
               {/* Dashboard Node Graph */}
               <div className="w-full flex justify-between items-end h-20 border-b border-[#333] px-2">
                  <motion.div className="w-4 bg-accent-success/80" initial={{ height: "20%" }} whileInView={{ height: "60%" }} />
                  <motion.div className="w-4 bg-accent-success/50" initial={{ height: "20%" }} whileInView={{ height: "40%" }} />
                  <motion.div className="w-4 bg-accent-success" initial={{ height: "20%" }} whileInView={{ height: "90%" }} />
                  <motion.div className="w-4 bg-accent-success/30" initial={{ height: "20%" }} whileInView={{ height: "30%" }} />
                  <motion.div className="w-4 bg-accent-success/60" initial={{ height: "20%" }} whileInView={{ height: "70%" }} />
               </div>
               <span className="font-mono text-[8px] text-text-muted mt-2 uppercase tracking-widest">Startup Cohort Data Vis</span>
            </div>
            
            <div className="flex-1">
               <p className="font-mono text-xs font-bold text-white mb-2">Startup Support & Program Management Portal</p>
               <ul className="text-text-secondary font-mono text-xs space-y-1 ml-4 list-disc mb-4">
                 <li>Built dynamic portal showcasing startup support, activities, and success logic.</li>
                 <li>Admin system to publish notifications, upload encrypted PDFs, and program timelines.</li>
                 <li>Visual cohort charting modules visually mapping out incubated startups.</li>
                 <li>Automated email pipelines triggering announcements to subscribed startups.</li>
               </ul>
               <div className="flex gap-2 font-mono text-[10px]">
                 <span className="bg-[#FF2D20]/10 text-[#FF2D20] px-1">Laravel</span>
                 <span className="bg-[#7952B3]/10 text-[#7952B3] px-1">Bootstrap</span>
                 <span className="bg-[#F29111]/10 text-[#F29111] px-1">MySQL</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      <GameDemoCard
        title="The Full-Stack Evolution // Project Demo"
        description="Experience the playable project demo with desktop and mobile controls aligned to your portfolio design language."
        onPlay={() => setIsGameOpen(true)}
      />

      <FullStackEvolutionGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </div>
  );
}
