import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#12141A",
        foreground: "#F4F6FB",
        canvas: "#12141A",
        surface: {
          1: "#181A22",
          2: "#1C1E24",
          3: "#262930",
        },
        borderSubtle: "#2D3039",
        borderStrong: "#3F4350",
        textPrimary: "#F4F6FB",
        textSecondary: "#9FA8BD",
        textTertiary: "#5E6983",
        accent: {
          500: "#3B5BFF",
          400: "#5B78FF",
          50: "#1B234A",
        },
        semantic: {
          success: "#22C55E",
          "success-bg": "#0D2818",
          warning: "#F59E0B",
          "warning-bg": "#2B1D0B",
          danger: "#EF4444",
          "danger-bg": "#2E1515",
          neutral: "#8B94AD",
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
