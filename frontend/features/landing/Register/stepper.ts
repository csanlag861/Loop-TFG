import { defineStepper } from "@stepperize/react";
import { z } from "zod";

const UsernameSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
  username: z.string().min(3, "Mínimo 3 caracteres").max(30, "Máximo 30 caracteres"),
});

const EmailSchema = z.object({
  email: z.string().email("Email inválido").max(255, "Máximo 255 caracteres"),
});

const PasswordSchema = z.object({
  password: z.string().min(6, "Mínimo 6 caracteres").max(60, "Máximo 60 caracteres"),
});

export const { Scoped, useStepper } = defineStepper(
  { id: "username", title: "Nombre de Usuario", schema: UsernameSchema },
  { id: "email", title: "Email", schema: EmailSchema },
  { id: "password", title: "Contraseña", schema: PasswordSchema },
  { id: "done", title: "Done" },
);
