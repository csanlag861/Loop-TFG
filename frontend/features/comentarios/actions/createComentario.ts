"use server";

import { z } from "zod";
import { ActionState } from "@/features/posts/types/ActionState";
import { GetCookies } from "@/lib/get-token";
import { createComentario } from "@/utils/api";
import { redirect } from "next/navigation";

const comentarioSchema = z.object({
  contenido: z
    .string()
    .min(1, "El comentario no puede estar vacío")
    .max(280, "Máximo 280 caracteres"),
  post_id: z.string(),
});

const createComentarioAction = async (
  _actionState: ActionState | null,
  formData: FormData,
): Promise<ActionState> => {
  const token = await GetCookies();

  if (!token) {
    return {
      status: "ERROR",
      message: "Debes iniciar sesión para comentar",
      payload: formData,
      fieldErrors: {},
    };
  }

  try {
    const parsed = comentarioSchema.parse(Object.fromEntries(formData));

    const res = await fetch(createComentario(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        contenido: parsed.contenido,
        post_id: Number(parsed.post_id),
      }),
    });

    if (!res.ok) {
      if (res.status >= 500) {
        redirect(`/error?source=server&code=${res.status}`);
      }
      const data = await res.json();

      return {
        status: "ERROR",
        message: data.message || "Error al comentar",
        payload: formData,
        fieldErrors: {},
      };
    }

    const comment = await res.json();

    return {
      status: "SUCCESS",
      message: "Comentario publicado",
      payload: comment,
      fieldErrors: {},
    };
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return {
        status: "ERROR",
        message: "Error en validación",
        payload: formData,
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      status: "ERROR",
      message: "Error inesperado",
      payload: formData,
      fieldErrors: {},
    };
  }
};

export default createComentarioAction;
