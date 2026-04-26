import { AboutModule } from "@/modules/about/AboutModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RanjithSai | Education & Career Timeline",
  description: "Learn about RanjithSai Vadithya's educational background, Electrical & Electronics Engineering B.Tech degree, and full stack developer career timeline.",
  keywords: ["RanjithSai Education", "Anjit Degree", "Electrical & Electronics Engineering", "B.Tech", "RanjithSai Vadithya College", "Spider Hit Infotech"],
};

export default function AboutPage() {
  return <AboutModule />;
}
