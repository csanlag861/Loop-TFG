import { Home, Search, Bookmark } from "@geist-ui/icons";
import { NavItem } from "./types";
import { bookmarkPath, homePath, searchPath, profilePath } from "@/utils/paths";
import Avatar from "../components/avatar";

export const navItems = (userId: number): NavItem[] => [
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
  {
    title: "Guardados",
    icon: <Bookmark size={24} />,
    href: `${bookmarkPath()}`,
  },
  {
    title: "Mi perfil",
    icon: <Avatar />,
    href: `${profilePath({ param: userId })}`,
  },
];

export const closedClassName =
  "opacity-0  transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100 group-hover:text-background ";
