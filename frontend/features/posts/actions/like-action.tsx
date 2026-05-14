"use server";
import { revalidateTag } from "next/cache";
import { likePost } from "@/utils/api";
import { GetCookies } from "@/lib/get-token";

export async function likePostAction(post_id: number) {
  try {
    const cookies = await GetCookies();
    console.log("LIKE URL:", likePost({ param: post_id }));
    const res = await fetch(likePost({ param: post_id }), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: "Error desconocido" }));
      console.error(`❌ Error al dar like (${res.status}):`, errorData);
      throw new Error(errorData.message || `Error ${res.status}`);
    }

    const data = await res.json();
    console.log(`✅ Like creado:`, data);

    revalidateTag("posts", "max");
  } catch (error) {
    console.error("❌ Error en likePostAction:", error);
    throw error;
  }
}
