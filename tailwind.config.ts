import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        healix: {
          50: "#eefbf5",
          100: "#d8f5e6",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          900: "#0f3b23",
        },
        skycare: {
          50: "#eff8ff",
          100: "#dbeefe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          900: "#0c4a6e",
        },
      },
      boxShadow: {
        panel: "0 24px 60px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
