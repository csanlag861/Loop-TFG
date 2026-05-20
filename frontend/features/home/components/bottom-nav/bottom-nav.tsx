"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Home, Bookmark, Settings, Shield, LogOut, User } from "@geist-ui/icons";
import Avatar from "../avatar";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { LogOutAction } from "@/features/auth/actions/LogOut";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { homePath, bookmarkPath, profilePath, dashboardPath } from "@/utils/paths";
import { useQuery } from "@tanstack/react-query";
import { fetcherClient } from "@/lib/fetcher-client";
import { getUserData } from "@/utils/api";
import { EditarPerfilSheet } from "@/features/perfil/components/editarPerfil-sheet";

type BottomNavProps = {
  isAuthenticated: boolean;
  userId?: number;
  isAdmin?: boolean;
};

export function BottomNav({ isAuthenticated, userId, isAdmin }: BottomNavProps) {
  const pathname = usePathname();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Client-side fetch the logged-in user profile for editing from settings
  const { data: profileData } = useQuery({
    queryKey: ["profile-me"],
    queryFn: () => fetcherClient(getUserData()),
    enabled: isAuthenticated,
  });

  const navItems = [
    {
      title: "Home",
      icon: <Home size={22} />,
      href: homePath(),
    },
    ...(isAuthenticated
      ? [
          {
            title: "Guardados",
            icon: <Bookmark size={22} />,
            href: bookmarkPath(),
          },
          {
            title: "Perfil",
            icon: <Avatar />,
            href: profilePath({ param: userId || 0 }),
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            title: "Admin",
            icon: <Shield size={22} />,
            href: dashboardPath(),
          },
        ]
      : []),
  ];

  const defaultProfile = {
    id: userId || 0,
    nombre: "",
    username: "",
    biografia: "",
    avatarURL: "",
    ...profileData,
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 md:hidden border-t border-[var(--gris-07)] bg-[var(--bg-01)] pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.title}
                href={item.href}
                className={clsx(
                  "flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors",
                  isActive
                    ? "text-(--primary-color)"
                    : "text-(--gris-04) hover:text-(--gris-01)"
                )}
              >
                <span className="flex items-center justify-center w-6 h-6">
                  {item.icon}
                </span>
                <span className="text-[10px] font-medium">{item.title}</span>
              </Link>
            );
          })}

          {/* Settings dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={clsx(
                  "flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors focus:outline-0",
                  "text-(--gris-04) hover:text-(--gris-01)"
                )}
              >
                <span className="flex items-center justify-center w-6 h-6">
                  <Settings size={22} />
                </span>
                <span className="text-[10px] font-medium">Ajustes</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="top" align="end">
              <ThemeSwitcher />
              {isAuthenticated && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => setIsEditProfileOpen(true)}
                    className="group flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-all duration-200 text-[var(--gris-01)]! hover:bg-[var(--gris-08)] focus:bg-[var(--gris-08)] focus:outline-0 cursor-pointer"
                  >
                    <User size={20} />
                    <span className="text-sm font-medium">Editar perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={async (e) => {
                      e.preventDefault();
                      await LogOutAction();
                    }}
                    className="group flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-all duration-200 text-red-500! hover:bg-red-500/10 focus:outline-0 cursor-pointer"
                  >
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Cerrar sesión</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Edit Profile Sheet Modal */}
      {isAuthenticated && (
        <EditarPerfilSheet
          open={isEditProfileOpen}
          onOpenChange={setIsEditProfileOpen}
          profileData={defaultProfile}
        />
      )}
    </>
  );
}
