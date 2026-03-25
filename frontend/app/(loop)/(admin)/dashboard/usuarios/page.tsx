import { UsuariosTable } from '@/features/admin/usuarios/components/usuariosTable';
import { fetcher } from '@/lib/fetcher';
import { getAdminUsuarios } from '@/utils/api';

export default async function UsuariosPage() {
  const { data: usuarios, meta } = await fetcher(
    getAdminUsuarios('pagina=1&limite=20')
  );

  return <UsuariosTable usuariosIniciales={usuarios} metaInicial={meta} />;
}