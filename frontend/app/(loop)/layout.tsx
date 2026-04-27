import RightBar from "@/components/reusables/right-bar/right-bar";
import { SidebarWrapper } from "@/features/home/components/sidebar/wrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <div className="grid grid-cols-[320px_1fr_320px]">
          <SidebarWrapper />
          

          <main className="bg-(--bg-02) p-4 ">{children}</main>

          <RightBar />
        </div>
  );
}
