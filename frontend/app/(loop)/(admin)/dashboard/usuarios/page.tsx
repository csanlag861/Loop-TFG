import { UsuariosFiltros } from "@/features/admin/usuarios/components/usuariosFiltros";
import { UsuariosTable } from "@/features/admin/usuarios/components/usuariosTable";
import { fetcher } from "@/lib/fetcher";
import { getAdminUsuarios } from "@/utils/api";

interface SearchParams {
  busqueda?: string;
  rol?: string;
  estado?: string;
  eliminados?: string;
  pagina?: string;
}

export default async function UsuariosPage({
  searchParams,
}: {
  searchParams: Promise<{
    busqueda?: string;
    rol?: string;
    estado?: string;
    eliminados?: string;
    pagina?: string;
  }>;
}) {
  const { busqueda, rol, estado, eliminados, pagina } = await searchParams; // ← await

  const params = new URLSearchParams();
  if (busqueda) params.set("busqueda", busqueda);
  if (rol) params.set("rol", rol);
  if (estado) params.set("estado", estado);
  if (eliminados) params.set("eliminados", eliminados);
  params.set("pagina", pagina ?? "1");
  params.set("limite", "20");

  const { data: usuarios, meta } = await fetcher(
    getAdminUsuarios(params.toString()),
  );

  return (
    <div>
      <UsuariosFiltros />
      <UsuariosTable
        usuariosIniciales={usuarios}
        metaInicial={meta}
        mostrandoEliminados={eliminados === "true"}
      />
    </div>
  );
}
