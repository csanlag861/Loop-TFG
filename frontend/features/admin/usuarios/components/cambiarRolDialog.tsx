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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ROLES = ["USUARIO", "MODERADOR", "ADMIN"] as const;
type Rol = (typeof ROLES)[number];

interface CambiarRolDialogProps {
  open: boolean;
  onClose: () => void;
  usuario: { id: number; username: string; rol: { nombre: string } };
}

export function CambiarRolDialog({
  open,
  onClose,
  usuario,
}: CambiarRolDialogProps) {
  const [rolSeleccionado, setRolSeleccionado] = useState<Rol>(
    usuario.rol.nombre as Rol,
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (rolSeleccionado === usuario.rol.nombre) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/usuarios/${usuario.id}/rol`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ rol: rolSeleccionado }),
        },
      );

      if (!res.ok) throw new Error();

      toast.success(`Rol de @${usuario.username} actualizado correctamente`);
      onClose();
      router.refresh();
    } catch {
      toast.error("Error al cambiar el rol");
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
            Cambiar rol de {usuario.username}
          </DialogTitle>
        </DialogHeader>

        <Select
          value={rolSeleccionado}
          onValueChange={(v) => setRolSeleccionado(v as Rol)}
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
            {ROLES.map((rol) => (
              <SelectItem
                key={rol}
                value={rol}
                style={{ color: "var(--gris-01)" }}
              >
                {rol}
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
