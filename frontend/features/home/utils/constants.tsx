import { Home, Search, Bookmark, Settings, Minimize2, Sun } from "@geist-ui/icons";
import { NavItem } from "./types";
import { bookmarkPath, homePath, profilePath, searchPath } from "@/utils/paths";
import Avatar from "../components/avatar";

export const navItems: NavItem[] = [
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
      title: "Perfil",
      icon: <Avatar />,
      href: `${profilePath}`,
    },
  {
    title: "Ajustes",
    icon: <Settings size={24} />,
    href: `${profilePath}`,
  },
  {
    title: "Contraer",
    icon: <Minimize2 size={24} />,
    href: `${profilePath}`,
    action: "toggle",
  },
  {
    title: "Apariencia",
    icon: <Sun size={24} />,
    href: `${profilePath}`,
    action: "mode",
  },
];

export const closedClassName =
  "opacity-0  transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100 group-hover:text-background ";
