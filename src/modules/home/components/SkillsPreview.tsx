"use client";

import { motion } from "framer-motion";

export function SkillsPreview() {
  const skillCategories = [
    {
      title: "SYS.BACKEND",
      color: "border-accent-primary",
      bgCol: "bg-accent-primary",
      skills: ["Java", "Spring Boot", "Microservices", "Laravel (MVC)", "REST APIs", "Middleware Logic"]
    },
    {
      title: "SYS.FRONTEND",
      color: "border-accent-energy",
      bgCol: "bg-accent-energy",
      skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "HTML5 / CSS3", "Responsive UI"]
    },
    {
      title: "SYS.DATA_INFRA",
      color: "border-[#475569]", // Slate 600 representing DB/Systems
      bgCol: "bg-[#475569]",
      skills: ["MySQL", "Relational Modeling", "Query Optimization", "SFTP / IMPS", "Razorpay Integration", "Platform Analytics"]
    }
  ];

  return (
    <div className="sticky top-0 w-full h-[100dvh] flex flex-col justify-center items-center bg-background-main shadow-[0_-15px_30px_rgba(0,0,0,0.4)] z-30 overflow-hidden text-text-primary">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-text-muted/5 to-transparent pointer-events-none" />
       
       <div className="max-w-6xl w-full px-6 md:px-8 relative z-10 -mt-10 md:mt-0">
          <motion.h2 
             className="text-text-primary font-mono text-2xl md:text-4xl font-black uppercase tracking-widest pb-2 border-b-4 border-text-muted/20 mb-8 md:mb-16"
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            03 // TECHNICAL_STACK
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 w-full max-h-[65vh] overflow-y-auto custom-scrollbar pr-2 pb-4">
             {skillCategories.map((category, i) => (
                <motion.div
                  key={category.title}
                  className={`w-full bg-surface-card border-t-4 ${category.color} p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                  <h3 className="font-mono font-bold text-lg mb-6 border-b border-text-muted/20 pb-2">{category.title}</h3>
                  <ul className="flex flex-col gap-3 md:gap-4">
                    {category.skills.map(skill => (
                      <li key={skill} className="flex items-center gap-3">
                         <div className={`w-2 h-2 rounded-none ${category.bgCol}`} />
                         <span className="font-mono text-sm lg:text-base text-text-secondary">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
             ))}
          </div>
       </div>
    </div>
  );
}
