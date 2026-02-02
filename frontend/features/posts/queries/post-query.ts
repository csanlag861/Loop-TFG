import { GetCookies } from "@/lib/get-token";
import { getBaseUrl } from "@/utils/url";
import { getAllPosts } from "@/utils/api";

export async function getPosts() {
  const token = await GetCookies();

  try {
    const res = await fetch(`${getBaseUrl()}${getAllPosts()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok){
        console.error("Error al obtener los posts", res.statusText)
        return;
    }
    return res.json();
  } catch (error) {
    console.error("Salto en el try-catch del getPosts", error)
  }
}
