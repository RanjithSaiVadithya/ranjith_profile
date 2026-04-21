"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type TermState = "IDLE" | "AWAITING_NAME" | "AWAITING_MOBILE" | "AWAITING_EMAIL" | "AWAITING_MESSAGE";

export function FooterCLI() {
  const [input, setInput] = useState("");
  const [termState, setTermState] = useState<TermState>("IDLE");
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "", message: "" });
  
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS_READY: Interactive root terminal initialized.",
    "Welcome to RPS Terminal.",
    "Try typing 'contact' to initiate the communication flow, or 'help' for commands.",
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = input.trim();
      setInput("");
      
      const prompt = termState === "IDLE" ? "root@system:~#" : ">";
      setTerminalLogs(prev => [...prev, `${prompt} ${val}`]);

      if (termState === "IDLE") {
          const cmd = val.toLowerCase();
          if (cmd === "contact") {
              setTermState("AWAITING_NAME");
              setTerminalLogs(prev => [
                ...prev, 
                ">> INITIALIZING SECURE CONTACT PROTOCOL...", 
                ">> Please provide your details to dispatch a message.",
                "? Enter your Full Name:"
              ]);
          } else if (cmd === "clear") {
              setTerminalLogs([
                "SYS_READY: Interactive root terminal initialized.",
                "Welcome to RPS Terminal.",
                "Try typing 'contact' to initiate the communication flow, or 'help' for commands."
              ]);
          } else if (cmd === "help") {
              setTerminalLogs(prev => [
                ...prev, 
                ">> AVAILABLE COMMANDS:", 
                "  contact   - Initialize secure message protocol", 
                "  clear     - Wipe terminal screen", 
                "  help      - Show this menu"
              ]);
          } else if (cmd !== "") {
              setTerminalLogs(prev => [...prev, `>> ERROR: Command '${cmd}' not recognized. Type 'help'.`]);
          }

      } else if (termState === "AWAITING_NAME") {
          if (!val) {
            setTerminalLogs(prev => [...prev, `>> ERROR: Name cannot be empty.`, `? Enter your Full Name:`]);
            return;
          }
          setFormData(prev => ({ ...prev, name: val }));
          setTermState("AWAITING_MOBILE");
          setTerminalLogs(prev => [...prev, `? Enter your Mobile Number:`]);

      } else if (termState === "AWAITING_MOBILE") {
          setFormData(prev => ({ ...prev, mobile: val }));
          setTermState("AWAITING_EMAIL");
          setTerminalLogs(prev => [...prev, `? Enter your Email Address:`]);

      } else if (termState === "AWAITING_EMAIL") {
          setFormData(prev => ({ ...prev, email: val }));
          setTermState("AWAITING_MESSAGE");
          setTerminalLogs(prev => [...prev, `? Enter your Message:`]);

      } else if (termState === "AWAITING_MESSAGE") {
          if (!val) {
             setTerminalLogs(prev => [...prev, `>> ERROR: Message cannot be empty.`, `? Enter your Message:`]);
             return;
          }
          setTermState("IDLE");
          setTerminalLogs(prev => [
            ...prev, 
            ">> ENCRYPTING PAYLOAD...",
            ">> TRANSMISSION SUCCESSFUL.",
            `// Thank you for reaching out, ${formData.name || 'User'}.`,
            "// Your message has been sent. Ranjith Sai will process this node and respond shortly.",
            "SYS_READY: Awaiting user input..."
          ]);
          // Optional: Hook this up to an actual backend email API later.
          // fetch('/api/contact', { method: 'POST', body: JSON.stringify({...formData, message: val}) })
      }
    }
  };

  const currentPrompt = termState === "IDLE" ? "root@system:~#" : ">";

  return (
    <div className="sticky top-0 w-full bg-black flex flex-col justify-center items-center h-[100dvh] border-t border-[#111] z-[50] overflow-hidden">
      
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
         backgroundImage: `linear-gradient(#00F2FF 1px, transparent 1px), linear-gradient(90deg, #00F2FF 1px, transparent 1px)`,
         backgroundSize: '80px 80px',
         backgroundPosition: 'center center'
      }}>
         <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="max-w-6xl w-full px-6 md:px-8 relative z-10 flex flex-col md:flex-row gap-12 items-center justify-between">
        
        {/* Left Side: Contact Information */}
        <div className="flex-1 w-full flex flex-col">
          <motion.h2 
             className="text-white font-mono text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-widest mb-6"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
             INITIATE <br className="hidden md:block" /> HANDSHAKE.
          </motion.h2>
          
          <div className="w-24 h-2 bg-accent-energy mb-8" />

          <div className="flex flex-col gap-6 font-mono text-[#888]">
             <div className="flex flex-col">
               <span className="text-[10px] text-[#444] tracking-widest uppercase mb-1">SECURE_COMMS // EMAIL</span>
               <a href="mailto:ranjithsaivadithya14@gmail.com" className="text-white text-lg md:text-xl hover:text-accent-energy transition-colors">ranjithsaivadithya14@gmail.com</a>
             </div>

             <div className="flex flex-col">
               <span className="text-[10px] text-[#444] tracking-widest uppercase mb-1">NODE_LOCATION // CITY</span>
               <span className="text-white text-lg md:text-xl tracking-wider">Bangalore, India</span>
             </div>

             <div className="flex flex-col">
               <span className="text-[10px] text-[#444] tracking-widest uppercase mb-1">DIRECT_LINE // PING</span>
               <span className="text-accent-primary text-lg md:text-xl">+91 9440754054</span>
             </div>
          </div>
        </div>

        {/* Right Side: Interactive Terminal CLI */}
        <div className="w-full md:w-1/2 max-w-lg border border-[#333] bg-[#050505] font-mono shadow-[0_0_30px_rgba(0,242,255,0.05)] flex flex-col">
          {/* Terminal Header */}
          <div className="w-full bg-[#111] px-4 py-2 border-b border-[#333] flex items-center justify-between">
            <span className="text-xs text-[#555] tracking-widest">RSP_TERMINAL_V2</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#333]" />
              <div className="w-3 h-3 rounded-full bg-[#333]" />
              <div className="w-3 h-3 rounded-full bg-accent-energy" />
            </div>
          </div>
          
          {/* Terminal Body */}
          <div 
             ref={scrollRef}
             className="p-6 flex flex-col gap-2 h-[350px] overflow-y-auto custom-scrollbar"
          >
             {terminalLogs.map((log, i) => {
                let colorClass = "text-[#888]"; // fallback
                if (log.includes('ERROR')) colorClass = "text-accent-warning";
                else if (log.includes('SUCCESS') || log.includes('Thank you')) colorClass = "text-accent-energy";
                else if (log.startsWith('root@') || log.startsWith('> ')) colorClass = "text-white";
                else if (log.startsWith('? ')) colorClass = "text-accent-primary";

                // Ensure spaces are respected using whitespace-pre-wrap
                return (
                  <div key={i} className={`text-sm tracking-tight whitespace-pre-wrap ${colorClass}`}>
                    {log}
                  </div>
                );
             })}
             
             {/* Input Action */}
             <div className="flex items-center text-accent-primary text-sm mt-2 shrink-0">
               <span className="mr-3 shrink-0">{currentPrompt}</span>
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={handleCommand}
                 className="bg-transparent outline-none border-none text-white w-full flex-1 caret-accent-energy"
                 autoFocus
                 spellCheck={false}
                 autoComplete="off"
               />
             </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-4 font-mono text-[10px] text-[#333] tracking-widest w-full text-center">
         SYSTEM SEQUENCE COMPLETE. DEPLOYED BY RANJITH SAI.
      </div>
    </div>
  );
}
