import Link from "next/link";
import { clsx } from "clsx";
import { closedClassName } from "../utils/constants";
import { NavItem } from "../utils/types";

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
};

const SidebarItem = ({ isOpen, isActive, navItem }: SidebarItemProps) => {

  return (
/*     <Link href={navItem.href}>
 */      <div
        className={clsx(
          "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
          isActive
            ? "bg-foreground text-background"
            : "hover:bg-muted text-foreground",
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
 */  );
};

export { SidebarItem };