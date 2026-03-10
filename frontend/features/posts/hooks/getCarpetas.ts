import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { obtenerCarpetas } from '@/utils/api';

const getCarpetas = async () => {
  const res = await fetcher(obtenerCarpetas());
  if (!res.ok) throw new Error('Error al obtener carpetas');
  console.log(res.json());
  
  return res.json();
};

export const useGetCarpetas = (enabled: boolean) => {
  return useQuery({
    queryKey: ['carpetas'],
    queryFn: getCarpetas,
    enabled
  });
};