"use server";

import { GetCookies } from "@/lib/get-token";
import { updateProfile } from "@/utils/api";
import { revalidatePath } from "next/cache";

type ActionState = {
  status?: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  timestamp: number;
  fieldErrors?: Record<string, string[] | undefined>;
};

export const updateProfileAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const token = await GetCookies();

  const body = {
    nombre: formData.get("nombre") as string,
    username: formData.get("username") as string,
    biografia: formData.get("biografia") as string,
    password: formData.get("password") as string,
    avatarURL: formData.get("avatarURL") as string,
  };

  // Eliminamos los campos vacíos para no mandar strings vacíos al backend
  const cleanBody = Object.fromEntries(
    Object.entries(body).filter(([_, v]) => v !== "" && v !== null),
  );

  try {
    const res = await fetch(`${updateProfile()}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(cleanBody),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        status: "ERROR",
        message: data.message || "Error al actualizar el perfil",
        timestamp: Date.now(),
      };
    }

    revalidatePath("/perfil/[id]", "page");

    return {
      status: "SUCCESS",
      message: "Perfil actualizado con éxito.",
      timestamp: Date.now(),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return { status: "ERROR", message, timestamp: Date.now() };
  }
};