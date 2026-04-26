import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layouts/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ranjith-portfolio-core.web.app"),
  title: "RanjithSai Vadithya | Full Stack Developer & Sys Architect",
  description: "Developer portfolio of RanjithSai (Anjit). Exploring React, Next.js, Node.js, Spring Boot, Laravel, and dynamic architectural engineering.",
  keywords: ["RanjithSai", "Anjit", "Ranjith", "RanjithSai Vadithya", "RanjithSai portfolio", "Full Stack Developer", "Software Engineer", "Web Developer", "React", "Next.js", "Electrical & Electronics Engineering", "B.Tech"],
  openGraph: {
    title: "RanjithSai Vadithya | Full Stack Developer",
    description: "Interactive Engineering Control System representing RanjithSai's developer career.",
    url: "https://ranjith-portfolio-core.web.app",
    siteName: "RanjithSai Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RanjithSai Vadithya | Full Stack Developer",
    description: "Interactive Engineering Control System representing RanjithSai's developer career.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background-main text-text-primary`}>
        <Navigation />
        <main className="relative z-0 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
