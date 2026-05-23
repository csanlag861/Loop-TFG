"use server";

import { GetCookies } from "@/lib/get-token";
import { updateProfile } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  const newFormData = new FormData();
  const fields = ["nombre", "username", "biografia", "password"];
  
  fields.forEach((field) => {
    const value = formData.get(field);
    if (value) {
      console.log(`[Frontend Action] Appending field: ${field} = ${value}`);
      newFormData.append(field, value as string);
    }
  });

  const file = formData.get("avatar") as File;
  console.log(`[Frontend Action] File retrieved from formData:`, file ? `${file.name} (${file.size} bytes)` : 'No file');
  
  if(file && file.size > 0){
    console.log(`[Frontend Action] Appending file to newFormData as 'avatar'`);
    newFormData.append("avatar", file);
  }

  try {
    const res = await fetch(`${updateProfile()}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newFormData,
    });

    if (!res.ok) {
      if (res.status >= 500) {
        redirect(`/error?source=server&code=${res.status}`);
      }
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
      error instanceof Error ? error.message : "Error al actualizar el perfil";
    return { status: "ERROR", message, timestamp: Date.now() };
  }
};
