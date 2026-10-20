"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { animations } from "@/core/AnimationEngine";
import { useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════
   GRID CONSTANTS
══════════════════════════════════════════════════════ */
const LARGE = 80;  // base cell px
const SMALL = 16;  // sub-cell px

/* ══════════════════════════════════════════════════════
   CANVAS INTERACTIVE GRID (rAF-based, no React state)
══════════════════════════════════════════════════════ */
function useCanvasGrid(heroRef: React.RefObject<HTMLDivElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hero   = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const mouse = { x: 0, y: 0, inside: false, isText: false };
    let alpha = 0;

    function resize() {
      const rect = hero!.getBoundingClientRect();
      canvas!.width  = rect.width;
      canvas!.height = rect.height;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    /* ─── Draw fine sub-grid (tennis-racket style) inside one large cell ─── */
    function drawCell(cellX: number, cellY: number, cellAlpha: number) {
      if (cellAlpha < 0.01) return;
      const SUB = 10; // sub-cell size — dense like a tennis racket

      ctx.lineWidth = 0.5;

      // Interior vertical lines
      for (let x = cellX + SUB; x < cellX + LARGE; x += SUB) {
        ctx.strokeStyle = `rgba(0,242,255,${0.28 * cellAlpha})`;
        ctx.beginPath();
        ctx.moveTo(x, cellY);
        ctx.lineTo(x, cellY + LARGE);
        ctx.stroke();
      }
      // Interior horizontal lines
      for (let y = cellY + SUB; y < cellY + LARGE; y += SUB) {
        ctx.strokeStyle = `rgba(0,242,255,${0.28 * cellAlpha})`;
        ctx.beginPath();
        ctx.moveTo(cellX, y);
        ctx.lineTo(cellX + LARGE, y);
        ctx.stroke();
      }

      // Cell border glow (brighter the more alpha)
      ctx.strokeStyle = `rgba(0,242,255,${0.6 * cellAlpha})`;
      ctx.lineWidth   = 0.8;
      ctx.strokeRect(cellX + 0.5, cellY + 0.5, LARGE - 1, LARGE - 1);
    }

    /* ─── Render loop ─── */
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      if (mouse.inside) alpha = Math.min(1, alpha + 0.09);
      else              alpha = Math.max(0, alpha - 0.07);

      if (alpha > 0) {
        // Primary cell origin
        const cx = Math.floor(mouse.x / LARGE) * LARGE;
        const cy = Math.floor(mouse.y / LARGE) * LARGE;

        if (!mouse.isText) {
          // Cursor position WITHIN the primary cell (0 = left/top edge, LARGE = right/bottom edge)
          const px = mouse.x - cx;
          const py = mouse.y - cy;

          // How far into the "border zone" on each side (0=center, 1=at border)
          // THRESH controls when neighbors start appearing — 35% from border
          const THRESH = LARGE * 0.35;

          const rightW  = px > LARGE - THRESH ? (px - (LARGE - THRESH)) / THRESH : 0;
          const leftW   = px < THRESH          ? 1 - px / THRESH                 : 0;
          const bottomW = py > LARGE - THRESH  ? (py - (LARGE - THRESH)) / THRESH : 0;
          const topW    = py < THRESH          ? 1 - py / THRESH                 : 0;

          // Draw primary cell — always full alpha
          drawCell(cx, cy, alpha);

          // Draw direct neighbors (weighted by proximity to shared border)
          if (rightW  > 0) drawCell(cx + LARGE, cy,         rightW  * alpha);
          if (leftW   > 0) drawCell(cx - LARGE, cy,         leftW   * alpha);
          if (bottomW > 0) drawCell(cx,         cy + LARGE, bottomW * alpha);
          if (topW    > 0) drawCell(cx,         cy - LARGE, topW    * alpha);

          // Draw corner cells (only when near BOTH corresponding borders)
          if (rightW  > 0 && bottomW > 0) drawCell(cx + LARGE, cy + LARGE, rightW  * bottomW * alpha);
          if (leftW   > 0 && bottomW > 0) drawCell(cx - LARGE, cy + LARGE, leftW   * bottomW * alpha);
          if (rightW  > 0 && topW    > 0) drawCell(cx + LARGE, cy - LARGE, rightW  * topW    * alpha);
          if (leftW   > 0 && topW    > 0) drawCell(cx - LARGE, cy - LARGE, leftW   * topW    * alpha);

          // Tiny cursor dot
          ctx.fillStyle = `rgba(0,242,255,${0.9 * alpha})`;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 1.5, 0, Math.PI * 2);
          ctx.fill();

        } else {
          // Text mode: just a faint single cell border — highlights text, not grid
          ctx.strokeStyle = `rgba(0,242,255,${0.18 * alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.strokeRect(cx, cy, LARGE, LARGE);
        }
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    /* ── mouse tracking (native listeners for performance) ── */
    function onMove(e: MouseEvent) {
      const rect = hero!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = true;

      // Detect text: canvas is pointer-events:none so elementFromPoint
      // returns the real DOM element under the cursor
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      mouse.isText = !!el && ["H1","H2","H3","P","SPAN","STRONG","A"].includes(el.tagName);
    }
    function onLeave() { mouse.inside = false; }

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [heroRef]);

  return canvasRef;
}

/* ══════════════════════════════════════════════════════
   MAGNETIC TILT (headline)
══════════════════════════════════════════════════════ */
function MagneticTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const rx  = useSpring(useTransform(my, [-1,1],[4,-4]), { stiffness:220, damping:22 });
  const ry  = useSpring(useTransform(mx, [-1,1],[-4,4]), { stiffness:220, damping:22 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width)  * 2 - 1);
    my.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX:rx, rotateY:ry, transformStyle:"preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   GLITCH TEXT
══════════════════════════════════════════════════════ */
function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`relative inline-block cursor-default select-none ${className ?? ""}`}
      whileHover="hover"
      initial="rest"
    >
      <motion.span
        className="relative z-10"
        variants={{
          rest:  { textShadow: "none" },
          hover: {
            textShadow: [
              "3px 0 #00F2FF, -3px 0 #FF003C",
              "-3px 0 #00F2FF,  3px 0 #FF003C",
              "0   0 #00F2FF,   0   0 #FF003C",
            ],
            transition: { duration: 0.3, repeat: 2, repeatType: "mirror" as const },
          },
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-energy origin-left"
        variants={{
          rest:  { scaleX: 0 },
          hover: { scaleX: 1, transition: { duration: 0.25, ease: "easeOut" } },
        }}
      />
    </motion.span>
  );
}

/* ══════════════════════════════════════════════════════
   STAT BLOCK
══════════════════════════════════════════════════════ */
function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="flex flex-col gap-1 cursor-default group"
      whileHover={{ scale: 1.07 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
    >
      <span
        className="font-mono uppercase tracking-widest text-[#555] group-hover:text-[#888] transition-colors duration-200"
        style={{ fontSize: "clamp(0.5rem, 0.9vw, 0.65rem)" }}
      >
        {label}
      </span>
      <span
        className="font-mono font-bold text-white group-hover:text-accent-energy transition-colors duration-200"
        style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)" }}
      >
        {value}
      </span>
      <motion.div
        className="h-px bg-accent-energy origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1, transition: { duration: 0.2 } }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════ */
export function HeroSection() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useCanvasGrid(heroRef);

  return (
    <div
      ref={heroRef}
      className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-black z-0"
      style={{
        paddingTop:    "clamp(4rem, 10vh, 7rem)",
        paddingBottom: "clamp(2rem, 5vh, 4rem)",
        paddingLeft:   "clamp(1.25rem, 5vw, 6rem)",
        paddingRight:  "clamp(1.25rem, 5vw, 6rem)",
      }}
    >
      {/* ── Static base large grid (CSS) — covers full hero ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(#1d1d1d 1px, transparent 1px), linear-gradient(90deg, #1d1d1d 1px, transparent 1px)",
          backgroundSize: `${LARGE}px ${LARGE}px`,
        }}
      />

      {/* ── Canvas: interactive hover grid (pointer-events:none so elementFromPoint works) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ display: "block" }}
      />

      {/* ── Ambient breathing glow ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        animate={{
          background: [
            "radial-gradient(ellipse 70% 55% at 20% 50%, #00F2FF06 0%, transparent 65%)",
            "radial-gradient(ellipse 75% 60% at 28% 55%, #00F2FF0A 0%, transparent 65%)",
            "radial-gradient(ellipse 70% 55% at 20% 50%, #00F2FF06 0%, transparent 65%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={animations.slam}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full flex flex-col"
      >
        {/* Status badge */}
        <motion.div
          className="flex items-center gap-3"
          style={{ marginBottom: "clamp(1rem, 3vh, 2rem)" }}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 border-l-2 border-accent-energy bg-[#0a0a0a] text-accent-energy font-mono font-bold uppercase tracking-widest"
            style={{
              fontSize: "clamp(0.55rem, 1.1vw, 0.7rem)",
              padding:  "clamp(0.2rem, 0.5vh, 0.35rem) clamp(0.5rem, 1vw, 0.85rem)",
            }}
            whileHover={{
              backgroundColor: "#00F2FF14",
              boxShadow: "0 0 22px #00F2FF2A",
              transition: { duration: 0.2 },
            }}
          >
            <motion.span
              className="w-[6px] h-[6px] rounded-full bg-accent-energy shrink-0"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            SYS.RUNNING // STATUS: ONLINE
          </motion.div>
          <div className="h-px bg-[#1c1c1c] w-16 sm:w-24" />
        </motion.div>

        {/* Headline */}
        <MagneticTilt>
          <h1
            className="font-black text-white uppercase tracking-tight leading-[0.9] break-words w-full"
            style={{ fontSize: "clamp(2.8rem, 11vw, 9.5rem)" }}
          >
            <GlitchText text="RANJITH SAI" />
            <br />
            <GlitchText text="VADITHYA." className="text-accent-energy" />
          </h1>
        </MagneticTilt>

        {/* Role */}
        <motion.h2
          className="font-bold text-[#555] uppercase tracking-widest font-mono cursor-default"
          style={{
            fontSize:     "clamp(0.7rem, 2.2vw, 1.6rem)",
            marginTop:    "clamp(0.5rem, 1.5vh, 1.25rem)",
            marginBottom: "clamp(0.75rem, 2vh, 1.75rem)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ color: "#00F2FF", x: 8, transition: { duration: 0.2 } }}
        >
          &gt; Backend Engineer | Java | Spring Boot
        </motion.h2>

        {/* Description */}
        <motion.div
          className="relative border-l-2 border-[#1e1e1e] group cursor-default"
          style={{
            paddingLeft:   "clamp(0.75rem, 2vw, 1.5rem)",
            paddingTop:    "0.3rem",
            paddingBottom: "0.3rem",
            marginBottom:  "clamp(1.25rem, 4vh, 3rem)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ borderColor: "#00F2FF35", transition: { duration: 0.3 } }}
        >
          <p
            className="text-[#666] font-mono leading-relaxed group-hover:text-[#888] transition-colors duration-300"
            style={{ fontSize: "clamp(0.65rem, 1.4vw, 1.05rem)", maxWidth: "min(55ch, 100%)" }}
          >
            Hello. I am a Backend Engineer with nearly 3 years of experience.<br />
            &gt; Building production systems with Java, Spring Boot, Microservices, Redis &amp; MySQL.<br />
            &gt; Initializing connection... OK.
          </p>
          <motion.div
            className="absolute left-[-2px] top-0 w-[2px] bg-accent-energy origin-top"
            initial={{ scaleY: 0 }}
            whileHover={{ scaleY: 1, transition: { duration: 0.38, ease: "easeOut" } }}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-5 border-t border-[#111]"
          style={{
            paddingTop: "clamp(0.75rem, 2vh, 1.25rem)",
            gap: "clamp(0.75rem, 3vw, 2.5rem)",
            width: "100%",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StatBlock label="Latency"    value="12ms"      />
          <StatBlock label="Threads"    value="16_ACTIVE"  />
          <StatBlock label="Override"   value="GRANTED"   />
          <StatBlock label="Experience" value="~3 YRS"    />
          <StatBlock label="Stack"      value="JAVA++"    />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-accent-energy uppercase tracking-widest z-10"
        style={{ fontSize: "clamp(0.45rem, 0.9vw, 0.6rem)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
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
