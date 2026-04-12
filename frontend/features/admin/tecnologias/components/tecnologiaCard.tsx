"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { TecnologiaFormDialog } from "./tecnologiaFormDialog";
import { EliminarTecnologiaDialog } from "./eliminarTecnologiaDialog";

interface Tecnologia {
  id: number;
  nombre: string;
  background?: string;
  border?: string;
  text?: string;
}

export function TecnologiaCard({ tecnologia }: { tecnologia: Tecnologia }) {
  const [editOpen, setEditOpen] = useState(false);
  const [eliminarOpen, setEliminarOpen] = useState(false);

  const hasColors =
    tecnologia.background || tecnologia.border || tecnologia.text;

  return (
    <>
      <div className="group relative flex flex-col gap-3 p-4 rounded-lg border border-gris-08 bg-bg-02 hover:border-gris-06 transition-colors">
        {/* Preview del badge */}
        <div className="flex items-center justify-center py-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={
              hasColors
                ? {
                    backgroundColor: tecnologia.background ?? "var(--gris-08)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: tecnologia.border ?? "transparent",
                    color: tecnologia.text ?? "var(--gris-01)",
                  }
                : undefined
            }
          >
            {tecnologia.nombre}
          </span>
        </div>

        {/* Nombre */}
        <p className="text-sm text-center text-gris-02 truncate">
          {tecnologia.nombre}
        </p>

        {/* Acciones — visibles al hacer hover */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditOpen(true)}
            className="p-1.5 rounded-md bg-gris-08 hover:bg-gris-07 transition-colors"
          >
            <Pencil size={12} className="text-gris-05" />
          </button>
          <button
            onClick={() => setEliminarOpen(true)}
            className="p-1.5 rounded-md bg-gris-08 hover:bg-gris-07 transition-colors"
          >
            <Trash2 size={12} className="text-destructive" />
          </button>
        </div>

        {/* Indicadores de color */}
        {hasColors && (
          <div className="flex items-center justify-center gap-1.5">
            {tecnologia.background && (
              <div
                className="w-3 h-3 rounded-full border border-gris-07"
                style={{ backgroundColor: tecnologia.background }}
                title="Background"
              />
            )}
            {tecnologia.border && (
              <div
                className="w-3 h-3 rounded-full border-2"
                style={{ borderColor: tecnologia.border }}
                title="Border"
              />
            )}
            {tecnologia.text && (
              <div
                className="w-3 h-3 rounded-full border border-gris-07"
                style={{ backgroundColor: tecnologia.text }}
                title="Text"
              />
            )}
          </div>
        )}
      </div>

      <TecnologiaFormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        tecnologia={tecnologia}
      />
      <EliminarTecnologiaDialog
        open={eliminarOpen}
        onClose={() => setEliminarOpen(false)}
        tecnologia={tecnologia}
      />
    </>
  );
}
