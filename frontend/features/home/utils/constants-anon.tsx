import { Home, Search } from "@geist-ui/icons";
import { NavItem } from "./types";
import { homePath } from "@/utils/paths";

export const navItemsAnom: NavItem[] = [
  {
    title: "Home",
    icon: <Home size={24} />,
    href: `${homePath()}`,
  }
];

export const closedClassName =
  "opacity-0  transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100 group-hover:text-background ";
