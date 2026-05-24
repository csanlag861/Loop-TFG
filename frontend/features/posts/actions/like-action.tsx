"use server";
import { revalidateTag } from "next/cache";
import { likePost } from "@/utils/api";
import { GetCookies } from "@/lib/get-token";
import { redirect } from "next/navigation";

export async function likePostAction(post_id: number) {
  try {
    const cookies = await GetCookies();
    
    if (!cookies) {
      return { error: "Debes iniciar sesión para dar like" };
    }

    console.log("LIKE URL:", likePost({ param: post_id }));
    const res = await fetch(likePost({ param: post_id }), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    });

    if (!res.ok) {
      if (res.status >= 500) {
        redirect(`/error?source=server&code=${res.status}`);
      }
      if (res.status === 401) {
        return { error: "Unauthorized" };
      }
      const errorData = await res
        .json()
        .catch(() => ({ message: "Error desconocido" }));
      console.error(`❌ Error al dar like (${res.status}):`, errorData);
      return { error: errorData.message || `Error ${res.status}` };
    }

    const data = await res.json();
    console.log(`✅ Like creado:`, data);

    revalidateTag("posts", "max");
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error en likePostAction:", error);
    return { error: "An unexpected error occurred" };
  }
}
