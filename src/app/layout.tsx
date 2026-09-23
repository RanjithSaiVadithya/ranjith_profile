import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layouts/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ranjith-portfolio-core.web.app"),
  title: "RanjithSai Vadithya | Backend Engineer | Java | Spring Boot",
  description: "Backend Engineer with nearly 3 years of experience building production applications using Java, Spring Boot, Microservices, Laravel, Redis, MySQL, and React.",
  keywords: ["RanjithSai", "Ranjith Sai Vadithya", "Backend Engineer", "Java", "Spring Boot", "Microservices", "Laravel", "Redis", "MySQL", "React", "Bangalore"],
  openGraph: {
    title: "RanjithSai Vadithya | Backend Engineer",
    description: "Backend Engineer specializing in Java, Spring Boot, Microservices, Redis, and production performance.",
    url: "https://ranjith-portfolio-core.web.app",
    siteName: "RanjithSai Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RanjithSai Vadithya | Backend Engineer",
    description: "Backend Engineer specializing in Java, Spring Boot, Microservices, Redis, and production performance.",
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
