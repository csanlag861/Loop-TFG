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

type Props = {
  onToggle: () => void;
};

const SettingsSidebar = ({ onToggle }: Props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Settings className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <DropdownMenuItem asChild>
            <button
              onClick={onToggle}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-07"
            >
              <Minimize2 size={24} />
              <span className="text-sm font-medium">Contraer</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ThemeSwitcher />
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { SettingsSidebar };