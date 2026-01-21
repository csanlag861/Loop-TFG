"use client";
import stylesLogin from "./signin.module.css";
import Button from "@/components/reusables/button/Button";
import Input from "@/components/reusables/input/Input";
import { useActionState, useEffect } from "react";
import LogIn from "@/features/auth/actions/LogIn";
import { toast } from "sonner";

const Login = () => {
  const [actionState, action, isPending] = useActionState(LogIn, {
    message: "",
    fieldErrors: {},
  });
  useEffect(() => {
    if (actionState?.status === "ERROR2") {
      toast.error(actionState.message);
    }
  }, [actionState]);
  return (
    <form action={action}>
      <Input name="username" label="Nombre de usuario" placeholder="Introduce tu nombre de usuario..." type="text" />
      {actionState?.fieldErrors?.email && (
        <p className="text-sm text-red-500">
          {actionState.fieldErrors.email[0]}
        </p>
      )}
      <Input name="password" label="Contraseña" placeholder="Introduce tu contraseña" type="password" />
      {actionState?.fieldErrors?.password && (
        <p className="text-sm text-red-500">
          {actionState.fieldErrors.password[0]}
        </p>
      )}
      <Button text={isPending ? "Iniciando sesión..." : "Iniciar Sesión"} type="submit" disabled={isPending} />
    </form>
  )
}
export default Login;