"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate cat position based on scroll
  const catY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const events = [
    { year: "2018", text: "SYS.INIT: Electrical & Electronics Eng." },
    { year: "2022", text: "NODE.ACTIVE: B.Tech Graduated." },
    { year: "2024", text: "DEPLOY: Spider Hit Infotech Pvt Ltd." },
    { year: "2025", text: "SCALE: MudarDzApps Praxo (Microservices)." },
  ];

  return (
    <div ref={containerRef} className="relative w-full py-40 min-h-[150vh] flex justify-center bg-black overflow-hidden z-10">
      
      {/* Central White Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#222]">
        <motion.div 
          className="w-full bg-white origin-top"
          style={{ height: '100%', scaleY: scrollYProgress }}
        />
      </div>

      {/* Running Cat Tracker (SVG) */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        style={{ top: catY, marginTop: "-20px" }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00F2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,242,255,1)] bg-black rotate-90">
           <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1.1-3.48 0 0-1.9-6.42-.5-7 1.4-.58 4.6.26 6.4 2.26a8.55 8.55 0 0 1 2-.26Z"/>
           <path d="M10 13a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/>
        </svg>
      </motion.div>

      {/* Timeline Events Terminal Popouts */}
      <div className="w-full max-w-5xl relative">
         {events.map((ev, i) => {
           const isLeft = i % 2 === 0;
           return (
             <div 
                key={ev.year} 
                className={`flex w-full mt-32 relative ${isLeft ? 'justify-start' : 'justify-end'}`}
             >
                <motion.div 
                  className={`w-[40%] bg-black border border-[#333] p-6 shadow-[0_0_15px_rgba(0,0,0,1)] z-10 ${isLeft ? 'ml-8' : 'mr-8'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-20% 0px -20% 0px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="text-accent-energy font-mono text-xs mb-2 drop-shadow-[0_0_5px_rgba(0,242,255,0.5)]">[ {ev.year} ]</div>
                  <div className="text-white font-mono text-sm tracking-tight">&gt; {ev.text}</div>
                </motion.div>

                {/* Connecting branch line */}
                <div className={`absolute top-8 w-[10%] h-[2px] bg-[#333] ${isLeft ? 'right-[50%]' : 'left-[50%]'}`} />
             </div>
           );
         })}
      </div>

    </div>
  );
}
