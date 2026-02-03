"use client";
import Link from "next/link";
import { clsx } from "clsx";
import { closedClassName } from "../utils/constants";
import { NavItem } from "../utils/types";
import { useTheme } from "next-themes";

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
  onToggle: () => void;
};

const SidebarItem = ({
  isOpen,
  isActive,
  navItem,
  onToggle,
}: SidebarItemProps) => {
  const isToggle = navItem.action === "toggle";
  const darkMode = navItem.action === "mode";
  const { setTheme } = useTheme();

  return (
    /*     <Link href={navItem.href}>
     */ <div
      onClick={
        isToggle
          ? (e) => {
              e.preventDefault();
              onToggle();
            }
          : darkMode
            ? (e) => {
                e.preventDefault();
                setTheme("dark");
              }
            : undefined
      }
      className={clsx(
        "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ",
        isActive
          ? "bg-foreground text-background"
          : "hover:bg-07 text-foreground",
      )}
    >
      <div className="shrink-0 md:text-03">{navItem.icon}</div>
      <span
        className={clsx(
          "whitespace-nowrap text-sm font-medium md:text-03",
          !isOpen && closedClassName,
        )}
      >
        {navItem.title}
      </span>
    </div>
    /*     </Link>
     */
  );
};

export { SidebarItem };
