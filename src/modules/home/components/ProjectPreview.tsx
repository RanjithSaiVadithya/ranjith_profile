"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";

export function ProjectPreview() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const projects = [
    {
      title: "RonoJobs",
      stack: "Node.js • Prisma • AI Gateway",
      focus: "AI Systems Design",
      desc: "Recruitment platform engineered around AI orchestration — structured resume/JD parsing, provider failover, and interview automation.",
      points: [
        "AI Gateway with Groq / Gemini fallback routing",
        "Resume & JD parsing into structured profiles",
        "Skill-based candidate-to-job matching engine",
        "Zoom Server-to-Server OAuth for interviews",
      ],
    },
    {
      title: "Praxo",
      stack: "Java • Spring Boot • Redis",
      focus: "Distributed Systems",
      desc: "Short-video creator platform built as Spring Boot microservices with Redis-backed feeds and production settlement pipelines.",
      points: [
        "Creator scoring, rewards & payout workflows",
        "Redis personalized feed & recommendations",
        "Async engagement processing on AWS EC2",
        "SFTP / IMPS settlement automation (~25% DB cut)",
      ],
    },
    {
      title: "Ride Wheels",
      stack: "Laravel • React • MySQL",
      focus: "API Architecture",
      desc: "Vehicle rental ecosystem with dual mobile apps — booking, pricing, payments, and real-time communication layers.",
      points: [
        "Listing, search, booking & scheduling APIs",
        "Referral rewards and coupon eligibility engine",
        "WhatsApp status updates + SMS OTP auth",
        "RBAC for customers, owners & admin portal",
      ],
    },
    {
      title: "Pet Care E-Comm",
      stack: "Laravel • Razorpay",
      focus: "Commerce Systems",
      desc: "E-commerce engine with variant-aware catalog logic, live inventory controls, and secure payment checkout.",
      points: [
        "Smart brand / variant sorting algorithms",
        "Live inventory & stock integrity rules",
        "Razorpay payment gateway integration",
        "Admin workflows for catalog operations",
      ],
    },
    {
      title: "Atal Incubation",
      stack: "Laravel • MySQL • Bootstrap",
      focus: "Platform Engineering",
      desc: "Incubation management portal for startup cohorts — programs, events, documents, and operational analytics.",
      points: [
        "Program & startup cohort management",
        "Admin charts, reports & search tooling",
        "Document storage with email alerts",
        "Event / blog / notification pipelines",
      ],
    },
    {
      title: "Pallaki Events",
      stack: "Laravel • React.js",
      focus: "System Design",
      desc: "Multi-role event booking system isolating user, vendor, and admin domains with secure access boundaries.",
      points: [
        "Tri-panel dashboards (user / vendor / admin)",
        "Lead tracking & service inquiry flows",
        "Role-restricted access control model",
        "Real-time booking state orchestration",
      ],
    },
  ];

  return (
    <div className="sticky top-0 h-[100dvh] w-full bg-[#050505] flex flex-col relative shadow-[0_-20px_40px_rgba(0,0,0,0.9)] border-t-2 border-[#222] z-20 overflow-hidden">
      <div className="max-w-6xl w-full mx-auto px-5 md:px-8 flex flex-col flex-1 min-h-0 py-4 md:py-5">
        <div className="flex justify-between items-end pb-2 border-b border-[#333] shrink-0 mb-3 md:mb-4">
          <motion.h2
            className="text-[#94a3b8] font-mono text-xl md:text-3xl uppercase tracking-widest"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={reduceMotion ? { duration: 0 } : undefined}
          >
            02 // SYS_PROJECTS
          </motion.h2>
          <button
            onClick={() => router.push("/projects")}
            className="hidden md:block text-accent-energy font-mono text-xs hover:text-white transition-colors uppercase tracking-widest pb-0.5"
          >
            [ VIEW_ALL_SYSTEMS ]
          </button>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 content-stretch">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              className={`w-full h-full bg-[#0a0a0a] border-2 border-[#1a1a1a] p-4 md:p-5 relative group cursor-pointer transition-colors hover:border-accent-primary flex-col ${
                i >= 3 ? "hidden sm:flex" : "flex"
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.3, delay: Math.min(i * 0.05, 0.25) }
              }
              whileHover={reduceMotion ? undefined : { y: -2 }}
              onClick={() => router.push("/projects")}
            >
              <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="z-10 relative flex flex-col h-full">
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="font-mono text-[9px] md:text-[10px] text-text-muted bg-white/5 px-2 py-0.5 border border-[#333] group-hover:border-accent-primary/50 group-hover:text-accent-primary transition-colors">
                    {proj.stack}
                  </span>
                  <span className="font-mono text-[9px] md:text-[10px] text-accent-energy/90 border border-accent-energy/30 px-2 py-0.5 uppercase tracking-wide">
                    {proj.focus}
                  </span>
                </div>

                <h3 className="text-white text-lg md:text-xl font-black uppercase tracking-tight mb-2 group-hover:text-accent-energy transition-colors">
                  {proj.title}
                </h3>

                <p className="font-mono text-[#888] text-xs leading-relaxed mb-3">
                  {proj.desc}
                </p>

                <ul className="font-mono text-[11px] text-[#666] space-y-1.5 flex-1">
                  {proj.points.map((point) => (
                    <li key={point} className="flex gap-2 leading-snug">
                      <span className="text-accent-energy shrink-0 mt-0.5">▸</span>
                      <span className="group-hover:text-[#999] transition-colors">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-3 w-full border-t border-[#222] flex justify-between items-center group-hover:border-accent-primary/20 transition-colors">
                  <span className="font-mono text-[9px] text-[#444] uppercase tracking-widest">
                    {proj.focus}
                  </span>
                  <span className="text-accent-energy font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    INIT &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 w-full flex justify-center sm:hidden shrink-0">
          <button
            onClick={() => router.push("/projects")}
            className="text-accent-energy font-mono text-xs hover:text-white transition-colors uppercase tracking-widest border border-accent-energy/30 px-6 py-2.5 w-full"
          >
            [ VIEW_ALL_SYSTEMS ]
          </button>
        </div>
      </div>
    </div>
  );
}
