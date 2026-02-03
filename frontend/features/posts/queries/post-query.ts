import { GetCookies } from "@/lib/get-token";
import { getAllPosts } from "@/utils/api";

export async function getPosts() {
  const token = await GetCookies();


  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch(`${getAllPosts()}`, {
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
