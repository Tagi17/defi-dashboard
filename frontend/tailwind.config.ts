import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        'primary': "#001eff",
        'secondary': "#00b3fe",
        'cyberpunkBlue': "#00b3fe",
        'cyberpunkMediumBlue': "#007aff",
        'background': '#000000',
        // background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
