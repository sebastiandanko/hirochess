import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        hiro: {
          black: "#0A0A0A",
          teal: "#00BFA5",
          deepTeal: "#007A6E",
          gold: "#D4AF37",
          surface: "#111111",
          surface2: "#1a1a1a",
          highlight: "#1a2e22",
        },
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-2": "float-2 8s ease-in-out infinite",
        "float-3": "float-3 10s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        fadeIn: "fadeIn 0.4s ease-out forwards",
        scrollLeft: "scrollLeft 30s linear infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(3deg)" },
          "66%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        "float-2": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(-4deg)" },
        },
        "float-3": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "40%": { transform: "translateY(-15px) rotate(5deg)" },
          "70%": { transform: "translateY(-25px) rotate(-3deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px #00BFA5" },
          "50%": { opacity: "0.6", boxShadow: "0 0 16px #00BFA5" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
