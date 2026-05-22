"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcherClient } from "@/lib/fetcher-client";
import { obtenerCarpeta } from "@/utils/api";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Post from "@/features/posts/components/post/post";
import { PostEditable } from "@/types/post-types";
import { Carpeta } from "./guardados-wrapper";
import { useRouter } from "next/navigation";
import EmptyRightBar from "@/components/reusables/empty/empty";
import { Plus } from "@geist-ui/icons";
import CrearCarpetaDialog from "./crear-carpeta-dialog";
import { PostSkeleton } from "@/features/posts/components/post/post-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostGuardado {
  id: number;
  post: PostEditable;
}

type Props = {
  carpetas: Carpeta[];
  carpetaActiva?: Carpeta;
  setCarpetaActiva: (carpeta: Carpeta) => void;
  isAuthenticated: boolean;
};

const CarpetasTabs = ({ carpetas, carpetaActiva, setCarpetaActiva, isAuthenticated }: Props) => {
  const router = useRouter();
  
  // State for mobile folder creation dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch posts in active folder
  const { data: carpetaConPosts, isLoading } = useQuery({
    queryKey: ["carpeta", carpetaActiva?.id],
    queryFn: () => carpetaActiva ? fetcherClient(obtenerCarpeta({ param: carpetaActiva.id })) : Promise.resolve(null),
    enabled: !!carpetaActiva?.id,
  });

  if (!carpetaActiva) {
    return (
      <div className="flex-1 relative flex flex-col justify-center items-center p-8 text-center bg-transparent border border-dashed border-[var(--gris-07)] rounded-xl min-h-[300px]">
        <p className="text-[var(--gris-03)] text-sm">No se encontraron carpetas.</p>
        
        {/* MOBILE FAB BUTTON */}
        {isAuthenticated && (
          <button
            onClick={() => setDialogOpen(true)}
            className="
              fixed bottom-20 right-6 z-40 
              bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] 
              text-white w-14 h-14 rounded-full shadow-2xl 
              flex items-center justify-center 
              md:hidden border-0 cursor-pointer 
              active:scale-95 transition-all duration-150
            "
            aria-label="Crear nueva carpeta"
          >
            <Plus size={22} />
          </button>
        )}

        <CrearCarpetaDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSuccess={(nuevaCarpeta) => {
            setCarpetaActiva(nuevaCarpeta);
            router.push(`/guardados?carpeta=${nuevaCarpeta.id}`);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      {/* 
        DESKTOP LAYOUT (Rule 1: Preserved perfectly)
        Tabs list is hidden on mobile and visible on md screens.
      */}
      <div className="hidden md:block w-full max-w-full">
        <Tabs defaultValue={carpetas[0]?.id.toString()} value={carpetaActiva.id.toString()} className="w-full max-w-full">
          <div className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar border-b border-[var(--gris-07)] mb-6">
            <TabsList variant="line" className="flex bg-transparent w-max min-w-full justify-start rounded-none gap-2 px-0 border-none flex-nowrap whitespace-nowrap">
              {carpetas.map((c) => (
                <TabsTrigger
                  key={c.id}
                  value={c.id.toString()}
                  onClick={() => {
                    setCarpetaActiva(c);
                    router.push(`/guardados?carpeta=${c.id}`);
                  }}
                  className="
                      whitespace-nowrap flex-shrink-0
                      bg-transparent text-[var(--gris-03)] text-sm rounded-none
                      data-[state=active]:bg-transparent data-[state=active]:text-[var(--gris-01)]
                      data-[state=active]:border-b-2 data-[state=active]:border-[var(--primary-color)]
                      data-[state=active]:shadow-none hover:text-[var(--gris-01)] transition-colors
                    "
                >
                  {c.nombre}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* 
        MOBILE LAYOUT (Requirement 3: Dropdown selector)
        Combobox dropdown selector visible only on mobile.
      */}
      <div className="flex md:hidden flex-col gap-2 mb-6">
        <label className="text-[var(--gris-03)] text-xs font-semibold uppercase tracking-wider">
          Carpeta seleccionada
        </label>
        <Select
          value={carpetaActiva.id.toString()}
          onValueChange={(value) => {
            const selected = carpetas.find((c) => c.id.toString() === value);
            if (selected) {
              setCarpetaActiva(selected);
              router.push(`/guardados?carpeta=${selected.id}`);
            }
          }}
        >
          <SelectTrigger className="w-full bg-[var(--gris-09)] border-[var(--gris-07)] text-[var(--gris-01)] font-medium focus:ring-0 focus:ring-offset-0 focus:border-[var(--primary-color)] transition-colors h-11">
            <SelectValue placeholder="Seleccionar carpeta" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--bg-02)] border-[var(--gris-07)] text-[var(--gris-01)]">
            {carpetas.map((c) => (
              <SelectItem key={c.id} value={c.id.toString()} className="hover:bg-[var(--gris-08)] focus:bg-[var(--gris-08)] cursor-pointer text-[var(--gris-01)]">
                {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts Content area */}
      <div className="flex flex-col gap-4 justify-center items-center">
        {isLoading && (
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}
        {!isLoading && carpetaConPosts?.postGuardados?.length === 0 && (
          <EmptyRightBar />
        )}
        {carpetaConPosts?.postGuardados?.map((pg: PostGuardado) => (
          <Post key={pg.id} post={{ ...pg.post, isGuardado: true }} />
        ))}
      </div>

      {/* 
        MOBILE FAB BUTTON (Requirement 2 & 3: Floating '+' button)
        Only visible on mobile screens. Uses Geist UI Plus icon.
      */}
      {isAuthenticated && (
        <button
          onClick={() => setDialogOpen(true)}
          className="
            fixed bottom-20 right-6 z-40 
            bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] 
            text-white w-14 h-14 rounded-full shadow-2xl 
            flex items-center justify-center 
            md:hidden border-0 cursor-pointer 
            active:scale-95 transition-all duration-150
          "
          aria-label="Crear nueva carpeta"
        >
          <Plus size={22} />
        </button>
      )}

      {/* Create Folder Modal/Dialog (Separated Component) */}
      <CrearCarpetaDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={(nuevaCarpeta) => {
          setCarpetaActiva(nuevaCarpeta);
          router.push(`/guardados?carpeta=${nuevaCarpeta.id}`);
        }}
      />
    </div>
  );
};

export default CarpetasTabs;
