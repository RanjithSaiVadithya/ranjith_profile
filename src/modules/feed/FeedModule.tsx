"use client";

import { motion } from "framer-motion";
import { animations } from "@/core/AnimationEngine";

export function FeedModule() {
  const blogs = [
    { title: "Building a High-Performance Redis Clone in Go", date: "2026.04.18" },
    { title: "Escaping the DOM: Writing a Custom Renderer", date: "2026.03.22" },
  ];

  const categories = ["ARCHITECTURE", "PERFORMANCE", "UI/UX", "DEVOPS", "SYSTEMS"];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 pt-12 pb-32">
      
      {/* HEADER */}
      <motion.div variants={animations.slideLeft} initial="initial" animate="animate" className="border-b-2 border-text-muted/20 pb-4">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">04 // OUTBOX_FEED</h2>
        <div className="w-24 h-2 bg-accent-warning mt-2" />
      </motion.div>

      {/* BB NEWS (VIOLET STRIP) */}
      <motion.div 
        className="w-full bg-accent-secondary text-background-main font-mono text-sm font-bold uppercase tracking-widest py-3 px-6 shadow-sm border-l-8 border-surface-dark flex items-center justify-between"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
      >
        <span>&gt;&gt; LATEST_BROADCAST</span>
        <span className="animate-pulse">V2.0 SYSTEM is LIVE.</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* MAIN COLUMN (BLOGS & POLLS) */}
        <div className="md:col-span-2 flex flex-col gap-12">
          
          {/* BLOGS */}
          <section>
             <h3 className="font-mono font-bold uppercase mb-6 text-xl">Transmissions</h3>
             <div className="flex flex-col gap-4">
               {blogs.map((blog, i) => (
                 <motion.div 
                   key={blog.title}
                   className="bg-surface-card border border-text-muted/20 p-6 shadow-sm hover:border-surface-dark transition-colors cursor-pointer group"
                   variants={animations.slideLeft}
                   initial="initial"
                   whileInView="animate"
                   viewport={{ once: true }}
                 >
                   <div className="text-text-muted font-mono text-xs mb-2">{blog.date}</div>
                   <h4 className="text-xl font-bold group-hover:text-accent-primary transition-colors">{blog.title}</h4>
                   <div className="w-0 h-0.5 bg-accent-primary mt-4 group-hover:w-full transition-all duration-300" />
                 </motion.div>
               ))}
             </div>
          </section>

          {/* POLL */}
          <section>
             <div className="bg-surface-card border border-text-muted/20 p-6 shadow-sm">
               <h4 className="font-bold mb-4 uppercase">System Poll: Next Architecture?</h4>
               <div className="flex flex-col gap-3 font-mono text-sm font-bold">
                 <div className="relative h-8 flex items-center px-4 z-10 w-full overflow-hidden border border-text-muted/20">
                   <motion.div 
                     className="absolute inset-0 bg-accent-primary opacity-20 -z-10"
                     initial={{ width: 0 }}
                     whileInView={{ width: "65%" }}
                     viewport={{ once: true }}
                   />
                   <span className="flex-1">Microservices (gRPC)</span>
                   <span>65%</span>
                 </div>
                 <div className="relative h-8 flex items-center px-4 z-10 w-full overflow-hidden border border-text-muted/20">
                   <motion.div 
                     className="absolute inset-0 bg-accent-energy opacity-20 -z-10"
                     initial={{ width: 0 }}
                     whileInView={{ width: "35%" }}
                     viewport={{ once: true }}
                   />
                   <span className="flex-1">Monolith (Modular)</span>
                   <span>35%</span>
                 </div>
               </div>
             </div>
          </section>
        </div>

        {/* SIDE COLUMN */}
        <div className="flex flex-col gap-12">
          
          {/* CATEGORIES */}
          <section>
            <h3 className="font-mono font-bold uppercase mb-6 text-xl">INDEX</h3>
            <div className="grid grid-cols-1 gap-2 border-l-2 border-text-muted/20 pl-4">
              {categories.map((cat) => (
                <div key={cat} className="group relative bg-surface-card px-3 py-2 cursor-pointer uppercase font-mono text-xs font-bold text-text-secondary hover:text-text-primary hover:-translate-x-2 transition-transform shadow-sm">
                   {cat}
                </div>
              ))}
            </div>
          </section>

          {/* COMMENTS TERMINAL */}
          <section>
            <div className="bg-surface-dark border-t-4 border-accent-warning text-background-main p-4 font-mono text-xs">
              <div className="text-text-muted mb-2">GUEST_LOGS</div>
              <div className="opacity-80">
                <p><span className="text-accent-energy">User102:</span> Fast load time!</p>
                <p><span className="text-accent-energy">DevX:</span> Clean UI system</p>
              </div>
              <div className="mt-4 border-t border-text-muted/30 pt-2 flex items-center">
                <span className="text-accent-primary mr-2">&gt;</span>
                <input type="text" className="bg-transparent border-none outline-none flex-1 text-background-main" placeholder="LEAVE_LOG..." />
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-2xl mx-auto mt-24 text-center">
        <p className="font-mono text-sm text-text-muted mb-6 uppercase tracking-widest">END_OF_TRANSMISSION</p>
        <button className="px-8 py-4 bg-accent-primary text-background-main font-bold font-mono text-lg uppercase tracking-widest hover:bg-surface-dark hover:text-surface-card transition-colors shadow-lg border-2 border-transparent hover:border-surface-dark">
          CONNECT_TO_NODE
        </button>
      </div>

    </div>
  );
}
