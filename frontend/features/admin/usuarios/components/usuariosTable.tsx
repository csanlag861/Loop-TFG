"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsuarioMenu } from "./usuarioMenu";
import { PaginacionTabla } from "./paginacionTabla";

interface Usuario {
  id: number;
  nombre: string;
  username: string;
  email: string;
  estado: string;
  createdAt: string;
  avatarURL?: string;
  rol: { nombre: string };
}

interface Meta {
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}

interface UsuariosTableProps {
  usuariosIniciales: Usuario[];
  metaInicial: Meta;
  mostrandoEliminados: boolean;
}

export function UsuariosTable({
  usuariosIniciales,
  metaInicial,
  mostrandoEliminados,
}: UsuariosTableProps) {
  return (
    <div
      className="rounded-lg overflow-hidden border"
      style={{ borderColor: "var(--gris-08)" }}
    >
      <Table>
        <TableHeader>
          <TableRow
            className="border-b hover:bg-transparent"
            style={{ borderColor: "var(--gris-08)" }}
          >
            <TableHead style={{ color: "var(--gris-05)" }}>
              Nombre de Usuario
            </TableHead>
            <TableHead style={{ color: "var(--gris-05)" }}>Email</TableHead>
            <TableHead style={{ color: "var(--gris-05)" }}>
              Fecha de creación
            </TableHead>
            <TableHead style={{ color: "var(--gris-05)" }} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuariosIniciales.map((usuario) => (
            <TableRow
              key={usuario.id}
              className="border-b transition-colors"
              style={{
                borderColor: "var(--gris-08)",
                backgroundColor: "var(--bg-02)",
              }}
            >
              <TableCell style={{ color: "var(--gris-01)" }}>
                {usuario.username}
              </TableCell>
              <TableCell style={{ color: "var(--gris-02)" }}>
                {usuario.email}
              </TableCell>
              <TableCell style={{ color: "var(--gris-02)" }}>
                {new Date(usuario.createdAt).toLocaleDateString("es-ES")}
              </TableCell>
              <TableCell className="text-right">
                <UsuarioMenu
                  usuario={usuario}
                  mostrandoEliminados={mostrandoEliminados}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        className="flex items-center justify-between px-4 py-3 border-t"
        style={{
          borderColor: "var(--gris-08)",
          backgroundColor: "var(--bg-02)",
        }}
      >
        <span className="text-sm" style={{ color: "var(--gris-05)" }}>
          Usuarios totales:{" "}
          <span style={{ color: "var(--gris-01)" }}>{metaInicial.total}</span>
        </span>
        <PaginacionTabla
          totalPaginas={metaInicial.totalPaginas}
          paginaActual={metaInicial.pagina}
        />
      </div>
    </div>
  );
}
