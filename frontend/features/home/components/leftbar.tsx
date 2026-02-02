"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { navItems } from "../utils/constants";
import { SidebarItem } from "./nav-item";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [isTransition, setTransition] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  return (
    <nav
      className={clsx(
        "h-screen border-r border-(--gris-07) bg-(--bg-01) pt-20",
        "transition-all",
        isTransition && "duration-200",
        isOpen ? "w-[320px]" : "w-20",
      )}
      onClick={() => {
        handleToggle(!isOpen);
      }}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={pathname === navItem.href}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
