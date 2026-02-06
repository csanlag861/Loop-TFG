"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { navItems } from "../../utils/constants";
import { navItemsAnom } from "../../utils/constants-anon";
import { SidebarItem } from "./nav-item";
import { SettingsSidebar } from "../settings";

const Sidebar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
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
        "sticky top-0 h-screen border-r border-(--gris-07) bg-(--bg-01) pt-20",
        "transition-all",
        isTransition && "duration-200",
        isOpen ? "w-[320px]" : "w-20",
      )}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {isAuthenticated ? (navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={pathname === navItem.href}
              navItem={navItem}
            />)
          )) : (navItemsAnom.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={pathname === navItem.href}
              navItem={navItem}
            />)))}
        </nav>
      </div>

      <div className="px-3 py-2">
        <SettingsSidebar onToggle={() => handleToggle(!isOpen)} isOpen={isOpen} />
      </div>
    </nav>
  );
};

export { Sidebar };
