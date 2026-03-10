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
    .max(260, "El contenido del post no puede tener más de 260 caracteres"),
});

const PublishPostAction = async (
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const token = await GetCookies();
  try {
    const { contenido } = postSchema.parse(Object.fromEntries(formData));

    const tecnologias: number[] = JSON.parse(
      (formData.get("tecnologias") as string) ?? "[]",
    );

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
