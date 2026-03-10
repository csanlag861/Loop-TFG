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
import { useState } from "react";

const SavePostDropdown = ({ post_id }: { post_id: number }) => {
    const [open, setOpen] = useState<boolean>(false)
  const { data: carpetas, isLoading } = useGetCarpetas(open);
  const { mutate: savePost } = useSavePost();

  const handleSave = (carpetaId: number) => {
    savePost(
      { post_id: post_id, carpeta_id: carpetaId },
      {
        onSuccess: () => toast.success("Post guardado correctamente"),
        onError: () => toast.error("Este post ya está guardado"),
      }
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button aria-label="Guardar post">
          <Bookmark size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Guardar en...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading && (
          <DropdownMenuItem disabled>Cargando carpetas...</DropdownMenuItem>
        )}
        {carpetas?.map((carpeta) => (
          <DropdownMenuItem
            key={carpeta.id}
            onClick={() => handleSave(carpeta.id)}
          >
            {carpeta.nombre}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SavePostDropdown;