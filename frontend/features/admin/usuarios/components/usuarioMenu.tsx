'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

interface Usuario {
  id: number;
  username: string;
  estado: string;
  rol: { nombre: string };
}

interface UsuarioAccionesMenuProps {
  usuario: Usuario;
}

export function UsuarioMenu({ usuario }: UsuarioAccionesMenuProps) {
  return (
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
          backgroundColor: 'var(--gris-09)',
          borderColor: 'var(--gris-07)',
        }}
      >
        <DropdownMenuItem
          className="cursor-pointer"
          style={{ color: 'var(--gris-01)' }}
          onClick={() => {/* navegar a /dashboard/usuarios/:id */}}
        >
          Ver detalle
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          style={{ color: 'var(--gris-01)' }}
          onClick={() => {/* abrir modal cambiar rol */}}
        >
          Cambiar rol
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          style={{ color: 'var(--gris-01)' }}
          onClick={() => {/* abrir modal cambiar estado */}}
        >
          Cambiar estado
        </DropdownMenuItem>
        <DropdownMenuSeparator style={{ backgroundColor: 'var(--gris-07)' }} />
        <DropdownMenuItem
          className="cursor-pointer"
          style={{ color: 'var(--destructive)' }}
          onClick={() => {/* abrir modal confirmar eliminación */}}
        >
          Eliminar usuario
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}