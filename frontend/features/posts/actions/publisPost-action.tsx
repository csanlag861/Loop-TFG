"use server";
import { z } from "zod";
import { ActionState } from "../types/ActionState";
import { redirect } from "next/navigation";
import { homePath } from "@/utils/paths";
import { createPost } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { GetCookies } from "@/lib/get-token";

const postSchema = z.object({
  contenido: z
    .string()
    .min(1, "El contenido no puede estar vacío")
    .max(280, "El contenido del post no puede tener más de 280 caracteres"),
});

const PublishPostAction = async (
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const token = await GetCookies();
  try {
    const { contenido } = postSchema.parse(Object.fromEntries(formData));

    let tecnologias: number[] = [];
    try {
      tecnologias = JSON.parse((formData.get("tecnologias") as string) ?? "[]");
    } catch (e) {
      return {
        status: "ERROR",
        message: "Formato de tecnologías inválido",
        payload: formData,
        fieldErrors: {},
      };
    }

    const res = await fetch(`${createPost()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ contenido, tecnologias }),
      credentials: "include",
    });

    console.log(res);

    if (!res.ok) {
      if (res.status >= 500) {
        redirect(`/error?source=server&code=${res.status}`);
      }
      const data = await res.json();
      return {
        ..._actionState,
        message: data.message || "Error al  publicar el post",
      };
    }

    revalidatePath(homePath());
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return {
        status: "ERROR",
        message: "error en la validación  de campos",
        payload: formData,
        fieldErrors: error.flatten().fieldErrors,
      };
    } else if (error instanceof Error) {
      return {
        status: "ERROR2",
        message: error.message,
        payload: formData,
        fieldErrors: {},
      };
    } else {
      return {
        status: "ERROR2",
        message: "something went wrong",
        payload: formData,
        fieldErrors: {},
      };
    }
  }
  redirect(homePath());
};

export default PublishPostAction;
