"use server";

import { GetCookies } from "@/lib/get-token";
import { deletePost } from "@/utils/api";

type ActionState = {
  status?: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
  timestamp: number;
};
export const deletePostAction = async (id: string): Promise<ActionState> => {
  const token = await GetCookies();
  console.log(`${deletePost({ param: id })}`);
  

  try {
    const res = await fetch(`${deletePost({ param: id })}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    console.log("response delete", res);

    if (!res.ok) {
      const data = await res.json();
      return {
        message: data.message || "Error al eliminar el post",
        status: "ERROR",
        timestamp: Date.now(),
      };
    }

    return {
      status: "SUCCESS",
      message: "El post ha sido eliminado con éxito.",
      timestamp: Date.now(),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return { status: "ERROR", message, timestamp: Date.now() };
  }
};
