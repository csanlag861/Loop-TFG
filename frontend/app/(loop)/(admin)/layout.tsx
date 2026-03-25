import { AdminHeader } from '@/features/admin/adminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1">
      <AdminHeader />
      <main className="flex-1 px-8 py-6">{children}</main>
    </div>
  );
}