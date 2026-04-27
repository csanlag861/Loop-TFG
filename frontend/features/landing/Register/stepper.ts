import { defineStepper } from "@stepperize/react";
import { z } from "zod";

const UsernameSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  username: z.string().min(3, "Mínimo 3 caracteres"),
});

const EmailSchema = z.object({
  email: z.email("Email inválido"),
});

const PasswordSchema = z.object({
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const { Scoped, useStepper } = defineStepper(
  { id: "username", title: "Nombre de Usuario", schema: UsernameSchema },
  { id: "email", title: "Email", schema: EmailSchema },
  { id: "password", title: "Contraseña", schema: PasswordSchema },
  { id: "done", title: "Done" },
);
