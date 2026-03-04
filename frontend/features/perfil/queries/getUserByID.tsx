import { GetCookies } from "@/lib/get-token";
import { getProfile } from "@/utils/api";

export async function getDataUser(id: number) {
    const token = await GetCookies();
  try {
    const res = await fetch(`${getProfile({param: id})}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.statusText === "Unauthorized") {
      return null;
    }

    if (!res.ok) {
      console.error("Error al obtener los posts", res.statusText);
      return;
    }
    return res.json();
  } catch (error) {
    console.error("Salto en el try-catch del getPosts", error);
  }
}
