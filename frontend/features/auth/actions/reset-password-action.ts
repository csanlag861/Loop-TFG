"use server";
import { z } from "zod";
import { ActionState } from "../types/ActionState";
import { redirect } from "next/navigation";
import { resetPasswordUrl } from "@/utils/api";

const resetSchema = z.object({
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(60, "La contraseña no puede tener más de 60 caracteres"),
});

export const resetPasswordAction = async (
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const token = formData.get("token") as string;
    const { password } = resetSchema.parse(Object.fromEntries(formData));

    const res = await fetch(resetPasswordUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        ..._actionState,
        status: "ERROR2",
        message: data.message || "El link ha expirado o no es válido.",
      };
    }
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return {
        status: "ERROR",
        message: "Error en la validación de campos",
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

  return {
    status: "SUCCESS",
    message: "¡Contraseña actualizada correctamente! Ya puedes iniciar sesión.",
    fieldErrors: {},
  };
};
