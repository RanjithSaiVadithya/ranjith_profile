import { ProjectsModule } from "@/modules/projects/ProjectsModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | RanjithSai Portfolio",
  description: "RonoJobs AI recruitment platform, Praxo social media microservices, Ride Wheels rental APIs, and Atal Incubation Centre portal — projects by Ranjith Sai Vadithya.",
  keywords: ["RanjithSai Projects", "RonoJobs", "Praxo Microservices", "Ride Wheels", "AI Gateway", "Spring Boot", "Node.js"],
};

export default function ProjectsPage() {
  return <ProjectsModule />;
}
