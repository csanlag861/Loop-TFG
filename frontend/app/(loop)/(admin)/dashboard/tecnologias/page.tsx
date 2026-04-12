import { TecnologiasGrid } from "@/features/admin/tecnologias/components/tecnologiasGrid";
import { fetcher } from "@/lib/fetcher";
import { getTecnologias } from "@/utils/api";

export default async function TecnologiasPage() {
  const tecnologias = await fetcher(getTecnologias());

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gris-01">
          {tecnologias.length} tecnologías registradas
        </h2>
      </div>
      <TecnologiasGrid tecnologiasIniciales={tecnologias} />
    </div>
  );
}
