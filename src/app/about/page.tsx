import { AboutModule } from "@/modules/about/AboutModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RanjithSai | Backend Engineer Profile",
  description: "Backend Engineer with nearly 3 years of experience in Java, Spring Boot, Microservices, Laravel, Redis, and MySQL. Education and career timeline of Ranjith Sai Vadithya.",
  keywords: ["RanjithSai Education", "Backend Engineer", "Electrical & Electronics Engineering", "B.Tech", "MudarDzApps Praxo", "Spider Hit Infotech"],
};

export default function AboutPage() {
  return <AboutModule />;
}
