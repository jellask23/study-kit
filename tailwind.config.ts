import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
      fontFamily: {
        nunito: ['var(--font-nunito)'],
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      // defaultTheme: "dark",
      // themes: {
      //   dark: {
      //     colors: {
      //       primary: {
      //         DEFAULT: "#fff",
      //         50: "#fff",
      //         100: "#fff",
      //         200: "#fff",
      //         300: "#fff",
      //         400: "#fff",
      //         500: "#fff",
      //         600: "#fff",
      //         700: "#fff",
      //         800: "#fff",
      //         900: "#fff",
      //         foreground: "#000",
      //       },
      //     },
      //   },
      // },
    }),
  ],
} satisfies Config;
