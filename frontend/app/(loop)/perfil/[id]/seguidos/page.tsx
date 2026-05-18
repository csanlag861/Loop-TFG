import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import { getProfile, getSeguidos } from "@/utils/api";
import UserList from "@/features/perfil/components/user-list";
import { ArrowLeft } from "lucide-react";

interface SeguidosPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SeguidosPage({ params }: SeguidosPageProps) {
  const { id } = await params;
  const userId = parseInt(id);

  const profileData = await fetcher(getProfile({ param: userId }));

  let initialSeguidos = undefined;
  try {
    initialSeguidos = await fetcher(getSeguidos({ param: userId }));
  } catch (error) {
    console.error("Error cargando los seguidos del usuario", error);
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center">
      <section className="w-full max-w-2xl flex items-center gap-4 py-4">
        <Link
          href={`/perfil/${id}`}
          className="flex items-center gap-2 text-gris01 hover:text-primary-color transition-colors duration-200 text-[14px]"
        >
          <ArrowLeft size={20} />
          <span className="font-sohne-regular">Volver al perfil</span>
        </Link>
      </section>

      <section className="w-full max-w-2xl">
        <h1 className="text-gris01 text-[18px] font-sohne-bold">
          Seguidos por @{profileData.username}
        </h1>
        <p className="text-gris03 text-[13px] font-sohne-light mt-1">
          {profileData.seguidosCount ?? 0} seguidos
        </p>
      </section>

      <section className="w-full max-w-2xl mt-4">
        <UserList
          userId={userId}
          type="seguidos"
          initialData={initialSeguidos}
        />
      </section>
    </main>
  );
}
