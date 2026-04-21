"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function ProjectPreview() {
  const router = useRouter();

  const projects = [
    { title: "Praxo", stack: "Java Spring • Microservices", role: "Backend Architecture", desc: "Social media platform with automated creator earnings, scoring, and completely automated IMPS bank settlement systems." },
    { title: "Ride Wheels", stack: "Laravel • React.js", role: "Full Stack", desc: "Vehicle rental ecosystem featuring multi-level availability checks, scheduling, pricing algorithms, and admin approvals." },
    { title: "Pet Care E-Comm", stack: "Laravel • Razorpay", role: "Full Stack", desc: "End-to-end e-commerce platform processing dynamic pricing logic, smart product variations, and precise inventory." },
    { title: "Atal Incubation", stack: "Laravel • BootStrap", role: "Full Stack", desc: "Central program management portal servicing startups via document ingestion and scheduled email alert handlers." },
    { title: "Pallaki Events", stack: "Laravel • React.js", role: "Full Stack", desc: "Tri-panel platform actively orchestrating bookings, analytics, and service mapping for isolated vendor and user entities." },
    { title: "RightWay Bio Pharma", stack: "Laravel • MySQL", role: "Full Stack", desc: "Pharmaceutical catalog rendering dynamically managed products seamlessly across a lightweight custom CMS." }
  ];

  return (
    <div className="sticky top-0 h-[100dvh] w-full bg-[#050505] flex flex-col items-center justify-center relative shadow-[0_-20px_40px_rgba(0,0,0,0.9)] border-t-2 border-[#222] z-20">
      <div className="max-w-6xl w-full px-6 md:px-8">
        <div className="flex justify-between items-end mb-8 md:mb-12 pb-2 border-b-2 border-[#333]">
           <motion.h2 
             className="text-[#94a3b8] font-mono text-2xl md:text-4xl uppercase tracking-widest mb-8 md:mb-16 pb-2 border-b-2 border-surface-card"
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             02 // SYS_PROJECTS
           </motion.h2>
           <button onClick={() => router.push('/projects')} className="hidden md:block text-accent-energy font-mono text-xs hover:text-white transition-colors uppercase tracking-widest">
             [ VIEW_ALL_SYSTEMS ]
           </button>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-h-[65vh] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar pb-6">
            {projects.map((proj, i) => (
              <motion.div 
                key={proj.title}
                className="w-full bg-[#0a0a0a] border-2 border-[#1a1a1a] p-6 relative group cursor-pointer transition-colors hover:border-accent-primary flex flex-col justify-between min-h-[220px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => router.push('/projects')}
              >
                {/* Background Hover Glow */}
                <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="z-10 relative">
                   <div className="font-mono text-[10px] text-text-muted bg-white/5 inline-block px-2 py-1 mb-4 border border-[#333] group-hover:border-accent-primary/50 group-hover:text-accent-primary transition-colors">
                     {proj.stack}
                   </div>
                   
                   <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-accent-energy transition-colors">
                     {proj.title}
                   </h3>
                   
                   <p className="font-mono text-[#777] text-xs leading-relaxed line-clamp-3">
                     {proj.desc}
                   </p>
                </div>

                <div className="z-10 relative mt-6 w-full border-t border-[#222] pt-4 flex justify-between items-center group-hover:border-accent-primary/20 transition-colors">
                   <span className="font-mono text-[10px] text-[#444] uppercase">{proj.role}</span>
                   <span className="text-accent-energy font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                     INIT &rarr;
                   </span>
                </div>
              </motion.div>
            ))}
         </div>
         
         {/* Mobile view button fallback */}
         <div className="mt-6 w-full flex justify-center md:hidden">
           <button onClick={() => router.push('/projects')} className="text-accent-energy font-mono text-xs hover:text-white transition-colors uppercase tracking-widest border border-accent-energy/30 px-6 py-3 w-full">
             [ VIEW_ALL_SYSTEMS ]
           </button>
         </div>
      </div>
    </div>
  );
}
