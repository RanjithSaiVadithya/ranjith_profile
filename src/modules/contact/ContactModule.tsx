"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { animations } from "@/core/AnimationEngine";
import { Terminal, Send, CheckCircle2, Server, Database, Code2 } from "lucide-react";

export function ContactModule() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getValidatedPhone = () => {
    if (!countryCode && !mobileNumber) {
      return "";
    }

    if (!countryCode || !mobileNumber) {
      setPhoneError("Please enter both country code and mobile number.");
      return null;
    }

    const normalizedCountryCode = countryCode.trim();
    const normalizedMobileNumber = mobileNumber.trim();
    const fullNumber = `${normalizedCountryCode}${normalizedMobileNumber}`;

    if (!/^\+[1-9]\d{0,2}$/.test(normalizedCountryCode)) {
      setPhoneError("Country code must start with + and contain 1 to 3 digits.");
      return null;
    }

    if (!/^\d+$/.test(normalizedMobileNumber)) {
      setPhoneError("Mobile number must contain digits only.");
      return null;
    }

    if (!/^\+[1-9]\d{1,14}$/.test(fullNumber)) {
      setPhoneError("Use valid E.164 format (max 15 digits including country code).");
      return null;
    }

    if (normalizedCountryCode === "+33" && !/^[67]\d+$/.test(normalizedMobileNumber)) {
      setPhoneError("For France (+33), mobile numbers must start with 6 or 7.");
      return null;
    }

    setPhoneError("");
    return fullNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validatedPhone = getValidatedPhone();
    if (validatedPhone === null) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          phone: validatedPhone,
        })
      });
      
      if (res.ok) {
        setIsSuccess(true);
        // Reset after a while
        setTimeout(() => {
          setIsSuccess(false);
          setFormState({ name: "", email: "", message: "" });
          setCountryCode("+91");
          setMobileNumber("");
        }, 5000);
      } else {
        alert("TRANSMISSION_FAILED: Node rejected payload.");
      }
    } catch (e) {
      alert("ERROR: System offline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pastWorks = [
    {
      title: "Spider Hit Platform",
      role: "System Architect",
      tech: "Laravel & React",
      desc: "Architected scalable enterprise dashboards and e-commerce layers. Handled high-throughput data and modular api integration.",
      icon: <Server className="w-5 h-5 text-accent-primary" />
    },
    {
      title: "Praxo Core Microservices",
      role: "Backend Engineer",
      tech: "Node.js & Redis",
      desc: "Engineered distributed proxy nodes for handling complex asynchronous task queues across decentralized instances.",
      icon: <Database className="w-5 h-5 text-accent-energy" />
    },
    {
      title: "Advanced Integrations Sync",
      role: "API Specialist",
      tech: "N8N/Razorpay/WhatsApp",
      desc: "Streamlined business operations by embedding secure payment gateways and massive webhook pipelines.",
      icon: <Code2 className="w-5 h-5 text-accent-secondary" />
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 pt-12 px-4">
      {/* HEADER */}
      <motion.div variants={animations.slideLeft} initial="initial" animate="animate">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">05 // CONTACT_SYS</h2>
        <div className="w-24 h-2 bg-accent-energy" />
        <p className="font-mono text-text-secondary mt-4 text-sm leading-relaxed max-w-2xl">
          Reach out using the form below for project work, collaboration, or support.
          I usually reply within 24 hours.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start relative pb-24">
        
        {/* LEFT/TOP: TRANSMISSION TERMINAL FORM */}
        <motion.div 
           className="w-full bg-[#050505] border border-[#222] shadow-[0_0_30px_rgba(0,0,0,1)] relative z-10"
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-[#222] px-4 py-2 bg-[#111]">
            <div className="flex gap-2 items-center">
              <Terminal size={14} className="text-accent-energy" />
              <span className="font-mono text-[10px] text-text-muted font-bold tracking-widest">SECURE_PROXY_TERM // ID: 0x9f2</span>
            </div>
            <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
               <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
               <div className="w-2.5 h-2.5 rounded-full bg-accent-energy animate-pulse" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col p-6 md:p-10">
            {isSuccess ? (
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }} 
                 animate={{ scale: 1, opacity: 1 }} 
                 className="flex flex-col items-center justify-center py-20 text-center gap-4"
               >
                  <CheckCircle2 size={48} className="text-accent-success" />
                  <h3 className="text-2xl font-black text-white uppercase tracking-widest">Message Sent</h3>
                  <p className="font-mono text-text-secondary text-sm border-t border-[#333] pt-4 max-w-md">
                    Thank you for reaching out. Your message was received successfully and I will get back to you soon.
                  </p>
               </motion.div>
            ) : (
              <>
                {/* Name Input */}
                <div className="group mb-8">
                  <label className="font-mono text-xs uppercase text-text-secondary font-bold tracking-widest mb-1 block group-focus-within:text-accent-energy transition-colors">
                    Full Name
                  </label>
                  <div className="flex items-end">
                    <span className="font-mono text-accent-energy text-lg mr-2 leading-none mb-1">~#</span>
                    <input 
                      required
                      type="text" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="flex-1 bg-transparent border-b-2 border-[#333] tracking-wider text-white font-mono placeholder:text-zinc-400 focus:border-accent-energy focus:outline-none transition-colors pb-1"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="group mb-8">
                  <label className="font-mono text-xs uppercase text-text-secondary font-bold tracking-widest mb-1 block group-focus-within:text-accent-primary transition-colors">
                    Email Address
                  </label>
                  <div className="flex items-end">
                    <span className="font-mono text-accent-primary text-lg mr-2 leading-none mb-1">~#</span>
                    <input 
                      required
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="flex-1 bg-transparent border-b-2 border-[#333] tracking-wider text-white font-mono placeholder:text-zinc-400 focus:border-accent-primary focus:outline-none transition-colors pb-1"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="group mb-8">
                  <label className="font-mono text-xs uppercase text-text-secondary font-bold tracking-widest mb-1 block group-focus-within:text-accent-success transition-colors">
                    Phone Number (Optional)
                  </label>
                  <div className="flex items-end gap-3">
                    <span className="font-mono text-accent-success text-lg leading-none mb-1">~#</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={countryCode}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^\d+]/g, "");
                        const normalized = raw ? `+${raw.replace(/\+/g, "")}` : "";
                        setCountryCode(normalized);
                        if (phoneError) setPhoneError("");
                      }}
                      className="w-28 bg-transparent border-b-2 border-[#333] tracking-wider text-white font-mono placeholder:text-zinc-400 focus:border-accent-success focus:outline-none transition-colors pb-1"
                      placeholder="+91"
                      maxLength={4}
                    />
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value.replace(/\D/g, ""));
                        if (phoneError) setPhoneError("");
                      }}
                      className="flex-1 bg-transparent border-b-2 border-[#333] tracking-wider text-white font-mono placeholder:text-zinc-400 focus:border-accent-success focus:outline-none transition-colors pb-1"
                      placeholder="9876543210"
                    />
                  </div>
                  <p className="font-mono text-[10px] text-text-muted mt-2">
                    Format: +CountryCode and digits only. Example: +91 9876543210 (E.164 max 15 digits).
                  </p>
                  {phoneError && (
                    <p className="font-mono text-[10px] text-accent-warning mt-1">{phoneError}</p>
                  )}
                </div>

                {/* Message Input */}
                <div className="group mb-12">
                  <label className="font-mono text-xs uppercase text-text-secondary font-bold tracking-widest mb-1 block group-focus-within:text-white transition-colors">
                    Project Details / Message
                  </label>
                  <div className="flex items-start">
                    <span className="font-mono text-white text-lg mr-2 leading-none mt-1">~#</span>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="flex-1 bg-transparent border-l-2 border-b-2 border-[#333] p-2 tracking-wider text-white font-mono placeholder:text-zinc-400 focus:border-white focus:outline-none transition-colors resize-none"
                      placeholder="Tell me what you need, timeline, and any important details."
                    />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="relative overflow-hidden w-full bg-white text-black font-mono font-bold uppercase tracking-[0.2em] py-4 hover:bg-zinc-300 disabled:opacity-50 disabled:bg-zinc-500 transition-all group flex items-center justify-center gap-3"
                >
                  <span className="z-10">{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                  {!isSubmitting && <Send size={16} className="z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  
                  {/* Glitch hover background */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </>
            )}
          </form>
        </motion.div>

        {/* RIGHT/BOTTOM: SHOWCASE LOGS */}
        <motion.div 
           className="w-full flex flex-col gap-6"
           initial={{ x: 20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 border-b border-text-muted/20 pb-4">
             <div className="w-2 h-6 bg-accent-primary" />
             <h3 className="font-mono text-xl font-bold uppercase tracking-widest text-text-primary">Project Experience & Capability Highlights</h3>
          </div>

          <div className="flex flex-col gap-4">
            {pastWorks.map((work, idx) => (
              <motion.div 
                 key={idx}
                 className="group bg-[#0A0A0A] border border-[#222] p-5 hover:border-[#444] transition-colors relative overflow-hidden flex gap-4"
                 whileHover={{ x: 5 }}
              >
                 {/* Cyber Line Left */}
                 <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#222] group-hover:bg-accent-energy transition-colors" />
                 
                 <div className="mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    {work.icon}
                 </div>
                 
                 <div className="flex-1">
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                       {work.title}
                       <span className="font-mono text-[9px] bg-[#111] border border-[#333] px-2 py-0.5 text-text-muted">
                          {work.tech}
                       </span>
                    </h4>
                    <span className="block font-mono text-[10px] text-accent-primary uppercase tracking-widest mb-3">
                       ROLE // {work.role}
                    </span>
                    <p className="text-sm text-text-secondary leading-relaxed">
                       {work.desc}
                    </p>
                 </div>
              </motion.div>
            ))}
          </div>

          {/* Download Res / External link mini block */}
          <div className="mt-4 p-6 border border-dashed border-[#333] bg-[#050505] flex flex-col sm:flex-row items-start sm:items-center justify-between group gap-4">
             <div className="flex flex-col gap-3">
                <div>
                   <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">Direct Connect (Email)</p>
                   <a href="mailto:ranjithsaivadithya14@gmail.com" className="text-white font-bold hover:text-accent-energy transition-colors">ranjithsaivadithya14@gmail.com</a>
                </div>
                <div>
                   <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">Secure Line (Phone)</p>
                   <a href="tel:+919440754054" className="text-white font-bold hover:text-accent-success transition-colors">+91 944 075 4054</a>
                </div>
             </div>
             <a
               href="/Ranjith_Sai_Vadithya.pdf"
               download
               target="_blank"
               rel="noopener noreferrer"
               className="font-mono text-[10px] font-bold border border-[#444] px-4 py-2 text-white hover:bg-white hover:text-black uppercase tracking-widest transition-colors w-full sm:w-auto text-center"
             >
                [ GET_RESUME.pdf ]
             </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
