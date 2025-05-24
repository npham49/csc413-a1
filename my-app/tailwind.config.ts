import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#778DA9",
        card: "#99A9BE",
        dark: "#1B263B",
        accent: "#D9D9D9"
      },
      fontFamily: {
        primary: ['Orbit', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
