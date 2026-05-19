"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetcherClient } from "@/lib/fetcher-client";
import { deleteTecnologia } from "@/utils/api";

interface Tecnologia {
  id: number;
  nombre: string;
}

interface EliminarTecnologiaDialogProps {
  open: boolean;
  onClose: () => void;
  tecnologia: Tecnologia;
}

export function EliminarTecnologiaDialog({
  open,
  onClose,
  tecnologia,
}: EliminarTecnologiaDialogProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEliminar() {
    setLoading(true);
    try {
      await fetcherClient(
        deleteTecnologia({ param: tecnologia.id }),
        {
          method: "DELETE",
        },
      );

      toast.success(`"${tecnologia.nombre}" eliminada correctamente`);
      onClose();
      router.refresh();
    } catch {
      toast.error("Error al eliminar la tecnología");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gris-09 border-gris-07">
        <DialogHeader>
          <DialogTitle className="text-gris-01">
            Eliminar tecnología
          </DialogTitle>
          <DialogDescription className="text-gris-05">
            ¿Estás seguro de que quieres eliminar{" "}
            <span className="text-gris-01 font-medium">
              {tecnologia.nombre}
            </span>
            ? Los posts que la usen perderán esta etiqueta.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-gris-05">
            Cancelar
          </Button>
          <Button
            onClick={handleEliminar}
            disabled={loading}
            className="bg-destructive text-white hover:opacity-90"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
