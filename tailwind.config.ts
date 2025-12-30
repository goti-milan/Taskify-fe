import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Centralized theme colors
        theme: {
          // Light mode colors
          light: {
            bg: "#ffffff",
            surface: "#f8fafc",
            "surface-hover": "#f1f5f9",
            "text-primary": "#0f172a",
            "text-secondary": "#475569",
            "text-muted": "#64748b",
            border: "#e2e8f0",
            "border-hover": "#cbd5e1",
          },
          // Dark mode colors
          dark: {
            bg: "#0f172a",
            surface: "#1e293b",
            "surface-hover": "#334155",
            "text-primary": "#f8fafc",
            "text-secondary": "#cbd5e1",
            "text-muted": "#94a3b8",
            border: "#334155",
            "border-hover": "#475569",
          },
        },
        // Keep brand colors
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // Main brand color
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      transitionDuration: {
        theme: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
