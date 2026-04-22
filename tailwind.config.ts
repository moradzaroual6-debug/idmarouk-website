import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",           // I-scan l-app folder l-kamel
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}", // HADI HIYA L-MOHIMMA: Zid /app/ l-l-bedya
    "./app/lib/**/*.{js,ts,jsx,tsx,mdx}",        // HADI HTA HIYA: Zid /app/
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          green: "#2d5a27",
          "green-light": "#4a8a3f",
          red: "#8b2020",
          gold: "#c8a96e",
          black: "#0a0a0a",
          "off-white": "#f5f3ef",
          "warm-gray": "#e8e4dc",
          "mid-gray": "#9a9490",
        },
      },
    },
  },
  plugins: [],
};

export default config;