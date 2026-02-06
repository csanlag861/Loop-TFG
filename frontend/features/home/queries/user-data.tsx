"use server";
import { GetCookies } from "@/lib/get-token";
import { getUserData } from "@/utils/api";

export async function getDataUser() {
  const token = await GetCookies();
  try {
    const res = await fetch(`${getUserData()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.statusText === "Unauthorized") {
      return null;
    }

    if (!res.ok) {
      console.error("Error al obtener los datos del usuario", res.statusText);
      return;
    }

    return res.json();
  } catch (error) {
    console.error("Salto en el try-catch del getDaataUser", error);
  }
}
