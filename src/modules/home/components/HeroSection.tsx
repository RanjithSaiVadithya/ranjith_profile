"use client";

import { motion } from "framer-motion";
import { animations } from "@/core/AnimationEngine";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-start pt-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-black z-0">
      {/* Blueprint Grid Overlay #111 */}
      <div 
        className="absolute inset-0 pointer-events-none z-[-1]" 
        style={{ 
          backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }}
      />

      <motion.div 
        variants={animations.slam}
        initial="initial"
        animate="animate"
        className="w-full max-w-6xl z-10 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <div className="flex-1">
          <div className="mb-8 flex items-center gap-4">
            <div className="px-3 py-1 bg-[#111] text-accent-energy font-mono text-xs font-bold uppercase tracking-widest inline-block border-l-2 border-accent-energy">
              SYS.RUNNING // STATUS: ONLINE
            </div>
            <div className="h-px bg-[#111] w-24" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-none mb-2 mt-4 break-words">
            RANJITH SAI <br className="hidden md:block" /> VADITHYA.
          </h1>
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-accent-energy mb-6 md:mb-8 uppercase tracking-widest font-mono">
            &gt; Software Developer
          </h2>
          
          <p className="text-[#888] text-sm md:text-lg lg:text-xl font-mono max-w-2xl mb-8 md:mb-12 border-l-2 border-[#333] pl-4 md:pl-6 py-2">
            Hello. I am a backend and full-stack engineer with 2+ years of experience.<br/>
            &gt; Specializing in Microservices architectures and enterprise platforms.<br/>
            &gt; Initializing connection... OK.
          </p>

          {/* Minimal Monospace Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs border-y border-[#111] py-4 w-full md:w-3/4">
             <div>
                <div className="text-[#555] mb-1">LATENCY</div>
                <div className="text-white font-bold animate-pulse">12ms</div>
             </div>
             <div>
                <div className="text-[#555] mb-1">THREADS</div>
                <div className="text-white font-bold">16_ACTIVE</div>
             </div>
             <div>
                <div className="text-[#555] mb-1">OVERRIDE</div>
                <div className="text-accent-energy font-bold">GRANTED</div>
             </div>
          </div>
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <div className="hidden lg:flex w-[350px] h-[450px] border border-[#222] relative group overflow-hidden bg-[#050505] cursor-crosshair">
           {/* Cyber Borders */}
           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-energy z-30 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-accent-energy/30 pointer-events-none" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-energy z-30 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-accent-energy/30 pointer-events-none" />
           
           <div className="absolute inset-0 z-10 flex items-center justify-center">
              {/* Scanline Effect */}
              <motion.div 
                 className="absolute left-0 w-full h-[2px] bg-accent-energy/60 shadow-[0_0_15px_#00F2FF] z-40 pointer-events-none" 
                 animate={{ top: ["0%", "100%", "0%"] }} 
                 transition={{ duration: 5, repeat: Infinity, ease: "linear" }} 
              />
              
              {/* The Image (Always visible, dark theme matched) */}
              <Image 
                src="/dev_profile.png" 
                alt="Ranjith Sai" 
                fill
                priority
                className="object-cover z-20 pointer-events-none grayscale brightness-75 contrast-125 mix-blend-luminosity opacity-90"
              />
           </div>
        </div>
      </motion.div>

      {/* Cyan Mechanical Bounce Scroll Arrow */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] text-accent-energy uppercase tracking-widest z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>SCROLL</span>
        <motion.div 
          className="w-4 h-6 border-2 border-accent-energy flex justify-center p-1"
          animate={{ y: 10 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8, type: "spring", stiffness: 200, damping: 10 }}
        >
          <div className="w-1 h-1 bg-accent-energy rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
