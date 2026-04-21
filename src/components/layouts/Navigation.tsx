"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "00//SYS_HOME" },
    { href: "/about", label: "01//ABOUT" },
    { href: "/projects", label: "02//PROJECTS" },
    { href: "/skills", label: "03//SKILLS" },
    { href: "/feed", label: "04//FEED" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b transition-colors duration-500",
          isHome && !isOpen
            ? "bg-transparent border-transparent text-white" 
            : "bg-background-main border-text-muted/20 text-text-primary"
        )}
      >
        <div className="font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2 md:gap-3">
          <div className={cn("w-2.5 h-2.5 rounded-none animate-pulse", isHome && !isOpen ? "bg-accent-energy" : "bg-accent-primary")} />
          <span className="font-bold">RSP_CORE</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 font-mono text-xs tracking-tight">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "relative py-1.5 px-3 transition-colors duration-200",
                  isActive 
                    ? (isHome ? "text-white font-bold" : "text-background-main font-bold")
                    : (isHome ? "text-text-muted hover:text-white" : "text-text-secondary hover:text-text-primary")
                )}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      initial={false}
                      className={cn(
                        "absolute inset-0 border-t-2 -z-10",
                        isHome ? "bg-white/10 border-accent-energy" : "bg-text-primary border-accent-primary"
                      )}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    />
                  )}
                </AnimatePresence>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 relative z-[60]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed inset-0 z-[55] bg-background-main flex flex-col justify-center items-center px-8"
          >
            <div className="w-full h-full flex flex-col justify-center gap-8 font-mono text-xl tracking-widest uppercase">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  className="border-b border-text-muted/20 pb-4"
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={pathname === link.href ? "text-accent-primary font-black" : "text-text-secondary"}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
