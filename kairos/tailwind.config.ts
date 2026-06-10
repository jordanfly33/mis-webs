import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   "#09090B",
          secondary: "#111113",
          tertiary:  "#1C1C1F",
        },
        accent: {
          primary:   "#E8A020",   // amber gold
          secondary: "#F5C84A",   // lighter gold
          tertiary:  "#C87A10",   // deep amber
        },
        content: {
          primary:   "#F4F4F5",
          secondary: "#A1A1AA",
          muted:     "#71717A",
        },
        border:  "#27272A",
        success: "#34D399",
        warning: "#FBBF24",
        error:   "#F87171",
      },
      fontFamily: {
        display: ["var(--font-syne)",    "Syne",    "system-ui", "sans-serif"],
        body:    ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        mono:    ["var(--font-dm-mono)", "DM Mono", "monospace"],
      },
      fontSize: {
        "fluid-h1":   "clamp(2.2rem, 5.5vw, 4rem)",
        "fluid-h2":   "clamp(1.5rem, 3vw, 2.25rem)",
        "fluid-h3":   "clamp(1.25rem, 2.5vw, 1.75rem)",
        "fluid-body": "clamp(0.95rem, 1.5vw, 1.05rem)",
      },
      letterSpacing: {
        tight:   "-0.025em",
        display: "-0.03em",
      },
      lineHeight: {
        reading: "1.75",
        display: "1.1",
      },
      backgroundImage: {
        "gradient-hero":  "linear-gradient(135deg, #E8A020, #F5C84A, #C87A10)",
        "gradient-amber": "linear-gradient(135deg, #E8A020 0%, #F5C84A 50%, #E8A020 100%)",
        "gradient-card":  "linear-gradient(135deg, #111113, #1C1C1F)",
      },
      boxShadow: {
        glow:      "0 0 24px rgba(232,160,32,0.2)",
        "glow-lg": "0 0 48px rgba(232,160,32,0.15), 0 8px 32px rgba(0,0,0,0.4)",
        card:      "0 1px 3px rgba(0,0,0,0.4)",
        "card-hover": "0 12px 40px rgba(232,160,32,0.12), 0 4px 16px rgba(0,0,0,0.5)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.4s ease forwards",
        shimmer:      "shimmer 1.5s infinite",
        float:        "float 3s ease-in-out infinite",
        "pulse-amber":"pulseAmber 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        pulseAmber: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(232,160,32,0.25)" },
          "50%":      { boxShadow: "0 0 40px rgba(232,160,32,0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
