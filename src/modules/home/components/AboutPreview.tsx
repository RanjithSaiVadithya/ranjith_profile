"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function AboutPreview() {
  const router = useRouter();

  const blocks = [
    { title: "LOGIC", val: "B.Tech EEE" },
    { title: "CORE", val: "Microservices" },
    { title: "STACK", val: "Java/React" }
  ];

  return (
    <div className="w-full py-32 bg-black flex flex-col items-center justify-center relative z-10">
       <div className="max-w-4xl w-full px-8">
         <motion.h2 
           className="text-white font-mono text-xl uppercase tracking-widest mb-16 pb-2 border-b-2 border-[#222]"
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
         >
           01 // IDENTITY_MATRIX
         </motion.h2>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {blocks.map((block, i) => (
             <motion.div
               key={block.title}
               className="bg-[#0A0A0A] border-2 border-accent-energy p-8 flex flex-col justify-end min-h-[200px] cursor-pointer"
               initial={{ y: -100, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true, margin: "-100px 0px 0px 0px" }}
               transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.15 }}
               onClick={() => router.push('/about')}
               whileHover={{ scale: 0.95 }}
             >
               <div className="text-accent-energy font-mono text-xs mb-2">[{block.title}]</div>
               <div className="text-white font-bold text-2xl uppercase">{block.val}</div>
             </motion.div>
           ))}
         </div>
       </div>
    </div>
  );
}
