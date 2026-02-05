import { cookies } from "next/headers";
import { Sidebar } from "./leftbar";

export async function SidebarWrapper() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("access_token"); 
  const isAuthenticated = !!sessionCookie?.value;

  return <Sidebar isAuthenticated={isAuthenticated} />;
}