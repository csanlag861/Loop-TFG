"use client";

import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = ["USUARIO", "MODERADOR", "ADMIN"] as const;
const ESTADOS = ["ACTIVO", "SILENCIADO", "BLOQUEADO", "SUSPENDIDO"] as const;

export function UsuariosFiltros() {
  const [busqueda, setBusqueda] = useQueryState("busqueda", {
    defaultValue: "",
    shallow: false,
  });
  const [rol, setRol] = useQueryState("rol", {
    defaultValue: "",
    shallow: false,
  });
  const [estado, setEstado] = useQueryState("estado", {
    defaultValue: "",
    shallow: false,
  });
  const [eliminados, setEliminados] = useQueryState("eliminados", {
    defaultValue: "false",
    shallow: false,
  });

  const isEliminados = eliminados === "true";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <Input
        placeholder="Buscar por nombre, username o email..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value || null)}
        style={{
          backgroundColor: "var(--gris-08)",
          borderColor: "var(--gris-07)",
          color: "var(--gris-01)",
        }}
        className="max-w-xs"
      />

      <Select
        value={rol || "todos"}
        onValueChange={(v) => setRol(v === "todos" ? null : v)}
      >
        <SelectTrigger
          className="w-40"
          style={{
            backgroundColor: "var(--gris-08)",
            borderColor: "var(--gris-07)",
            color: "var(--gris-01)",
          }}
        >
          <SelectValue placeholder="Rol" />
        </SelectTrigger>
        <SelectContent
          style={{
            backgroundColor: "var(--gris-09)",
            borderColor: "var(--gris-07)",
          }}
        >
          <SelectItem value="todos" style={{ color: "var(--gris-01)" }}>
            Todos los roles
          </SelectItem>
          {ROLES.map((r) => (
            <SelectItem key={r} value={r} style={{ color: "var(--gris-01)" }}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={estado || "todos"}
        onValueChange={(v) => setEstado(v === "todos" ? null : v)}
      >
        <SelectTrigger
          className="w-44"
          style={{
            backgroundColor: "var(--gris-08)",
            borderColor: "var(--gris-07)",
            color: "var(--gris-01)",
          }}
        >
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent
          style={{
            backgroundColor: "var(--gris-09)",
            borderColor: "var(--gris-07)",
          }}
        >
          <SelectItem value="todos" style={{ color: "var(--gris-01)" }}>
            Todos los estados
          </SelectItem>
          {ESTADOS.map((e) => (
            <SelectItem key={e} value={e} style={{ color: "var(--gris-01)" }}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Toggle eliminados */}
      <button
        onClick={() => setEliminados(isEliminados ? "false" : "true")}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
        style={{
          backgroundColor: isEliminados ? "var(--color-08)" : "var(--gris-08)",
          borderColor: "var(--gris-07)",
          color: isEliminados ? "white" : "var(--gris-05)",
          border: "1px solid",
        }}
      >
        {isEliminados ? "Mostrando eliminados" : "Mostrar eliminados"}
      </button>
    </div>
  );
}
