"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@geist-ui/icons";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button className="group flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-all duration-200 text-03 hover:bg-(--gris-08) focus:outline-0" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Sun
        size={24}
        className="
          h-4 w-4 rotate-0 scale-100 transition-all
          dark:-rotate-90 dark:scale-0
        "
      />
      <Moon
        size={24}
        className="
          absolute h-4 w-4 rotate-90 scale-0 transition-transform
          dark:rotate-0 dark:scale-100
        "
      />
      <span className="text-sm font-medium">Cambiar tema</span>
    </button>
  );
};

export { ThemeSwitcher };
