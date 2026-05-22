import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import { getProfile, getSeguidos } from "@/utils/api";
import UserList from "@/features/perfil/components/user-list";
import { ArrowLeft } from "lucide-react";
import { BackButton } from "@/components/reusables/back-button/back-button";

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
    <main className="w-full flex flex-col items-center px-4 md:px-0">
      <BackButton 
        href={`/perfil/${id}`} 
        label="Volver al perfil" 
        className="max-w-2xl" 
      />

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
