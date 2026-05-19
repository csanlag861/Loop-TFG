import RightBar from "@/components/reusables/right-bar/right-bar";
import { SidebarWrapper } from "@/features/home/components/sidebar/wrapper";
import { BottomNavWrapper } from "@/features/home/components/bottom-nav/bottom-nav-wrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_320px]">
          <div className="hidden md:block">
            <SidebarWrapper />
          </div>

          <main className="bg-(--bg-02) p-2 md:p-4 pb-18 md:pb-4 min-w-0 min-h-screen">{children}</main>

          <div className="hidden md:block">
            <RightBar />
          </div>

          <BottomNavWrapper />
        </div>
  );
}
