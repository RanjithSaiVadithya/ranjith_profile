"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const roles = [
  {
    id: "rayudu",
    company: "Rayudu Group",
    period: "10/2026 – Present",
    location: "Anantapur, AP",
    title: "Senior Software Engineer & Tech Team Lead",
    accent: "text-accent-energy",
    bar: "bg-accent-energy",
    border: "border-accent-energy",
    borderHex: "#06B6D4",
    summary:
      "Lead backend delivery, architecture, code reviews, and cross-functional feature execution across the full SDLC.",
    focus: ["Leadership", "REST APIs", "Architecture"],
  },
  {
    id: "praxo",
    company: "MudarDzApps Praxo",
    period: "08/2025 – 09/2026",
    location: null,
    title: "Software Engineer",
    accent: "text-accent-primary",
    bar: "bg-accent-primary",
    border: "border-accent-primary",
    borderHex: "#2563EB",
    summary:
      "Java Spring Boot microservices for creator scoring, rewards, payouts, Redis-backed feeds, and IMPS settlement — ~25% lower DB overhead.",
    focus: ["Spring Boot", "Redis", "Microservices"],
  },
  {
    id: "spider",
    company: "Spider Hit Infotech",
    period: "12/2023 – 07/2025",
    location: null,
    title: "Software Developer",
    accent: "text-accent-primary",
    bar: "bg-accent-primary",
    border: "border-accent-primary",
    borderHex: "#2563EB",
    summary:
      "Delivered 12+ enterprise and e-commerce apps with Laravel, MySQL, and React.js — auth, payments, bookings, and admin dashboards.",
    focus: ["Laravel", "MySQL", "React"],
  },
];

export function CareerPreview() {
  const [activeId, setActiveId] = useState(roles[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  /** 0 = boot, 1 = loading, 2 = role, 3 = passed (done) */
  const [logStep, setLogStep] = useState(3);
  const active = roles.find((r) => r.id === activeId) ?? roles[0];
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) {
      setLogStep(3);
      return;
    }

    setLogStep(0);
    const timers = [
      window.setTimeout(() => setLogStep(1), 280),
      window.setTimeout(() => setLogStep(2), 700),
      window.setTimeout(() => setLogStep(3), 1100),
    ];

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [activeId, reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const codeParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [18, -18]
  );

  const railContainer = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };

  const railItem = {
    hidden: reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 },
    show: {
      opacity: 1,
      x: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 280, damping: 24 },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="sticky top-0 h-[100dvh] w-full bg-background-main flex flex-col items-center justify-center relative overflow-hidden shadow-[0_-15px_30px_rgba(0,0,0,0.5)] text-text-primary"
    >
      <div className="max-w-6xl w-full px-6 md:px-8 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 items-center">
        <div className="flex flex-col z-10 min-w-0">
          <motion.h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.4 }}
          >
            01 // CAREER
          </motion.h2>

          <motion.p
            className="font-mono text-text-secondary text-sm leading-relaxed mb-3 border-l-4 border-accent-primary pl-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.08 }}
          >
            Nearly 3 years building production backends — REST APIs, microservices, AI integrations, technical leadership, and performance troubleshooting.
          </motion.p>

          <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-energy animate-pulse" />
            Click a role to sync terminal →
          </p>

          <motion.div
            className="flex flex-col border border-text-muted/20 bg-surface-card"
            variants={railContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            role="listbox"
            aria-label="Career roles"
          >
            {roles.map((role, i) => {
              const isActive = role.id === activeId;
              const isHovered = hoveredId === role.id;
              const showBar = isActive || isHovered;

              return (
                <motion.button
                  key={role.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  title={`Click to load ${role.company} in terminal`}
                  variants={railItem}
                  onClick={() => {
                    setActiveId(role.id);
                    if (!reduceMotion) setLogStep(0);
                  }}
                  onHoverStart={() => setHoveredId(role.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  className={`relative text-left px-4 py-3 md:px-5 md:py-3.5 font-mono outline-none cursor-pointer select-none ${
                    i < roles.length - 1 ? "border-b border-text-muted/15" : ""
                  } ${isActive ? "bg-background-secondary/60 ring-1 ring-inset ring-accent-energy/20" : ""}`}
                  style={{
                    backgroundColor: !isActive && isHovered ? "rgba(148,163,184,0.08)" : undefined,
                  }}
                >
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 w-1 origin-top ${role.bar}`}
                    initial={false}
                    animate={{
                      scaleY: showBar ? 1 : 0,
                      opacity: isActive ? 1 : isHovered ? 0.55 : 0,
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 320, damping: 28 }
                    }
                  />
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={`text-sm font-bold tracking-tight transition-colors ${
                        isActive ? role.accent : "text-text-primary"
                      }`}
                    >
                      {role.company}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-text-muted whitespace-nowrap">
                        {role.period}
                      </span>
                      {isActive ? (
                        <span className="text-[9px] uppercase tracking-widest text-accent-energy border border-accent-energy/40 px-1.5 py-0.5">
                          Active
                        </span>
                      ) : (
                        <span
                          className={`text-[9px] uppercase tracking-widest border px-1.5 py-0.5 transition-colors ${
                            isHovered
                              ? "text-accent-primary border-accent-primary/40"
                              : "text-text-muted/70 border-text-muted/25"
                          }`}
                        >
                          Select
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`text-xs mt-0.5 transition-colors ${
                      isActive ? "text-text-secondary" : "text-text-muted"
                    }`}
                  >
                    {role.title}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className={`mt-4 border-l-4 ${active.border} pl-4 py-1 overflow-hidden`}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.22 }}
            >
              {active.location && (
                <div className="font-mono text-[10px] text-text-muted mb-1 uppercase tracking-widest">
                  {active.location}
                </div>
              )}
              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                {active.summary}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="hidden md:flex relative h-full w-full justify-center items-center"
          style={reduceMotion ? undefined : { y: codeParallaxY }}
          initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 200, damping: 22, delay: 0.15 }
          }
        >
          <motion.div
            className="w-full max-w-[360px] min-h-[400px] border-2 bg-surface-card relative shadow-lg"
            animate={{
              borderColor: `${active.borderHex}55`,
              boxShadow: `0 12px 28px rgba(0,0,0,0.08), 0 0 0 1px ${active.borderHex}18`,
            }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
          >
            <div className="absolute -left-8 top-12 w-24 h-24 bg-accent-primary/10 rounded-full blur-xl" />
            <div className="absolute -right-8 bottom-12 w-32 h-32 bg-accent-energy/10 rounded-full blur-xl" />

            <div className="w-full h-8 border-b-2 border-text-muted/20 flex gap-2 items-center px-4">
              <div className="w-2 h-2 rounded-full bg-accent-warning" />
              <div className="w-2 h-2 rounded-full bg-accent-primary" />
              <span className="ml-auto font-mono text-[9px] text-text-muted uppercase tracking-widest">
                career.node
              </span>
            </div>
            <div className="p-5 font-mono text-[10px] text-text-secondary leading-relaxed">
              <div className="text-[9px] text-text-muted uppercase tracking-widest mb-3 border-b border-dashed border-text-muted/20 pb-2">
                Synced from selection · click roles to update
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.22 }}
                >
                  <span className="text-accent-primary">const</span>{" "}
                  <span className="text-text-primary">developer</span> = {"{"}
                  <br />
                  &nbsp;&nbsp;role:{" "}
                  <span className="text-accent-success break-words">
                    &apos;{active.title}&apos;
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;org:{" "}
                  <span className="text-accent-success">&apos;{active.company}&apos;</span>,
                  <br />
                  &nbsp;&nbsp;period:{" "}
                  <span className="text-accent-success">&apos;{active.period}&apos;</span>,
                  <br />
                  &nbsp;&nbsp;focus:{" "}
                  <span className="text-accent-success">
                    [{active.focus.map((f) => `'${f}'`).join(", ")}]
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;integrity: <span className="text-accent-primary">true</span>
                  <br />
                  {"}"};
                  <br />
                  <br />
                  <div className="w-full h-px border-b border-dashed border-text-muted/30 my-3" />

                  <div className="space-y-1 min-h-[4.5rem]">
                    {logStep === 0 && (
                      <span className="text-text-muted">&gt; Booting module…</span>
                    )}
                    {logStep >= 1 && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        &gt; Loading {active.company}…
                      </motion.div>
                    )}
                    {logStep >= 2 && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        &gt; Role: {active.title}
                      </motion.div>
                    )}
                    {logStep >= 3 && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-accent-success"
                      >
                        &gt; Scalability checks passed.
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    className="w-2 h-4 bg-text-primary inline-block mt-2"
                    animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1] }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { repeat: Infinity, duration: 0.8 }
                    }
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
