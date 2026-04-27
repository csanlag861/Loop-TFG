"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcherClient } from "@/lib/fetcher-client";
import { obtenerCarpetasCliente } from "@/utils/api";
import CarpetasTabs from "./carpetas-tabs";

export type Carpeta = { id: number; nombre: string; createdAt: string };

const GuardadosWrapper = ({
  carpetasIniciales,
}: {
  carpetasIniciales: Carpeta[];
}) => {
  const { data: carpetas = carpetasIniciales } = useQuery({
    queryKey: ["carpetas"],
    queryFn: () => fetcherClient(obtenerCarpetasCliente()),
    initialData: carpetasIniciales,
  });

  const [carpetaActivaId, setCarpetaActivaId] = useState<number>(carpetasIniciales[0].id);

  const carpetaActiva = carpetas.find((c: Carpeta) => c.id === carpetaActivaId) ?? carpetas[0];

  return (
    <CarpetasTabs
      carpetas={carpetas}
      carpetaActiva={carpetaActiva}
      setCarpetaActiva={(carpeta) => setCarpetaActivaId(carpeta.id)}
    />
  );
};

export default GuardadosWrapper;