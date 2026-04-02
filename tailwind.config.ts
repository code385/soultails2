import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#C85B6E", hover: "#B04860", light: "#FCEEF1" },
        purple: { brand: "#B784C4", light: "#F5EDF9" },
        teal: { brand: "#7BC5C8", light: "#EDF8F9" },
        sage: { brand: "#8FB84E", light: "#F0F7E6" },
        linen: "#EDE0D4",
        cream: { DEFAULT: "#FDFAF7", dark: "#FAF5F0" },
        dark: "#2D1F35",
        brand: { text: "#2D1F35", muted: "#6B5060", subtle: "#A8899A" },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1200px" },
      borderRadius: { xl: "20px", "2xl": "32px" },
      boxShadow: {
        card: "0 1px 4px rgba(45,31,53,0.06), 0 4px 16px rgba(45,31,53,0.04)",
        "card-hover": "0 4px 16px rgba(200,91,110,0.12), 0 12px 32px rgba(45,31,53,0.08)",
        nav: "0 1px 0 rgba(45,31,53,0.08)",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        catRun: { "0%": { transform: "translateX(-10px) scaleX(1)" }, "50%": { transform: "translateX(10px) scaleX(1)" }, "100%": { transform: "translateX(-10px) scaleX(1)" } },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "cat-run": "catRun 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
