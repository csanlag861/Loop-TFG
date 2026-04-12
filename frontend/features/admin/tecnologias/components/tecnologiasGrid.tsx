"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { TecnologiaCard } from "./tecnologiaCard";
import { TecnologiaFormDialog } from "./tecnologiaFormDialog";

interface Tecnologia {
  id: number;
  nombre: string;
  background?: string;
  border?: string;
  text?: string;
}

interface TecnologiasGridProps {
  tecnologiasIniciales: Tecnologia[];
}

export function TecnologiasGrid({
  tecnologiasIniciales,
}: TecnologiasGridProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      {/* Botón crear */}
      <button
        onClick={() => setFormOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mb-6 transition-colors bg-primary-color text-white hover:opacity-90"
      >
        <Plus size={16} />
        Nueva tecnología
      </button>

      {/* Grid */}
      {tecnologiasIniciales.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gris-05">
          <p className="text-sm">No hay tecnologías registradas aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {tecnologiasIniciales.map((tecnologia) => (
            <TecnologiaCard key={tecnologia.id} tecnologia={tecnologia} />
          ))}
        </div>
      )}

      <TecnologiaFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
      />
    </>
  );
}
