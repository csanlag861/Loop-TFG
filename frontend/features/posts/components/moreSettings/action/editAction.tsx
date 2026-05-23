"use server";
import { z } from "zod";
import { ActionState } from "../../../types/ActionState";
import { homePath } from "@/utils/paths";
import { revalidatePath } from "next/cache";
import { GetCookies } from "@/lib/get-token";
import { updatePost } from "@/utils/api";
import { redirect } from "next/navigation";

const postSchema = z.object({
  contenido: z
    .string()
    .min(1, "El contenido del POST no puede estar vacío.")
    .max(280, "El contenido del POST no puede tener más de 280 carácteres."),
  postId: z.string(),
  tecnologiaIds: z.string(),
});

export const EditPostAction = async (
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const token = await GetCookies();
  try {
    const { contenido, postId, tecnologiaIds } = postSchema.parse(
      Object.fromEntries(formData),
    );

    const res = await fetch(updatePost(postId), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        contenido,
        tecnologias: JSON.parse(tecnologiaIds),
      }),
      credentials: "include",
    });

    console.log(res);

    if (!res.ok) {
      if (res.status >= 500) {
        redirect(`/error?source=server&code=${res.status}`);
      }
      const data = await res.json();
      return {
        message: data.message || "Error al editar el post",
        status: "ERROR",
        timestamp: Date.now(),
      };
    }

    revalidatePath(homePath());
    return {
      status: "SUCCESS",
      message: "El post ha sido editado con éxito.",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return {
        status: "ERROR",
        message: "error en la validación  de campos",
        payload: formData,
        fieldErrors: error.flatten().fieldErrors,
      };
    } else {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      return { status: "ERROR", message, timestamp: Date.now() };
    }
  }
};
