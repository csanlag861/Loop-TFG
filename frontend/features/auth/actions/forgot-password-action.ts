"use server";
import { forgotPasswordUrl } from "@/utils/api";
import { redirect } from "next/navigation";

import { ActionState } from "../types/ActionState";
import { z } from "zod";

const forgotSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
});

export const forgotPasswordAction = async (
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const { email } = forgotSchema.parse(Object.fromEntries(formData));

    const res = await fetch(forgotPasswordUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      if (res.status >= 500) {
        redirect(`/error?source=server&code=${res.status}`);
      }
      const data = await res.json();
      return {
        ..._actionState,
        status: "ERROR2",
        message: data.message || "Error al solicitar la recuperación",
      };
    }
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return {
        status: "ERROR",
        message: "Error de validación",
        payload: formData,
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    return {
      status: "ERROR2",
      message: "Ha ocurrido un error inesperado",
      payload: formData,
      fieldErrors: {},
    };
  }

  return {
    status: "SUCCESS",
    message: "Te hemos enviado un correo si la cuenta existe.",
    fieldErrors: {},
  };
};
