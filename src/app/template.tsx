"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { animations } from "@/core/AnimationEngine";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      variants={animations.slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
