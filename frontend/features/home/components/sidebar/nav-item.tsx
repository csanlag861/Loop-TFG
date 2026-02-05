"use client";
import Link from "next/link";
import { clsx } from "clsx";
import { closedClassName } from "../../utils/constants";
import { NavItem } from "../../utils/types";

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
};

const SidebarItem = ({
  isOpen,
  isActive,
  navItem,
}: SidebarItemProps) => {


  return (
    <Link href={navItem.href}>
      <div
        className={clsx(
          "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 text-03",
          isActive
            ? "bg-05 group text-(-- primary-color)"
            : "hover:bg-(--gris-08)",
        )}
      >
        <div className={clsx("shrink-0 group-hover:text-04",isActive && "text-09" )}>{navItem.icon}</div>
        <span
          className={clsx(
            "whitespace-nowrap text-sm font-medium  group-hover:text-04",
            !isOpen && closedClassName, isActive && "text-09"
          )}
        >
          {navItem.title}
        </span>
      </div>
    </Link>

  );
};

export { SidebarItem };
