"use client";

import { motion } from "framer-motion";
import { animations } from "@/core/AnimationEngine";
import { useEffect, useState } from "react";

// Animated blinking cursor
function BlinkingCursor() {
  return (
    <motion.span
      className="inline-block w-2 h-4 bg-accent-energy align-middle ml-1"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
    />
  );
}

// Uptime counter — counts seconds since mount
function UptimeCounter() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return <span className="text-accent-energy">{hh}:{mm}:{ss}</span>;
}

// Terminal lines that type in one by one
const TERMINAL_LINES = [
  { prefix: "$", text: " engineer.init()", color: "text-[#aaa]" },
  { prefix: ">", text: " loading dependencies...", color: "text-[#666]" },
  { prefix: ">", text: " java          [OK]", color: "text-[#666]" },
  { prefix: ">", text: " spring-boot   [OK]", color: "text-[#666]" },
  { prefix: ">", text: " microservices [OK]", color: "text-[#666]" },
  { prefix: ">", text: " redis         [OK]", color: "text-[#666]" },
  { prefix: ">", text: " mysql         [OK]", color: "text-[#666]" },
  { prefix: "✓", text: " STATUS: ONLINE", color: "text-accent-energy" },
];

function TerminalLines() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 320);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div className="flex flex-col gap-[6px] font-mono text-xs">
      {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-2"
        >
          <span className="text-accent-energy select-none w-3 shrink-0">
            {line.prefix}
          </span>
          <span className={line.color}>{line.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-start pt-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-black z-0">
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage:
            "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        variants={animations.slam}
        initial="initial"
        animate="animate"
        className="w-full max-w-6xl z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12"
      >
        {/* ── LEFT: Text content ── */}
        <div className="flex-1 min-w-0">
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
            &gt; Backend Engineer | Java | Spring Boot
          </h2>

          <p className="text-[#888] text-sm md:text-lg lg:text-xl font-mono max-w-2xl mb-8 md:mb-12 border-l-2 border-[#333] pl-4 md:pl-6 py-2">
            Hello. I am a Backend Engineer with nearly 3 years of experience.<br />
            &gt; Building production systems with Java, Spring Boot, Microservices, Redis &amp; MySQL.<br />
            &gt; Initializing connection... OK.
          </p>

          {/* Monospace Status Bar */}
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

        {/* ── RIGHT: Terminal Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden lg:flex flex-col w-[340px] shrink-0 border border-[#222] bg-[#050505] relative group overflow-hidden"
        >
          {/* Cyber corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-energy z-30 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-accent-energy/30 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-energy z-30 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-accent-energy/30 pointer-events-none" />

          {/* Scanline */}
          <motion.div
            className="absolute left-0 w-full h-[2px] bg-accent-energy/40 shadow-[0_0_12px_#00F2FF] z-20 pointer-events-none"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a] bg-[#0a0a0a] shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent-energy/60" />
            <span className="ml-2 font-mono text-[10px] text-[#444] tracking-widest uppercase">
              engineer.sh
            </span>
          </div>

          {/* Terminal body */}
          <div className="flex-1 px-5 py-5 flex flex-col gap-5">
            {/* Uptime */}
            <div className="font-mono text-xs text-[#555]">
              <span className="text-accent-energy">$</span>{" "}
              <span className="text-[#aaa]">uptime</span>
              <br />
              <span className="text-[#444] pl-2">session_uptime=</span>
              <UptimeCounter />
            </div>

            {/* Divider */}
            <div className="border-t border-[#181818]" />

            {/* Typed lines */}
            <TerminalLines />

            {/* Divider */}
            <div className="border-t border-[#181818]" />

            {/* Stack */}
            <div className="font-mono text-xs text-[#555]">
              <span className="text-accent-energy">$</span>{" "}
              <span className="text-[#aaa]">cat stack.txt</span>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 pl-2 text-[#666]">
                {["Java", "Spring Boot", "Redis", "MySQL", "Docker", "Kafka", "AWS"].map(
                  (s) => (
                    <span key={s} className="text-[#555]">
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Prompt with cursor */}
            <div className="font-mono text-xs text-[#444] mt-auto">
              <span className="text-accent-energy">$</span>{" "}
              <BlinkingCursor />
            </div>
          </div>
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
          animate={{ y: 10 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          <div className="w-1 h-1 bg-accent-energy rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
