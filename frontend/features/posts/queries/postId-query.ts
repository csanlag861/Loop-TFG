import { GetCookies } from "@/lib/get-token";
import { getPostById as getPostByIdUrl } from "@/utils/api";

export async function getPostById(id: number) {
  const token = await GetCookies();
  try {
    const res = await fetch(`${getPostByIdUrl({ param: Number(id) })}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.statusText === "Unauthorized") {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Error al obtener el post: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error en getPostById:", error);
    throw error;
  }
}
