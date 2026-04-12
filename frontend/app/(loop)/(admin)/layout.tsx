import { AdminHeader } from "@/features/admin/adminHeader";
import { getDataUser } from "@/features/home/queries/user-data";
import { GetCookies } from "@/lib/get-token";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await GetCookies();
  if (!token) {
    redirect("/");
  }
  const userData = await getDataUser();
  if (!userData.isAdmin) redirect("/");

  return (
    <div className="flex flex-col flex-1">
      <AdminHeader />
      <main className="flex-1 px-8 py-6">{children}</main>
    </div>
  );
}
