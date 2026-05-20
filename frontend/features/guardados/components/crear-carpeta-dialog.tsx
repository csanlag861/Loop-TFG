"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcherClient } from "@/lib/fetcher-client";
import { crearCarpeta } from "@/utils/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Carpeta } from "./guardados-wrapper";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (nuevaCarpeta: Carpeta) => void;
};

export default function CrearCarpetaDialog({ open, onClose, onSuccess }: Props) {
  const queryClient = useQueryClient();
  const [nombre, setNombre] = useState("");

  const { mutate: crear, isPending: creando } = useMutation({
    mutationFn: () =>
      fetcherClient(crearCarpeta(), {
        method: "POST",
        body: JSON.stringify({ nombre }),
      }),
    onSuccess: (nuevaCarpeta: Carpeta) => {
      toast.success("Carpeta creada correctamente");
      setNombre("");
      onClose();
      
      // Invalidate queries so the sidebar and mobile select refresh
      queryClient.invalidateQueries({ queryKey: ["carpetas"] });
      
      if (nuevaCarpeta) {
        onSuccess(nuevaCarpeta);
      }
    },
    onError: () => {
      toast.error("Ya tienes una carpeta con ese nombre o ha ocurrido un error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    crear();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-background border border-[var(--gris-07)] text-[var(--gris-01)] rounded-xl max-w-[90%] md:max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[var(--gris-01)] text-lg">Crear Carpeta</DialogTitle>
            <DialogDescription className="text-[var(--gris-03)] text-sm mt-1">
              Ingresa el nombre de la nueva carpeta para organizar tus publicaciones guardadas.
            </DialogDescription>
          </DialogHeader>

          <div className="my-6">
            <label className="text-[var(--gris-03)] text-xs block mb-2 font-medium">
              Nombre de la carpeta
            </label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Frontend, Node.js, Recetas..."
              className="w-full! bg-transparent border-0 border-b border-[var(--gris-07)] text-[var(--gris-01)] focus-visible:border-[var(--primary-color)] placeholder:text-[var(--gris-04)] focus:outline-none py-2 rounded-none transition-colors"
              autoFocus
              disabled={creando}
            />
          </div>

          <DialogFooter className="flex flex-row justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-[var(--gris-03)] hover:bg-[var(--gris-08)] hover:text-[var(--gris-01)] cursor-pointer"
              disabled={creando}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!nombre.trim() || creando}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white font-medium cursor-pointer"
            >
              {creando ? "Creando..." : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
