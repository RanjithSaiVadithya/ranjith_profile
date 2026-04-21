import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: "#F8FAFC",
          secondary: "#EEF2F7",
        },
        surface: {
          card: "#FFFFFF",
          dark: "#0A0A0A",
        },
        accent: {
          primary: "#2563EB",
          secondary: "#7C3AED",
          energy: "#06B6D4",
          success: "#10B981",
          warning: "#F59E0B",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
