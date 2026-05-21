import { fetcher } from "@/lib/fetcher";
import { obtenerCarpetas } from "@/utils/api";
import GuardadosWrapper from "@/features/guardados/components/guardados-wrapper";
import { GetCookies } from "@/lib/get-token";

export default async function GuardadosPage() {
  const carpetas = await fetcher(obtenerCarpetas());
  const cookieStore = await GetCookies();
  const isAuthenticated = !!cookieStore;
  return <GuardadosWrapper carpetasIniciales={carpetas} isAuthenticated={isAuthenticated} />;
}