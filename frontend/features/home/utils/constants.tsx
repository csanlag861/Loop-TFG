import { Home, Search, Bookmark, Settings } from "@geist-ui/icons";
import { NavItem } from "./types";
import { bookmarkPath, homePath, profilePath, searchPath } from "@/utils/paths";

export const navItems: NavItem[] = [
  {
    title: "Home",
    icon: <Home size={24} />,
    href: `${homePath}`,
  },
  {
    title: "Búsqueda",
    icon: <Search size={24} />,
    href: `${searchPath}`,
  },
  {
    title: "Guardados",
    icon: <Bookmark size={24} />,
    href: `${bookmarkPath}`,
  },
  {
    title: "Perfil",
    href: `${profilePath}`,
  },
  {
    title: "Ajustes",
    icon: <Settings size={24} />,
    href: `${profilePath}`
  },
];

export const closedClassName =
  "opacity-0  transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100 group-hover:text-background ";
