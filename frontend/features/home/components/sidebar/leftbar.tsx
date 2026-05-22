"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { navItems } from "../../utils/constants";
import { navItemsAnom } from "../../utils/constants-anon";
import { SidebarItem } from "./nav-item";
import { SettingsSidebar } from "../settings";
import { dashboardPath } from "@/utils/paths";
import { Shield } from "@geist-ui/icons";

const Sidebar = ({
  isAuthenticated,
  userId,
  isAdmin,
}: {
  isAuthenticated: boolean;
  userId?: number;
  isAdmin?: boolean;
}) => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [isTransition, setTransition] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  const items = isAuthenticated ? navItems(userId || 0) : navItemsAnom;

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
          {items.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={pathname === navItem.href}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>

      <div className="px-3 py-2">
        <SettingsSidebar
          onToggle={() => handleToggle(!isOpen)}
          isOpen={isOpen}
          isAuthenticated={isAuthenticated}
        />
        {isAdmin && (
          <SidebarItem
            key="dashboard"
            isOpen={isOpen}
            isActive={pathname.startsWith("/dashboard")}
            navItem={{
              title: "Dashboard",
              href: dashboardPath(),
              icon: <Shield size={24} />,
            }}
          />
        )}
      </div>
    </nav>
  );
};

export { Sidebar };
