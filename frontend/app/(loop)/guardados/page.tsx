import { fetcher } from "@/lib/fetcher";
import { obtenerCarpetas } from "@/utils/api";
import GuardadosWrapper from "@/features/guardados/components/guardados-wrapper";

export default async function GuardadosPage() {
  const carpetas = await fetcher(obtenerCarpetas());
  return <GuardadosWrapper carpetasIniciales={carpetas} />;
}