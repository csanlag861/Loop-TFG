"use server";
import { revalidateTag } from "next/cache";
import { unlikePost } from "@/utils/api";
import { GetCookies } from "@/lib/get-token";

export async function unlikePostAction(post_id: number) {
  try {
    const cookies = await GetCookies();

    console.log(`📡 DELETE ${unlikePost({ param: post_id })}`);

    const res = await fetch(unlikePost({ param: post_id }), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: "Error desconocido" }));
      console.error(`❌ Error al quitar like (${res.status}):`, errorData);
      throw new Error(errorData.message || `Error ${res.status}`);
    }

    const data = await res.json();
    console.log(`✅ Like eliminado:`, data);

    revalidateTag("posts", "updateTag");
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error en unlikePostAction:", error);
    throw error;
  }
}
