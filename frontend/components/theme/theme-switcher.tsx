"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@geist-ui/icons";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
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
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ThemeSwitcher };
