import { ProjectsModule } from "@/modules/projects/ProjectsModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | RanjithSai Portfolio",
  description: "Praxo social media microservices, Ride Wheels rental APIs, and Atal Incubation Centre portal — projects by Ranjith Sai Vadithya.",
  keywords: ["RanjithSai Projects", "Praxo Microservices", "Ride Wheels", "Atal Incubation Centre", "Spring Boot", "Laravel"],
};

export default function ProjectsPage() {
  return <ProjectsModule />;
}
