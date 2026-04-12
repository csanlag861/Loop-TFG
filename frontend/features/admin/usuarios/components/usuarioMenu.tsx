"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { CambiarRolDialog } from "./cambiarRolDialog";
import { CambiarEstadoDialog } from "./cambiarEstadoDialog";
import { EliminarUsuarioDialog } from "./eliminarUsuarioDialog";
import { RestaurarUsuarioDialog } from "./restaurarUsuarioDialog";

type Modal = "rol" | "estado" | "eliminar" | "restaurar" | null;

interface Usuario {
  id: number;
  username: string;
  estado: string;
  rol: { nombre: string };
}

interface UsuarioMenuProps {
  usuario: Usuario;
  mostrandoEliminados: boolean;
}

export function UsuarioMenu({
  usuario,
  mostrandoEliminados,
}: UsuarioMenuProps) {
  const [modalAbierto, setModalAbierto] = useState<Modal>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="p-1 rounded transition-colors hover:bg-[var(--gris-08)]"
            aria-label="Acciones"
          >
            <MoreHorizontal size={16} color="var(--gris-05)" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          style={{
            backgroundColor: "var(--gris-09)",
            borderColor: "var(--gris-07)",
          }}
        >
          {mostrandoEliminados ? (
            <DropdownMenuItem
              className="cursor-pointer"
              style={{ color: "var(--primary-color)" }}
              onClick={() => setModalAbierto("restaurar")}
            >
              Restaurar usuario
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                style={{ color: "var(--gris-01)" }}
                onClick={() => setModalAbierto("rol")}
              >
                Cambiar rol
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                style={{ color: "var(--gris-01)" }}
                onClick={() => setModalAbierto("estado")}
              >
                Cambiar estado
              </DropdownMenuItem>
              <DropdownMenuSeparator
                style={{ backgroundColor: "var(--gris-07)" }}
              />
              <DropdownMenuItem
                className="cursor-pointer"
                style={{ color: "var(--destructive)" }}
                onClick={() => setModalAbierto("eliminar")}
              >
                Eliminar usuario
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CambiarRolDialog
        open={modalAbierto === "rol"}
        onClose={() => setModalAbierto(null)}
        usuario={usuario}
      />
      <CambiarEstadoDialog
        open={modalAbierto === "estado"}
        onClose={() => setModalAbierto(null)}
        usuario={usuario}
      />
      <EliminarUsuarioDialog
        open={modalAbierto === "eliminar"}
        onClose={() => setModalAbierto(null)}
        usuario={usuario}
      />
      <RestaurarUsuarioDialog
        open={modalAbierto === "restaurar"}
        onClose={() => setModalAbierto(null)}
        usuario={usuario}
      />
    </>
  );
}
