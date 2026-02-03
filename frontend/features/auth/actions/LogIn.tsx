"use server";
import { z } from "zod";
import { ActionState } from "../types/ActionState";
import { redirect } from "next/navigation";
import { setSessionCookie } from "../utils/session-cookie";
import { homePath } from "@/utils/paths";

const logInSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(30, "El nombre de usuario no puede tener más de 30 caracteres"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(60, "La contraseña no puede tener más de 60 caracteres"),
});

const LogIn = async (
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const { username, password } = logInSchema.parse(
      Object.fromEntries(formData),
    );

    const res = await fetch("http://backend:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json();
      return {
        ..._actionState,
        message: data.message || "Error al iniciar sesión",
      };
    }
    const data = await res.text();
    await setSessionCookie(data);
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

export default LogIn;
