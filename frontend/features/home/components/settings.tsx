"use client";

import { Minimize2 } from "@geist-ui/icons";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "@geist-ui/icons";
import clsx from "clsx";
import { closedClassName } from "../utils/constants";

type Props = {
  onToggle: () => void;
  isOpen: boolean;
};

const SettingsSidebar = ({ onToggle, isOpen }: Props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-all duration-200 text-03 hover:bg-(--gris-08) focus:outline-0">
            <Settings size={24} className="shrink-0 group-hover:text-04" />
            <span
              className={clsx(
                "whitespace-nowrap text-sm font-medium  group-hover:text-04",
                !isOpen && closedClassName,
              )}
            >
              Ajustes
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <DropdownMenuItem asChild>
            <button
              onClick={onToggle}
              className="group flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-all duration-200 text-03! hover:bg-(--gris-08) focus:outline-0"
            >
              <Minimize2 size={24} className="" />
              <span className="text-sm font-medium">Contraer</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ThemeSwitcher />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { SettingsSidebar };
