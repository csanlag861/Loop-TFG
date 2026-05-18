import { fetcher } from "@/lib/fetcher";
import { getSeguidores, getSeguidos } from "@/utils/api";

export const fetchSeguidores = async (userId: number, pageParam?: number) => {
  let url = getSeguidores({ param: userId });
  if (pageParam !== undefined) {
    url += `?cursor=${pageParam}`;
  }
  return fetcher(url);
};

export const fetchSeguidos = async (userId: number, pageParam?: number) => {
  let url = getSeguidos({ param: userId });
  if (pageParam !== undefined) {
    url += `?cursor=${pageParam}`;
  }
  return fetcher(url);
};
