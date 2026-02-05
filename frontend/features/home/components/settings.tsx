// components/sidebar/sidebar-footer.tsx
"use client";

import { Minimize2 } from "@geist-ui/icons";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

type Props = {
  onToggle: () => void;
};

const SidebarFooter = ({ onToggle }: Props) => {
  return (
    <div className="space-y-2 px-3 py-2">
      <ThemeSwitcher />

      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-07"
      >
        <Minimize2 size={24} />
        <span className="text-sm font-medium">
          Contraer
        </span>
      </button>
    </div>
  );
};

export { SidebarFooter };
