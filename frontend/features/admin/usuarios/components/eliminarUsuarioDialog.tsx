"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetcherClient } from "@/lib/fetcher-client";
import { deleteAdminUsuario } from "@/utils/api";

interface EliminarUsuarioDialogProps {
  open: boolean;
  onClose: () => void;
  usuario: { id: number; username: string };
}

export function EliminarUsuarioDialog({
  open,
  onClose,
  usuario,
}: EliminarUsuarioDialogProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEliminar() {
    setLoading(true);
    try {
      await fetcherClient(
        deleteAdminUsuario({ param: usuario.id }),
        {
          method: "DELETE",
        },
      );

      toast.success(`Usuario @${usuario.username} eliminado correctamente`);
      onClose();
      router.refresh();
    } catch {
      toast.error("Error al eliminar el usuario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        style={{
          backgroundColor: "var(--gris-09)",
          borderColor: "var(--gris-07)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "var(--gris-01)" }}>
            Eliminar usuario
          </DialogTitle>
          <DialogDescription style={{ color: "var(--gris-05)" }}>
            ¿Estás seguro de que quieres eliminar a{" "}
            <span style={{ color: "var(--gris-01)" }}>@{usuario.username}</span>
            ? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            style={{ color: "var(--gris-05)" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEliminar}
            disabled={loading}
            style={{ backgroundColor: "var(--destructive)", color: "white" }}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
