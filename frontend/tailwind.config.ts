import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg01: "var(--bg-01)",
        bg02: "var(--bg-02)",

        gris10: "var(--gris-10)",
        gris09: "var(--gris-09)",
        gris08: "var(--gris-08)",
        gris07: "var(--gris-07)",
        gris06: "var(--gris-06)",
        gris05: "var(--gris-05)",
        gris04: "var(--gris-04)",
        gris03: "var(--gris-03)",
        gris02: "var(--gris-02)",
        gris01: "var(--gris-01)",
      },
    },
  },
  plugins: [],
};

export default config;
