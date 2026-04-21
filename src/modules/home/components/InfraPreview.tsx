"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function InfraPreview() {
  const [deviceData, setDeviceData] = useState({
    cores: "...",
    ram: "...",
    os: "...",
    browser: "...",
    res: "...",
    network: "...",
  });

  const [logs, setLogs] = useState<string[]>([
    "SYS_INIT: Intercepting client handshake...",
    "AUTH_OK: Bypassing local permission walls.",
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nav = navigator as any;
      
      // Basic OS detection
      const ua = nav.userAgent || "";
      const osDetect = ua.includes("Win") ? "Windows" : 
                       ua.includes("Mac") ? "MacOS" : 
                       ua.includes("Linux") ? "Linux" : 
                       ua.includes("Android") ? "Android" : 
                       ua.includes("like Mac") ? "iOS" : "Unknown OS";
                       
      // Basic Browser detection
      let browser = "Web Engine";
      if (ua.includes("Firefox")) browser = "Firefox";
      else if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
      else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
      else if (ua.includes("Edg")) browser = "Edge";
      
      // Hardware
      const cores = nav.hardwareConcurrency ? nav.hardwareConcurrency.toString() : "SECURE";
      const ram = nav.deviceMemory ? `${nav.deviceMemory}GB+` : "HIDDEN";
      const network = nav.connection?.effectiveType ? nav.connection.effectiveType.toUpperCase() : "SECURE";

      setDeviceData({
        cores,
        ram,
        os: osDetect,
        browser,
        res: `${window.innerWidth}x${window.innerHeight}`,
        network,
      });

      // Construct dynamic logs generated off real device data
      const dynamicLogs = [
        `SCAN_OK: Detected [${osDetect}] environment structure.`,
        `THREADS: Mapping UI to [${cores}] physical/logical cores.`,
        `MEMORY: Reserved [${ram}] cache layout block.`,
        `RENDER: Engine locked at [${window.innerWidth}x${window.innerHeight}] exact pixel matrix.`,
        `NETWORK: Ping success routed via [${network}] payload speed.`,
        `SYSTEM: All client-side parameters verified over ${browser}.`,
      ];

      let count = 0;
      const interval = setInterval(() => {
        setLogs((prev) => {
          const newLogs = [...prev, dynamicLogs[count % dynamicLogs.length]];
          return newLogs.length > 7 ? newLogs.slice(1) : newLogs;
        });
        count++;
      }, 2500);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="sticky top-0 h-[100dvh] w-full bg-[#020202] flex flex-col items-center justify-center relative shadow-[0_-20px_40px_rgba(0,0,0,0.9)] border-t border-[#1a1a1a] z-[40] overflow-hidden">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
         backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
         backgroundSize: '40px 40px'
      }} />

      <div className="max-w-6xl w-full px-6 md:px-8 relative z-10">
        <motion.h2 
           className="text-white font-mono text-2xl md:text-4xl uppercase tracking-widest mb-8 md:mb-12 pb-2 border-b-2 border-[#333]"
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
         >
           04 // CLIENT_TELEMETRY
         </motion.h2>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            
            {/* Real Data Sensors (Left Column) */}
            <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2 font-mono text-xs text-[#555] mb-2 border-b border-[#222] pb-1 uppercase tracking-widest">Local Hardware Scan</div>
               
               <div className="bg-[#080808] p-4 border border-[#111] flex flex-col justify-between group hover:border-[#333] transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-2 h-full bg-accent-primary/20 group-hover:bg-accent-primary/80 transition-colors" />
                 <span className="font-mono text-[10px] text-[#555] mb-2">SYSTEM_OS</span>
                 <span className="text-white font-mono text-sm uppercase">{deviceData.os}</span>
               </div>

               <div className="bg-[#080808] p-4 border border-[#111] flex flex-col justify-between group hover:border-[#333] transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-2 h-full bg-accent-energy/20 group-hover:bg-accent-energy/80 transition-colors" />
                 <span className="font-mono text-[10px] text-[#555] mb-2">BROWSER</span>
                 <span className="text-white font-mono text-sm uppercase">{deviceData.browser}</span>
               </div>

               <div className="bg-[#080808] p-4 border border-[#111] flex flex-col justify-between group hover:border-[#333] transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-2 h-full bg-accent-success/20 group-hover:bg-accent-success/80 transition-colors" />
                 <span className="font-mono text-[10px] text-[#555] mb-2">LOGICAL_CORES</span>
                 <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
                   {deviceData.cores} <motion.div className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
                 </span>
               </div>

               <div className="bg-[#080808] p-4 border border-[#111] flex flex-col justify-between group hover:border-[#333] transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-2 h-full bg-[#555]/20 group-hover:bg-[#555]/80 transition-colors" />
                 <span className="font-mono text-[10px] text-[#555] mb-2">RAM_BLOCK</span>
                 <span className="text-white font-mono text-sm uppercase">{deviceData.ram}</span>
               </div>
            </div>

            {/* Terminal Stream (Middle & Right Column) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
               <div className="font-mono text-xs text-[#555] mb-2 border-b border-[#222] pb-1 uppercase tracking-widest flex justify-between">
                 <span>Active Connection Logs</span>
                 <span className="text-accent-energy flex items-center gap-2"><span className="w-2 h-2 bg-accent-energy animate-pulse inline-block" /> ENGAGED</span>
               </div>
               
               <div className="w-full h-[200px] lg:h-[260px] bg-black border border-[#1a1a1a] p-6 font-mono text-sm overflow-hidden flex flex-col shadow-inner relative">
                 <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black to-transparent z-10" />
                 <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black to-transparent z-10" />
                 
                 <div className="flex flex-col justify-end h-full">
                    <AnimatePresenceWrapper logs={logs} />
                 </div>
               </div>
               
               {/* Display Matrix Footer */}
               <div className="flex font-mono text-[10px] tracking-widest text-[#555] gap-6 mt-2">
                 <span>VIEWPORT_MATRIX: [ {deviceData.res} ]</span>
                 <span>PAYLOAD_NETWORK: [ {deviceData.network} ]</span>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}

// Extracted to handle animations cleanly within the mapped array
function AnimatePresenceWrapper({ logs }: { logs: string[] }) {
  return (
    <>
      {logs.map((log, index) => (
        <motion.div
          key={`${log}-${index}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-3 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          <span className="text-[#444] mr-3" suppressHydrationWarning>
            [{new Date().toISOString().split('T')[1].split('.')[0]}]
          </span>
          <span className="text-accent-primary">{log.split(': ')[0]}:</span> 
          <span className="text-[#888] ml-2">{log.split(': ')[1] || log}</span>
        </motion.div>
      ))}
      <motion.div 
        animate={{ opacity: [0, 1] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-2 h-4 bg-accent-energy mt-2"
      />
    </>
  );
}
