"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const skillCategories = [
  {
    id: "backend",
    title: "SYS.BACKEND",
    short: "BACKEND",
    color: "border-accent-primary",
    accent: "text-accent-primary",
    bgCol: "bg-accent-primary",
    borderHex: "#2563EB",
    skills: [
      "Java / Spring Boot",
      "Node.js / Express.js",
      "Microservices",
      "Laravel / PHP",
      "REST APIs",
      "Prisma ORM",
    ],
  },
  {
    id: "ai_front",
    title: "SYS.AI_FRONT",
    short: "AI / FRONT",
    color: "border-accent-energy",
    accent: "text-accent-energy",
    bgCol: "bg-accent-energy",
    borderHex: "#06B6D4",
    skills: [
      "AI Gateway / LLMs",
      "Groq / Gemini",
      "Zoom API / OAuth 2.0",
      "React.js / Next.js",
      "Tailwind / Bootstrap",
      "JavaScript",
    ],
  },
  {
    id: "data_infra",
    title: "SYS.DATA_INFRA",
    short: "DATA / INFRA",
    color: "border-[#475569]",
    accent: "text-[#475569]",
    bgCol: "bg-[#475569]",
    borderHex: "#475569",
    skills: [
      "MySQL / Redis",
      "Database Design",
      "Query Optimization",
      "AWS EC2 / S3 / RDS",
      "Clean Arch / MVC",
      "Tech Leadership",
    ],
  },
];

export function SkillsPreview() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const reduceMotion = useReducedMotion();
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <div className="sticky top-0 w-full h-[100dvh] flex flex-col justify-start md:justify-center items-center bg-background-main shadow-[0_-15px_30px_rgba(0,0,0,0.4)] z-30 overflow-hidden text-text-primary">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-text-muted/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl w-full px-4 sm:px-6 md:px-8 relative z-10 pt-16 md:pt-8 pb-5 md:py-8">
        <motion.h2
          className="text-text-primary font-mono text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-widest pb-2 border-b-4 border-text-muted/20 mb-5 md:mb-10"
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={reduceMotion ? { duration: 0 } : undefined}
        >
          03 // TECHNICAL_STACK
        </motion.h2>

        {/* Desktop: three system columns */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-10 w-full">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              className={`w-full bg-surface-card border-t-4 ${category.color} p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow`}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.12 }
              }
            >
              <h3 className="font-mono font-bold text-lg mb-6 border-b border-text-muted/20 pb-2">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 group">
                    <div className={`w-2 h-2 rounded-none ${category.bgCol} group-hover:scale-125 transition-transform`} />
                    <span className="font-mono text-sm lg:text-base text-text-secondary group-hover:text-text-primary transition-colors">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mobile: one system at a time — dense chips, fits viewport */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
            {skillCategories.map((cat) => {
              const on = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={`shrink-0 font-mono text-[11px] px-3 py-2 border uppercase tracking-wide transition-colors ${
                    on
                      ? `${cat.color} ${cat.accent} bg-surface-card font-bold`
                      : "border-text-muted/25 text-text-muted"
                  }`}
                >
                  {cat.short}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
              className={`bg-surface-card border-t-4 ${active.color} p-4`}
            >
              <div className="flex items-center justify-between mb-4 border-b border-text-muted/15 pb-2">
                <h3 className={`font-mono font-bold text-sm ${active.accent}`}>
                  {active.title}
                </h3>
                <span className="font-mono text-[10px] text-text-muted">
                  {active.skills.length} nodes
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {active.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { delay: i * 0.04, duration: 0.18 }
                    }
                    className="flex items-center gap-3 border border-text-muted/15 bg-background-secondary/40 px-3 py-3 active:border-accent-energy/40"
                  >
                    <div className={`w-2 h-2 shrink-0 ${active.bgCol}`} />
                    <span className="font-mono text-sm text-text-primary font-medium">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest text-center">
            Tap a system tab · same stack as desktop
          </p>
        </div>
      </div>
    </div>
  );
}
