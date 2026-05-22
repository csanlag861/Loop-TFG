import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import { getProfile, getSeguidores } from "@/utils/api";
import UserList from "@/features/perfil/components/user-list";
import { ArrowLeft } from "lucide-react";
import { BackButton } from "@/components/reusables/back-button/back-button";

interface SeguidoresPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SeguidoresPage({ params }: SeguidoresPageProps) {
  const { id } = await params;
  const userId = Number(id);

  const profileData = await fetcher(getProfile({ param: userId }));

  let initialSeguidores = undefined;
  try {
    initialSeguidores = await fetcher(getSeguidores({ param: userId }));
  } catch (error) {
    console.error("Error cargando los seguidores del usuario", error);
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
          Seguidores de @{profileData.username}
        </h1>
        <p className="text-gris03 text-[13px] font-sohne-light mt-1">
          {profileData.seguidoresCount ?? 0} seguidores
        </p>
      </section>

      <section className="w-full max-w-2xl mt-4">
        <UserList
          userId={userId}
          type="seguidores"
          initialData={initialSeguidores}
        />
      </section>
    </main>
  );
}
