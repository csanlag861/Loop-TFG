import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sohne: ['"Sohne-Regular"', "sans-serif"],
        "sohne-light": ['"Sohne-Light"', "sans-serif"],
        "sohne-bold": ['"Sohne-Bold"', "sans-serif"],
      },
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

        color10: "var(--color-10)",
        color09: "var(--color-09)",
        color08: "var(--color-08)",
        color07: "var(--color-07)",
        primarycolor: "var(--primary-color)",
        color05: "var(--color-05)",
        color04: "var(--color-04)",
        color03: "var(--color-03)",
        color02: "var(--color-02)",
        color01: "var(--color-01)",
        },
    },
  },
  plugins: [],
};

export default config;
