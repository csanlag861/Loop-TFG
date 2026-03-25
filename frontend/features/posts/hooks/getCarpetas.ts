import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { obtenerCarpetasCliente } from "@/utils/api";

const getCarpetas = async () => {
  const data = await fetcher(obtenerCarpetasCliente());

  return data;
};

export const useGetCarpetas = (enabled: boolean) => {
  return useQuery({
    queryKey: ["carpetas"],
    queryFn: getCarpetas,
    enabled,
  });
};
