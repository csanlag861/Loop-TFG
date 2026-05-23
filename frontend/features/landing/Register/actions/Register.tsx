"use server";
import { redirect } from "next/navigation";
import { setAuthCookies } from "@/features/auth/utils/session-cookie";
import { homePath } from "@/utils/paths";
import { checkEmail, checkUsername, registerUrl } from "@/utils/api";

export type RegisterState = {
  status: "IDLE" | "SUCCESS" | "ERROR";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export const RegisterAction = async (
  _actionState: RegisterState,
  data: any,
): Promise<RegisterState> => {
  try {
    const res = await fetch(registerUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status >= 500) {
        redirect(`/error?source=server&code=${res.status}`);
      }
      const errorData = await res.json();
      return {
        status: "ERROR",
        message: errorData.message || "Error al crear la cuenta",
      };
    }

    const { accessToken, refreshToken } = await res.json();
    await setAuthCookies(accessToken, refreshToken);
    return { status: "SUCCESS" };
  } catch (error: any) {
    console.error("Register Error:", error);
    return {
      status: "ERROR",
      message: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
    };
  }
};

export const CheckUsernameAction = async (username: string) => {
  try {
    const res = await fetch(checkUsername({ param: username }), {
      cache: "no-store",
    });
    if (!res.ok) return { available: false };
    return await res.json();
  } catch (error) {
    return { available: false };
  }
};
export const CheckEmailAction = async (email: string) => {
  try {
    const res = await fetch(checkEmail({ param: email }), {
      cache: "no-store",
    });
    if (!res.ok) return { available: false };
    return await res.json();
  } catch (error) {
    return { available: false };
  }
};
