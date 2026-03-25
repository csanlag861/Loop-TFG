"use client";
import { usePathname } from "next/navigation";
import { Search } from "../../../features/search/search";
import { useEffect } from "react";
import CarpetasSidebar from "@/features/guardados/components/carpetas-sidebar";

export const RightBar = () => {
  const HOME = '/posts';
  const GUARDADOS = '/guardados';
  const pathname = usePathname();

  const component = pathname === HOME 
    ? <Search /> 
    : pathname === GUARDADOS 
      ? <CarpetasSidebar /> 
      : null;

  useEffect(() => {}, [pathname]);

  return (
    <aside className="sticky top-0 h-screen w-full flex flex-col items-center justify-baseline pt-48 bg-(--bg-01) border-l border-(--gris-07)">
      {component}
    </aside>
  );
};

export default RightBar;