"use client";
import { useQuery } from "@tanstack/react-query";
import { fetcherClient } from "@/lib/fetcher-client";
import { obtenerCarpeta } from "@/utils/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Post from "@/features/posts/components/post/post";
import { PostEditable } from "@/types/post-types";
import { Carpeta } from "./guardados-wrapper";
import { useRouter } from "next/navigation";
import EmptyRightBar from "@/components/reusables/empty/empty";

interface PostGuardado {
  id: number;
  post: PostEditable;
}

type Props = {
  carpetas: Carpeta[];
  carpetaActiva: Carpeta;
  setCarpetaActiva: (carpeta: Carpeta) => void;
};


const CarpetasTabs = ({ carpetas, carpetaActiva, setCarpetaActiva }: Props) => {
  const router = useRouter();

  const { data: carpetaConPosts, isLoading } = useQuery({
    queryKey: ["carpeta", carpetaActiva.id],
    queryFn: () => fetcherClient(obtenerCarpeta({ param: carpetaActiva.id })),
  });

  return (
    <div className="flex-1">
      <Tabs defaultValue={carpetas[0]?.id.toString()}>
        <TabsList variant="line" className="bg-transparent border-b border-[var(--gris-07)] w-full justify-start rounded-none gap-2 px-0 mb-6">
          {carpetas.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id.toString()}
              onClick={() => {
                setCarpetaActiva(c);
                router.push(`/guardados?carpeta=${c.id}`);
              }}
              className="
                  bg-transparent text-[var(--gris-03)] text-sm rounded-none
                  data-[state=active]:bg-transparent data-[state=active]:text-white
                  data-[state=active]:border-b-2 data-[state=active]:border-purple-400
                  data-[state=active]:shadow-none hover:text-white transition-colors
                "
            >
              {c.nombre}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={carpetaActiva.id.toString()}>
          <div className="flex flex-col gap-4 justify-center items-center">
            {isLoading && (
              <p className="text-[var(--gris-03)] text-sm">Cargando posts...</p>
            )}
            {!isLoading && carpetaConPosts?.postGuardados?.length === 0 && (
              <EmptyRightBar/>
            )}
            {carpetaConPosts?.postGuardados?.map((pg: PostGuardado) => (
              <Post key={pg.id} post={pg.post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarpetasTabs;
