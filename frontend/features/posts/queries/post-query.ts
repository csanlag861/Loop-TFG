"use server";
import { GetCookies } from "@/lib/get-token";
import { getAllPosts } from "@/utils/api";

export async function getPosts(
  cursor?: number,
  search: string = "",
  username: string = "",
  tech: string = "",
) {
  const token = await GetCookies();

  const params = new URLSearchParams();
  if (cursor) params.set("cursor", String(cursor));
  if (search) params.set("search", search);
  if (username) params.set("username", username);
  if (tech) params.set("tech", tech);
  const queryString = params.toString();

  const url = queryString ? `${getAllPosts()}?${queryString}` : getAllPosts();

  console.log(url);

  try {
    await new Promise((r) => setTimeout(r, 2000));
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error al obtener los posts: ${res.statusText}`)
    }
    return res.json();
  } catch (error) {
    console.error("Salto en el try-catch del getPosts", error);
    throw error;
  }
}
