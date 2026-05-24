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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcherClient } from "@/lib/fetcher-client";
import { createTecnologia, updateTecnologia } from "@/utils/api";

interface Tecnologia {
  id: number;
  nombre: string;
  background?: string;
  border?: string;
  text?: string;
}

interface TecnologiaFormDialogProps {
  open: boolean;
  onClose: () => void;
  tecnologia?: Tecnologia; // si viene → edición, si no → creación
}

const EMPTY_FORM = { nombre: "", background: "", border: "", text: "" };

export function TecnologiaFormDialog({
  open,
  onClose,
  tecnologia,
}: TecnologiaFormDialogProps) {
  const isEditing = !!tecnologia;
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: tecnologia?.nombre ?? "",
    background: tecnologia?.background ?? "",
    border: tecnologia?.border ?? "",
    text: tecnologia?.text ?? "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.nombre.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }

    setLoading(true);
    try {
      const url = isEditing
        ? updateTecnologia({ param: tecnologia.id })
        : createTecnologia();

      await fetcherClient(url, {
        method: isEditing ? "PATCH" : "POST",
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          ...(form.background && { background: form.background }),
          ...(form.border && { border: form.border }),
          ...(form.text && { text: form.text }),
        }),
      });

      toast.success(
        isEditing
          ? "Tecnología actualizada correctamente"
          : "Tecnología creada correctamente",
      );
      onClose();
      router.refresh();
    } catch {
      toast.error(
        isEditing
          ? "Error al actualizar la tecnología"
          : "Error al crear la tecnología",
      );
    } finally {
      setLoading(false);
    }
  }

  // Preview en tiempo real
  const hasColors = form.background || form.border || form.text;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-(--bg-01) border-(--gris-07) max-w-lg sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-gris01">
            {isEditing ? "Editar tecnología" : "Nueva tecnología"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-gris-02 text-sm">Nombre</Label>
            <Input
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              placeholder="Ej: TypeScript"
              className="bg-gris-08 border-gris-07 text-gris-01"
            />
          </div>

          {/* Colores */}
          <div className="flex flex-col gap-3">
            <Label className="text-gris-02 text-sm">Colores del badge</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gris-05">Background</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.background || "#000000"}
                    onChange={(e) => handleChange("background", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <Input
                    value={form.background}
                    onChange={(e) => handleChange("background", e.target.value)}
                    placeholder="#000000"
                    className="bg-gris-08 border-gris-07 text-gris-01 text-xs h-8 min-w-0 px-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gris-05">Border</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.border || "#000000"}
                    onChange={(e) => handleChange("border", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <Input
                    value={form.border}
                    onChange={(e) => handleChange("border", e.target.value)}
                    placeholder="#000000"
                    className="bg-gris-08 border-gris-07 text-gris-01 text-xs h-8 min-w-0 px-2"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gris-05">Text</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.text || "#000000"}
                    onChange={(e) => handleChange("text", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <Input
                    value={form.text}
                    onChange={(e) => handleChange("text", e.target.value)}
                    placeholder="#000000"
                    className="bg-gris-08 border-gris-07 text-gris-01 text-xs h-8 min-w-0 px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview en tiempo real */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-gris-02 text-sm">Preview</Label>
            <div className="flex items-center justify-center py-4 rounded-lg bg-gris-08 border border-gris-07">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium truncate max-w-[90%]"
                style={
                  hasColors
                    ? {
                        backgroundColor: form.background || "var(--gris-07)",
                        borderWidth: "1px", // ← separado
                        borderStyle: "solid", // ← separado
                        borderColor: form.border || "transparent", // ← separado
                        color: form.text || "var(--gris-01)",
                      }
                    : {
                        backgroundColor: "var(--gris-07)",
                        color: "var(--gris-01)",
                      }
                }
              >
                {form.nombre || "Nombre"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} className="text-gris-05">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-(--primary-color) text-(--gris-01) hover:bg-(--primary-color)/90"
          >
            {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
