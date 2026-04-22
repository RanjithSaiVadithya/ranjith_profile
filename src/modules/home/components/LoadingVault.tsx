"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingVault({ onComplete }: { onComplete: () => void }) {
  const sequence = [
    "SYS.INIT_SEQUENCE",
    "ESTABLISHING_CONNECTION",
    "DB_AUTH: MYSQL",
    "CACHE_LAYER: REDIS",
    "JAVA_SPRING_CORE",
    "LARAVEL_APIS",
    "REACT_UI_RENDER",
    "TAILWIND_V3",
    "SFTP_BANK_ACCESS",
    "RAZORPAY_GTY",
    "WHATSAPP_BUS_API",
    "N8N_AUTOMATION_CLI",
    "PRAXO_CREATOR_ECON",
    "RIDE_WHEELS_RENTALS",
    "PET_CARE_ECOMM",
    "PALLAKI_EVENT_SVC",
    "ATAL_INCUBATION_DATA",
    "RIGHTWAY_PHARMA",
    "MICROSERVICES_SYNC",
    "FULL_STACK_DEPLOYED",
    "RANJITH SAI VADITHYA"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [split, setSplit] = useState(false);

  useEffect(() => {
    if (currentIndex < sequence.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200); // 200ms per word = 4 seconds total
      return () => clearTimeout(timer);
    } else {
      // Reached the end ("RANJITH SAI VADITHYA")
      const finalTimer = setTimeout(() => {
        setSplit(true);
        setTimeout(onComplete, 800); // 800ms for vault to open before destroying
      }, 1200);
      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex, sequence.length, onComplete]);

  const isFinal = currentIndex === sequence.length - 1;

  if (split) {
    return (
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
        {/* Top Vault */}
        <motion.div
          className="w-full h-1/2 bg-black border-b-2 border-[#111]"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        />
        {/* Bottom Vault */}
        <motion.div
          className="w-full h-1/2 bg-black border-t-2 border-[#111]"
          initial={{ y: 0 }}
          animate={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <motion.div
        key={sequence[currentIndex]}
        initial={{ opacity: 0.5, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.1 }}
        className={`font-mono text-sm sm:text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-widest text-center px-4 ${
          isFinal ? "text-accent-energy drop-shadow-[0_0_15px_#00F2FF]" : "text-white"
        }`}
      >
        {sequence[currentIndex]}
      </motion.div>
    </div>
  );
}
