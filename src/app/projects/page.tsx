import { ProjectsModule } from "@/modules/projects/ProjectsModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | RanjithSai Portfolio",
  description: "Explore backend microservices, full stack architectures, e-commerce applications, and automated workflows engineered by RanjithSai.",
  keywords: ["RanjithSai Projects", "Praxo Microservices", "Ride Wheels", "Spider Hit Infotech", "N8N Automation", "RanjithSai Software Engineer"],
};

export default function ProjectsPage() {
  return <ProjectsModule />;
}
