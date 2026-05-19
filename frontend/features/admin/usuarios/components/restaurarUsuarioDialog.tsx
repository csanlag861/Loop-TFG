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
import { restaurarAdminUsuario } from "@/utils/api";

interface RestaurarUsuarioDialogProps {
  open: boolean;
  onClose: () => void;
  usuario: { id: number; username: string };
}

export function RestaurarUsuarioDialog({
  open,
  onClose,
  usuario,
}: RestaurarUsuarioDialogProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRestaurar() {
    setLoading(true);
    try {
      await fetcherClient(
        restaurarAdminUsuario({ param: usuario.id }),
        {
          method: "PATCH",
        },
      );

      toast.success(`@${usuario.username} restaurado correctamente`);
      onClose();
      router.refresh();
    } catch {
      toast.error("Error al restaurar el usuario");
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
            Restaurar usuario
          </DialogTitle>
          <DialogDescription style={{ color: "var(--gris-05)" }}>
            ¿Quieres restaurar la cuenta de{" "}
            <span style={{ color: "var(--gris-01)" }}>@{usuario.username}</span>
            ?
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
            onClick={handleRestaurar}
            disabled={loading}
            style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            {loading ? "Restaurando..." : "Restaurar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
