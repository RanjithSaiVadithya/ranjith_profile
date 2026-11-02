"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animations } from "@/core/AnimationEngine";
import { TimelineSection } from "../home/components/TimelineSection";

const careerRoles = [
  {
    id: "rayudu",
    company: "Rayudu Group",
    title: "Senior Software Engineer & Tech Team Lead",
    period: "10/2026 – Present",
    location: "Anantapur, Andhra Pradesh",
    accent: "text-accent-energy",
    bar: "bg-accent-energy",
    bullets: [
      "Lead technical development and engineering coordination to deliver backend features and platform enhancements for production applications.",
      "Design and maintain scalable backend services, REST APIs, and application integrations, following modular architecture and maintainable coding practices.",
      "Guide technical implementation, code reviews, debugging, and testing to improve code quality and application reliability.",
      "Coordinate feature development across the software development lifecycle (SDLC), including requirement analysis, implementation, integration, and deployment support.",
      "Collaborate with cross-functional stakeholders to translate business requirements into technical solutions and deliver features within project timelines.",
      "Contribute to backend architecture, database integration, performance optimization, and production troubleshooting to improve system reliability.",
    ],
  },
  {
    id: "praxo",
    company: "MudarDzApps Praxo",
    title: "Software Engineer",
    period: "08/2025 – 09/2026",
    location: null,
    accent: "text-accent-primary",
    bar: "bg-accent-primary",
    bullets: [
      "Built Java Spring Boot microservices for creator scoring, rewards, payouts, and settlement workflows.",
      "Designed Redis-backed personalized feeds and recommendation systems, reducing database overhead by ~25%.",
      "Automated financial settlement pipelines with Excel reports, SFTP processing, and IMPS payouts.",
    ],
  },
  {
    id: "spider",
    company: "Spider Hit Infotech",
    title: "Software Developer",
    period: "12/2023 – 07/2025",
    location: null,
    accent: "text-accent-secondary",
    bar: "bg-accent-secondary",
    bullets: [
      "Delivered 12+ enterprise and e-commerce applications using Laravel, MySQL, React.js, and REST APIs.",
      "Built authentication, payments, bookings, and admin dashboard workflows end to end.",
    ],
  },
];

export function AboutModule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCareerId, setActiveCareerId] = useState(careerRoles[0].id);
  const [hoveredCareerId, setHoveredCareerId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const emailId = "ranjithsaivadithya14@gmail.com";

  const handleMailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const mailtoUrl = `mailto:${emailId}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailId)}`;

    // Try native desktop mail client first.
    window.location.href = mailtoUrl;

    // If the browser stays focused, likely no desktop handler is configured.
    window.setTimeout(() => {
      if (document.hasFocus()) {
        window.open(gmailUrl, "_blank", "noopener,noreferrer");
      }
    }, 700);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-24 pt-12">
      {/* HEADER */}
      <motion.div variants={animations.slideLeft} initial="initial" animate="animate">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">01 // ABOUT_ME</h2>
        <div className="w-24 h-2 bg-accent-primary" />
      </motion.div>

      {/* PROFILE OVERVIEW */}
      <section className="bg-surface-card border border-[#222] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
        
        {/* Abstract Matrix Background Line */}
        <div className="absolute top-0 right-0 w-32 h-full bg-[linear-gradient(90deg,transparent,rgba(0,242,255,0.03))] pointer-events-none" />

        {/* Circular Interactive Image */}
        <div className="relative shrink-0 group">
          {/* Animated rings */}
          <div className="absolute -inset-2 rounded-full border border-[#333] group-hover:border-accent-primary/50 transition-colors duration-500 animate-[spin_10s_linear_infinite]" />
          <div className="absolute -inset-4 rounded-full border border-dashed border-[#222] group-hover:border-accent-energy/30 transition-colors duration-500 animate-[spin_15s_linear_infinite_reverse]" />
          
          <div 
             className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#111] hover:border-accent-primary transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.8)] relative z-10"
             onClick={() => setIsModalOpen(true)}
          >
             <Image 
                src="/dev_profile.png" 
                alt="Developer Profile Silhouette" 
                layout="fill" 
                objectFit="cover" 
                className="group-hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"
             />
          </div>
          <p className="text-center font-mono text-[9px] text-text-muted mt-6 tracking-widest uppercase">Click_To_Expand // _</p>
        </div>

        {/* Profile Details & Contact Buttons */}
        <div className="flex-1 flex flex-col z-10 w-full text-center md:text-left pt-2">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-text-primary mb-1">Ranjith Sai Vadithya</h3>
          <p className="font-mono text-accent-energy font-bold text-xs md:text-sm tracking-widest mb-6 border-b border-text-muted/20 pb-4 inline-block">SR. BACKEND ENGINEER // TECH TEAM LEAD</p>
          
          <p className="text-text-secondary text-sm md:text-base mb-8 leading-relaxed max-w-2xl font-medium">
            Senior Software Engineer & Tech Team Lead with nearly 3 years of experience building production applications using Java, Spring Boot, Microservices, Node.js, Laravel, Redis, MySQL, and React. Experienced in designing REST APIs, AI Gateway integrations, backend architecture, technical leadership, code reviews, and delivering features across the full SDLC. Hands-on experience building scalable systems and solving backend performance, concurrency, and data-processing challenges in production environments.
          </p>

           <div className="flex flex-col md:flex-row gap-8 items-center md:items-start font-mono text-xs border-l-4 border-accent-primary pl-6 py-2 bg-text-muted/5 rounded-r-lg w-fit">
              <div className="flex flex-col text-left">
                <span className="text-text-muted uppercase tracking-widest mb-1 font-bold">NODE_LOCATION</span>
                <span className="text-text-primary font-bold">Bangalore, India</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-text-muted/30" />
              <div className="flex flex-col text-left">
                <span className="text-text-muted uppercase tracking-widest mb-1 font-bold">SECURE_EMAIL</span>
                <a href="mailto:ranjithsaivadithya14@gmail.com" className="text-text-primary font-bold hover:text-accent-primary transition-colors">ranjithsaivadithya14@gmail.com</a>
              </div>
           </div>

           {/* Social Icon Grid */}
           <div className="flex gap-6 items-center justify-center md:justify-start mt-8">
              {/* LinkedIn */}
              <a href="https://linkedin.com/in/vadithya-ranjith-sai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded bg-surface-dark text-background-main hover:bg-accent-primary hover:text-white transition-all transform hover:scale-110 shadow-sm group">
                 <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-pulse"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/_ranjith_sai?igsh=enlrbTg1ZnM4NDlj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded bg-surface-dark text-background-main hover:bg-[#E1306C] hover:text-white transition-all transform hover:scale-110 shadow-sm group">
                 <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-[spin_3s_linear_infinite]"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* Direct Mail */}
              <a href={`mailto:${emailId}`} onClick={handleMailClick} className="w-10 h-10 flex items-center justify-center rounded bg-surface-dark text-background-main hover:bg-accent-warning hover:text-black border border-transparent hover:border-accent-warning/30 transition-all transform hover:scale-110 shadow-sm">
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>
              </a>
           </div>

           {/* Call to Actions */}
           <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start w-full">
              <a 
                 href="https://wa.me/919440754054?text=Hello%20Ranjith!%20I%20am%20getting%20in%20touch%20from%20your%20portfolio."
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full sm:w-auto px-6 py-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-black font-mono text-xs font-bold uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2"
              >
                 <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                 INITIATE WHATSAPP CHAT
              </a>
             <a
             ///Users/ranjith/development/RanjithSai_profile/public/Ranjith_Sai_Vadithya_.pdf
                 href="/Ranjith_Sai_Vadithya_.pdf"
                 download
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full sm:w-auto px-6 py-3 bg-transparent text-text-primary border border-[#2f74aa] hover:bg-[#2f74aa]/10 hover:text-[#2f74aa] hover:border-[#2f74aa] font-mono text-xs font-bold uppercase tracking-widest transition-all text-center"
              >
                 [ GET_RESUME.pdf ]
              </a>
           </div>
        </div>
      </section>

      {/* IMAGE MODAL PORTAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative w-full max-w-2xl aspect-square md:aspect-auto md:h-[80vh] bg-[#050505] border border-[#222] shadow-[0_0_50px_rgba(0,0,0,1)] p-2">
              <button 
                 onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                 className="absolute top-4 right-4 z-20 font-mono text-xs text-white bg-black border border-[#333] hover:border-accent-warning hover:text-accent-warning px-3 py-1 transition-colors"
              >
                [ X ] TERMINATE_VIEW
              </button>
              <div className="w-full h-full relative" onClick={(e) => e.stopPropagation()}>
                <Image 
                  src="/dev_profile.png" 
                  alt="Developer Profile Silhouette Full" 
                  layout="fill" 
                  objectFit="contain" 
                  className="pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEC 1: CAREER EXPERIENCE — accordion so all roles stay in view */}
      <section className="relative w-full mt-8">
        <h3 className="font-mono text-xl font-bold uppercase mb-8 border-b-2 border-text-muted/20 pb-2">SEC_1: Career Timeline</h3>
        
        <div className="border border-[#222] bg-surface-card mb-12 overflow-hidden">
          {careerRoles.map((role, i) => {
            const isOpen = activeCareerId === role.id;
            const isHovered = hoveredCareerId === role.id;
            const showBar = isOpen || isHovered;

            return (
              <div key={role.id} className={i < careerRoles.length - 1 ? "border-b border-[#222]" : ""}>
                <motion.button
                  type="button"
                  onClick={() => setActiveCareerId(isOpen ? "" : role.id)}
                  onHoverStart={() => setHoveredCareerId(role.id)}
                  onHoverEnd={() => setHoveredCareerId(null)}
                  whileHover={reduceMotion ? undefined : { x: 3 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                  className="w-full text-left px-5 md:px-8 py-5 relative outline-none"
                  style={{
                    backgroundColor: isHovered && !isOpen ? "rgba(255,255,255,0.02)" : undefined,
                  }}
                >
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 w-1 origin-top ${role.bar}`}
                    initial={false}
                    animate={{
                      scaleY: showBar ? 1 : 0,
                      opacity: isOpen ? 1 : isHovered ? 0.5 : 0,
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 320, damping: 28 }
                    }
                  />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <h4 className={`font-black text-lg md:text-xl uppercase tracking-tight ${isOpen ? "text-text-primary" : "text-text-secondary"}`}>
                        {role.company}
                      </h4>
                      <p className={`font-mono text-sm font-bold mt-1 ${isOpen ? role.accent : "text-text-muted"}`}>
                        {role.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-xs text-text-muted md:text-right">
                        <div>{role.period}</div>
                        {role.location && <div>{role.location}</div>}
                      </div>
                      <motion.span
                        className={`font-mono text-xs inline-block ${isOpen ? role.accent : "text-text-muted"}`}
                        animate={reduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                        transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
                      >
                        {isOpen ? "[−]" : "[+]"}
                      </motion.span>
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <ul className="font-mono text-xs md:text-sm text-text-secondary space-y-2 ml-4 list-disc leading-relaxed px-5 md:px-8 pb-6">
                        {role.bullets.map((bullet, bi) => (
                          <motion.li
                            key={bullet}
                            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : { delay: 0.04 * bi, duration: 0.2 }
                            }
                          >
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="relative w-full border border-[#111] overflow-hidden">
          <h4 className="font-mono text-sm font-bold uppercase mb-0 border-b border-[#222] pb-4 pt-4 px-6 bg-[#0a0a0a] text-text-muted">Milestone Track</h4>
          <TimelineSection />
        </div>
      </section>

      {/* SEC 2: PROXO SYSTEM DIAGRAM */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 border-b-2 border-text-muted/20 pb-2">SEC_2: Praxo Core Sys</h3>
        <div className="bg-background-secondary border border-text-muted/20 p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative">
          <div className="w-full md:w-1/3 bg-surface-dark text-background-main p-6 border-l-4 border-accent-primary">
            <h4 className="font-bold text-lg mb-2">CLIENT_PROXY</h4>
            <p className="text-xs font-mono text-text-muted">Distributing load across decentralized instances.</p>
          </div>
          
          <div className="hidden md:flex flex-1 items-center justify-center relative">
            <div className="w-full h-1 border-t-2 border-dashed border-text-muted relative">
              <motion.div 
                className="absolute top-[-3px] left-0 w-2 h-2 bg-accent-energy"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-surface-dark text-background-main p-6 border-r-4 border-accent-energy">
            <h4 className="font-bold text-lg mb-2">CORE_ROUTER</h4>
            <p className="text-xs font-mono text-text-muted">Process tracking & connection termination.</p>
          </div>
        </div>
      </section>

      {/* SEC 3: TECHNICAL ARSENAL & PLATFORMS */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase mb-8 border-b-2 border-text-muted/20 pb-2">SEC_3: Technical Arsenal & Integrations</h3>
        <div className="w-full min-h-[500px] bg-surface-dark relative overflow-hidden group p-6 md:p-12">
          {/* Interactive Background Grid Expanded */}
          <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 grid-rows-4">
            {[...Array(24)].map((_, i) => (
              <motion.div 
                key={i}
                className="border border-background-main/5 bg-background-main/5"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.9)", scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
          
          {/* Floating Showcase Cards Container */}
          <div className="z-10 relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full h-full">
            {/* Card 1: Architectures */}
            <motion.div 
              className="bg-background-main text-text-primary px-8 py-6 border-b-4 border-accent-energy shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-black text-xl uppercase mb-2">Microservice Infrastructure</h4>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">Designed and developed Java Spring Boot microservices and REST APIs supporting core social-media, creator, rewards, and financial workflows with a focus on data integrity.</p>
            </motion.div>

            {/* Card 2: Spider Hit / Enterprise */}
            <motion.div 
              className="bg-background-main text-text-primary px-8 py-6 border-b-4 border-accent-primary shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-center md:translate-y-12"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-black text-xl uppercase mb-2">Spider Hit Platform</h4>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">Developed and maintained 12+ enterprise and e-commerce applications using Laravel, MySQL, React.js, and REST APIs across authentication, payments, bookings, and admin operations.</p>
            </motion.div>

            {/* Card 3: AI & Integrations */}
            <motion.div 
              className="bg-background-main text-text-primary px-8 py-6 border-b-4 border-accent-secondary shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-black text-xl uppercase mb-2">AI Gateway & Integrations</h4>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">Built AI Gateway with Groq/Gemini fallbacks for resume/JD parsing and candidate matching on RonoJobs, plus Zoom OAuth, WhatsApp/SMS notifications, and SFTP/IMPS settlement pipelines.</p>
            </motion.div>

            {/* Card 4: Data Layer */}
            <motion.div 
              className="bg-background-main text-text-primary px-8 py-6 border-b-4 border-accent-warning shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-center md:translate-y-12"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-black text-xl uppercase mb-2">OptimiZED Data Layers</h4>
              <p className="font-mono text-sm text-text-secondary leading-relaxed">Designed Redis-backed personalized feeds and recommendation systems, optimized MySQL queries and indexing, and reduced database overhead by ~25% in production.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEC 4: PHILOSOPHY */}
      <section className="mb-24">
        <div className="p-8 border-2 border-surface-dark bg-surface-card relative">
          <div className="absolute -top-3 left-4 bg-background-main px-2 font-mono text-sm font-bold text-surface-dark">
             &lt;PHILOSOPHY /&gt;
          </div>
          <p className="font-mono text-lg text-text-primary leading-relaxed">
            I don't just write code. I build <span className="bg-surface-dark text-background-main px-1 font-bold">ENGINES</span>. <br/><br/>
            I approach software architecture like mechanical engineering. Every microservice, state object, and database call is a gear in a larger system. It must be efficient, fault-tolerant, and exceptionally designed.
          </p>
          
          <Link href="/contact" className="mt-8 px-6 py-3 bg-accent-primary text-surface-card font-bold font-mono tracking-widest uppercase hover:bg-surface-dark hover:text-background-main transition-colors border-2 border-transparent hover:border-accent-primary inline-block">
            INITIALIZE_CONTACT
          </Link>
        </div>
      </section>

    </div>
  );
}
