"use server";
import { z } from "zod";
import { ActionState } from "../types/ActionState";

const logInSchema = z.object({
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").max(30, "El nombre de usuario no puede tener más de 30 caracteres"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(60, "La contraseña no puede tener más de 60 caracteres"),
})

const LogIn = async (_actionState: ActionState,
    formData: FormData): Promise<ActionState> => {
    try {
        
    } catch (error) {

    }
    return _actionState;
}

export default LogIn;