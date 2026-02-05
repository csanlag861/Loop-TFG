import { Home, Search } from "@geist-ui/icons";
import { NavItem } from "./types";
import { homePath, searchPath } from "@/utils/paths";

export const navItemsAnom: NavItem[] = [
  {
    title: "Home",
    icon: <Home size={24} />,
    href: `${homePath()}`,
  },
  {
    title: "Búsqueda",
    icon: <Search size={24} />,
    href: `${searchPath()}`,
  },
];

export const closedClassName =
  "opacity-0  transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100 group-hover:text-background ";
