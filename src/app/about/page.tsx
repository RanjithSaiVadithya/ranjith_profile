import { AboutModule } from "@/modules/about/AboutModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RanjithSai | Backend Engineer Profile",
  description: "Senior Software Engineer & Tech Team Lead with nearly 3 years of experience in Java, Spring Boot, Node.js, Microservices, Laravel, Redis, and MySQL. Career timeline of Ranjith Sai Vadithya.",
  keywords: ["RanjithSai Education", "Backend Engineer", "Tech Team Lead", "Rayudu Group", "MudarDzApps Praxo", "Spider Hit Infotech"],
};

export default function AboutPage() {
  return <AboutModule />;
}
