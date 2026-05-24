"use server";
import { revalidateTag } from "next/cache";
import { unlikePost } from "@/utils/api";
import { GetCookies } from "@/lib/get-token";
import { redirect } from "next/navigation";

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
      if (res.status >= 500) {
        redirect(`/error?source=server&code=${res.status}`);
      }
      if (res.status === 401) {
        return { error: "Unauthorized" };
      }
      const errorData = await res
        .json()
        .catch(() => ({ message: "Error desconocido" }));
      console.error(`❌ Error al quitar like (${res.status}):`, errorData);
      return { error: errorData.message || `Error ${res.status}` };
    }

    const data = await res.json();
    console.log(`✅ Like eliminado:`, data);

    revalidateTag("posts", "max");
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error en unlikePostAction:", error);
    return { error: "An unexpected error occurred" };
  }
}
