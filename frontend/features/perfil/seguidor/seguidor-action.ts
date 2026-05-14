"use server";

import { revalidatePath } from "next/cache";
import { toggleSeguir } from "@/utils/api";
import { GetCookies } from "@/lib/get-token";

export async function toggleFollowAction(
  targetUserId: number,
  pathname: string,
) {
  try {
    const token = await GetCookies();

    console.log(toggleSeguir({ param: targetUserId }));

    const res = await fetch(toggleSeguir({ param: targetUserId }), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: "Error desconocido" }));

      throw new Error(errorData.message || `Error ${res.status}`);
    }

    const data = await res.json();

    revalidatePath(pathname);

    return data;
  } catch (error) {
    console.error("❌ Error en toggleFollowAction:", error);
    throw error;
  }
}
