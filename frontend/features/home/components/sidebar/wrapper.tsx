import { Sidebar } from "./leftbar";
import { GetCookies } from "@/lib/get-token";
import { getDataUser } from "../../queries/user-data";

export async function SidebarWrapper() {
  const cookieStore = await GetCookies();
  const isAuthenticated = !!cookieStore;
  const userData = isAuthenticated ? await getDataUser() : null;

  return (
    <Sidebar
      isAuthenticated={isAuthenticated}
      userId={userData?.id}
      isAdmin={userData?.isAdmin}
    />
  );
}
