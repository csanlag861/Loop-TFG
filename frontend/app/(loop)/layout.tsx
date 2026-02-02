import LeftBar from "@/components/reusables/left-bar/left-bar";
import RightBar from "@/components/reusables/right-bar/right-bar";
import { Sidebar } from "@/features/home/components/leftbar";

export default function RootLayout({ children }) {
  return (
        <div className="grid grid-cols-[320px_1fr_320px]">
          <Sidebar />
          

          <main className="bg-(--bg-02) p-4 ">{children}</main>

          <RightBar />
        </div>
  );
}
