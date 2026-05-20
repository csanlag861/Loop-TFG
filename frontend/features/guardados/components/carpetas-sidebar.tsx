"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  crearCarpeta,
  eliminarCarpeta,
  obtenerCarpetasCliente,
} from "@/utils/api";
import { fetcherClient } from "@/lib/fetcher-client";
import { useSearchParams } from "next/navigation";
import Button from "@/components/reusables/button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Carpeta } from "./guardados-wrapper";

const CarpetasSidebar = () => {
  const [nombre, setNombre] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: carpetas } = useQuery({
    queryKey: ["carpetas"],
    queryFn: () => fetcherClient(obtenerCarpetasCliente()),
  });

  const searchParams = useSearchParams();
  const carpetaActivaId =
    Number(searchParams.get("carpeta")) || carpetas?.[0]?.id;
  const carpetaActiva =
    carpetas?.find((c: Carpeta) => c.id === carpetaActivaId) ?? carpetas?.[0];

  const { mutate: crear, isPending: creando } = useMutation({
    mutationFn: () =>
      fetcherClient(crearCarpeta(), {
        method: "POST",
        body: JSON.stringify({ nombre }),
      }),
    onSuccess: () => {
      toast.success("Carpeta creada correctamente");
      setNombre("");
      queryClient.invalidateQueries({ queryKey: ["carpetas"] });
    },
    onError: () => toast.error("Ya tienes una carpeta con ese nombre"),
  });

  const { mutate: eliminar, isPending: eliminando } = useMutation({
    mutationFn: (eliminarPosts: boolean) =>
      fetcherClient(
        `${eliminarCarpeta({ param: carpetaActiva?.id ?? 0 })}?eliminar=${eliminarPosts}`,
        { method: "DELETE" },
      ),
    onSuccess: () => {
      toast.success("Carpeta eliminada correctamente");
      setDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["carpetas"] });
      queryClient.invalidateQueries({ queryKey: ["carpeta"] });
    },
    onError: () => toast.error("No se pudo eliminar la carpeta"),
  });

  const esFavoritos = carpetaActiva?.nombre === "FAVORITOS";

  return (
    <div className="flex flex-col gap-6 w-full px-4">
      {/* Crear carpeta */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-[var(--gris-01)] text-sm font-medium">Crear Carpeta</h2>
          <p className="text-[var(--gris-03)] text-xs mt-1">
            Organiza tus guardados.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[var(--gris-03)] text-xs">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="ej: React..."
            className="bg-transparent border border-[var(--gris-07)] rounded-md px-3 py-2 text-sm text-[var(--gris-01)] placeholder:text-[var(--gris-03)] focus:outline-none focus:border-[var(--primary-color)] transition-colors"
          />
        </div>
        <Button
          onClick={() => crear()}
          disabled={!nombre.trim() || creando}
          text={creando ? "Creando carpeta..." : "Crear carpeta"}
          className="w-full!"
        />
      </div>

      {/* Eliminar carpeta */}
      {carpetaActiva && (
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-[var(--gris-01)] text-sm font-medium">
              Eliminar carpeta actual
            </h2>
            <p className="text-[var(--gris-03)] text-xs mt-1">
              ¿Deseas eliminar esta carpeta?
            </p>
          </div>
          {esFavoritos ? (
            <p className="text-[var(--gris-03)] text-xs">
              La carpeta FAVORITOS no se puede eliminar.
            </p>
          ) : (
            <Button
              onClick={() => setDialogOpen(true)}
              className="border! border-red-500/50! text-red-400! hover:bg-red-500/10! text-sm! bg-transparent! py-2! transition-colors! duration-150! w-full!"
              text="Eliminar carpeta"
            />
          )}
        </div>
      )}

      {/* Dialog de confirmación */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-background border border-[var(--gris-07)] text-[var(--gris-01)] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--gris-01)] text-lg">
              ¿Estás seguro?
            </DialogTitle>
            <DialogDescription className="text-[var(--gris-03)] text-sm">
              Al eliminar esta carpeta, los posts que tengas guardados pasarán a la
              carpeta de favoritos. Si no estás de acuerdo, elija la opción que le
              convenza.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 justify-end mt-2">
            <button
              onClick={() => setDialogOpen(false)}
              className="px-4 py-2 text-sm text-[var(--gris-01)] border border-[var(--gris-07)] rounded-md hover:bg-[var(--gris-08)] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={() => eliminar(true)}
              disabled={eliminando}
              className="px-4 py-2 text-sm text-red-400 bg-red-500/20 border border-red-500/30 rounded-md hover:bg-red-500/30 transition-colors disabled:opacity-40 cursor-pointer"
            >
              Eliminar todo el contenido
            </button>
            <button
              onClick={() => eliminar(false)}
              disabled={eliminando}
              className="px-4 py-2 text-sm text-red-400 bg-red-500/20 border border-red-500/30 rounded-md hover:bg-red-500/30 transition-colors disabled:opacity-40 cursor-pointer"
            >
              Mover a favoritos
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarpetasSidebar;