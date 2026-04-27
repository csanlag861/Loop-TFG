"use client";

import { useQuery } from "@tanstack/react-query";
import { getTecnologiasCliente } from "@/utils/api";
import { fetcher } from "@/lib/fetcher";

interface Tecnologia {
  id: number;
  nombre: string;
}

export function useTecnologias() {
  return useQuery<Tecnologia[]>({
    queryKey: ["tecnologias"],
    queryFn: () => fetcher(getTecnologiasCliente()),
    staleTime: 1000 * 60 * 60, // 1 hora, las tecnologías no cambian seguido
  });
}
