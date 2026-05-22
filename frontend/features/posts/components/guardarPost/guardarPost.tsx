"use client";
import { Bookmark } from "@geist-ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCarpetas } from "@/features/posts/hooks/getCarpetas";
import { useSavePost } from "@/features/posts/hooks/guardarPost";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Carpeta } from "@/features/guardados/components/guardados-wrapper";


const SavePostDropdown = ({
  post_id,
  isGuardado,
}: {
  post_id: number;
  isGuardado: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [guardado, setGuardado] = useState<boolean>(isGuardado);

  useEffect(() => {
    setGuardado(isGuardado);
  }, [isGuardado]);
  const { data: carpetas, isLoading } = useGetCarpetas(open);
  const { mutate: savePost } = useSavePost();

  const handleSave = (carpetaId: number) => {
    savePost(
      { post_id, carpeta_id: carpetaId },
      {
        onSuccess: () => {
          setGuardado(true);
          setOpen(false);
          toast.success("Post guardado correctamente");
        },
        onError: () => toast.error("Este post ya está guardado"),
      },
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Guardar post"
          className="group relative p-1.5 rounded-md transition-all duration-200 hover:bg-[var(--gris-08)] text-primary-color"
        >
          <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm bg-primary-color/10" />

          {guardado ? (
            <Bookmark
              size={16}
              className="relative z-10 transition-transform duration-200 group-hover:scale-110 text-primary-color"
              fill="currentColor"
            />
          ) : (
            <Bookmark
              size={16}
              className="relative z-10 transition-transform duration-200 group-hover:scale-110 text-primary-color"
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-background border border-[var(--gris-07)] rounded-lg shadow-xl min-w-[160px]"
      >
        <DropdownMenuLabel className="text-[var(--gris-03)] text-xs font-light">
          Guardar en...
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[var(--gris-07)]" />
        {isLoading && (
          <DropdownMenuItem disabled className="text-[var(--gris-03)] text-xs">
            Cargando carpetas...
          </DropdownMenuItem>
        )}
        {carpetas?.map((carpeta: Carpeta) => (
          <DropdownMenuItem
            key={carpeta.id}
            onClick={() => handleSave(carpeta.id)}
            className="text-[var(--gris-01)] text-xs cursor-pointer transition-colors duration-150 hover:bg-[var(--gris-08)] hover:text-[var(--gris-01)] focus:bg-[var(--gris-08)]"
          >
            {carpeta.nombre}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SavePostDropdown;
