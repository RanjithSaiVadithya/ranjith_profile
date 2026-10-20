"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { animations } from "@/core/AnimationEngine";
import { useRef } from "react";

/* ─── Magnetic tilt wrapper ─────────────────────────────────────────── */
function MagneticTilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-1, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    y.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Glitch text on hover ──────────────────────────────────────────── */
function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`relative inline-block cursor-default select-none ${className ?? ""}`}
      whileHover="hover"
      initial="rest"
    >
      {/* Main text */}
      <motion.span
        variants={{
          rest: { x: 0, textShadow: "none" },
          hover: {
            textShadow: [
              "2px 0 #00F2FF, -2px 0 #FF003C",
              "-2px 0 #00F2FF, 2px 0 #FF003C",
              "0px 0 #00F2FF, 0px 0 #FF003C",
            ],
            transition: { duration: 0.25, repeat: 2, repeatType: "mirror" },
          },
        }}
        className="relative z-10"
      >
        {text}
      </motion.span>

      {/* Underline sweep */}
      <motion.span
        variants={{
          rest: { scaleX: 0, originX: 0 },
          hover: { scaleX: 1, originX: 0, transition: { duration: 0.25, ease: "easeOut" } },
        }}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-energy"
      />
    </motion.span>
  );
}

/* ─── Hover-lit stat block ───────────────────────────────────────────── */
function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="flex flex-col gap-1 cursor-default group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <div className="text-[#555] text-[10px] font-mono uppercase tracking-widest group-hover:text-[#888] transition-colors duration-200">
        {label}
      </div>
      <div className="text-white font-bold font-mono text-sm group-hover:text-accent-energy transition-colors duration-200">
        {value}
      </div>
      <motion.div
        className="h-px bg-accent-energy"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-start pt-20 px-4 md:px-8 lg:px-20 overflow-hidden bg-black z-0">

      {/* Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage:
            "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow that follows the section center */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[-1]"
        animate={{
          background: [
            "radial-gradient(ellipse 60% 50% at 30% 50%, #00F2FF08 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 50% at 40% 55%, #00F2FF10 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 50% at 30% 50%, #00F2FF08 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={animations.slam}
        initial="initial"
        animate="animate"
        className="w-full max-w-5xl z-10"
      >
        {/* Status badge */}
        <motion.div
          className="mb-10 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className="px-3 py-1 bg-[#0a0a0a] text-accent-energy font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 border-l-2 border-accent-energy"
            whileHover={{
              backgroundColor: "#00F2FF14",
              boxShadow: "0 0 20px #00F2FF30",
              transition: { duration: 0.2 },
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-accent-energy"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            SYS.RUNNING // STATUS: ONLINE
          </motion.div>
          <div className="h-px bg-[#1a1a1a] flex-1 max-w-[120px]" />
        </motion.div>

        {/* Headline with 3-D tilt + glitch */}
        <MagneticTilt>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-black text-white uppercase tracking-tight leading-none mb-4 break-words">
            <GlitchText text="RANJITH SAI" />
            <br />
            <GlitchText text="VADITHYA." className="text-accent-energy" />
          </h1>
        </MagneticTilt>

        {/* Role */}
        <motion.h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#666] mb-8 uppercase tracking-widest font-mono cursor-default"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ color: "#00F2FF", x: 6, transition: { duration: 0.2 } }}
        >
          &gt; Backend Engineer | Java | Spring Boot
        </motion.h2>

        {/* Description */}
        <motion.div
          className="relative max-w-3xl mb-12 border-l-2 border-[#1e1e1e] pl-6 py-2 group cursor-default"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ borderColor: "#00F2FF40", transition: { duration: 0.3 } }}
        >
          <p className="text-[#666] text-sm md:text-base lg:text-lg font-mono leading-relaxed group-hover:text-[#888] transition-colors duration-300">
            Hello. I am a Backend Engineer with nearly 3 years of experience.<br />
            &gt; Building production systems with Java, Spring Boot, Microservices, Redis &amp; MySQL.<br />
            &gt; Initializing connection... OK.
          </p>
          {/* Animated left border glow */}
          <motion.div
            className="absolute left-[-2px] top-0 w-[2px] bg-accent-energy"
            initial={{ height: "0%" }}
            whileHover={{ height: "100%", transition: { duration: 0.4, ease: "easeOut" } }}
          />
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-5 gap-6 md:gap-10 border-t border-[#111] pt-6 w-full max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StatBlock label="Latency" value="12ms" />
          <StatBlock label="Threads" value="16_ACTIVE" />
          <StatBlock label="Override" value="GRANTED" />
          <StatBlock label="Experience" value="~3 YRS" />
          <StatBlock label="Stack" value="JAVA++" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] text-accent-energy uppercase tracking-widest z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>SCROLL</span>
        <motion.div
          className="w-4 h-6 border-2 border-accent-energy flex justify-center p-1"
          animate={{ y: 8 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.8, type: "spring", stiffness: 200, damping: 10 }}
        >
          <div className="w-1 h-1 bg-accent-energy rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
