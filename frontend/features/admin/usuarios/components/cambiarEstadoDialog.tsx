"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fetcherClient } from "@/lib/fetcher-client";
import { updateAdminUsuarioEstado } from "@/utils/api";

const ESTADOS = ["ACTIVO", "SILENCIADO", "BLOQUEADO", "SUSPENDIDO"] as const;
type Estado = (typeof ESTADOS)[number];

interface CambiarEstadoDialogProps {
  open: boolean;
  onClose: () => void;
  usuario: { id: number; username: string; estado: string };
}

export function CambiarEstadoDialog({
  open,
  onClose,
  usuario,
}: CambiarEstadoDialogProps) {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<Estado>(
    usuario.estado as Estado,
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (estadoSeleccionado === usuario.estado) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      await fetcherClient(
        updateAdminUsuarioEstado({ param: usuario.id }),
        {
          method: "PATCH",
          body: JSON.stringify({ estado: estadoSeleccionado }),
        },
      );

      toast.success(`Estado de @${usuario.username} actualizado correctamente`);
      onClose();
      router.refresh();
      onClose();
    } catch {
      toast.error("Error al cambiar el estado");
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
            Cambiar estado de {usuario.username}
          </DialogTitle>
        </DialogHeader>

        <Select
          value={estadoSeleccionado}
          onValueChange={(v) => setEstadoSeleccionado(v as Estado)}
        >
          <SelectTrigger
            style={{
              backgroundColor: "var(--gris-08)",
              borderColor: "var(--gris-07)",
              color: "var(--gris-01)",
            }}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            style={{
              backgroundColor: "var(--gris-09)",
              borderColor: "var(--gris-07)",
            }}
          >
            {ESTADOS.map((estado) => (
              <SelectItem
                key={estado}
                value={estado}
                style={{ color: "var(--gris-01)" }}
              >
                {estado}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            style={{ color: "var(--gris-05)" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
