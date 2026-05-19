import { GetCookies } from "@/lib/get-token";
import { getDataUser } from "../../queries/user-data";
import { BottomNav } from "./bottom-nav";

export async function BottomNavWrapper() {
  const cookieStore = await GetCookies();
  const isAuthenticated = !!cookieStore;
  const userData = isAuthenticated ? await getDataUser() : null;

  return (
    <BottomNav
      isAuthenticated={isAuthenticated}
      userId={userData?.id}
      isAdmin={userData?.isAdmin}
    />
  );
}
