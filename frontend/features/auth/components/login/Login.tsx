"use client";
import stylesLogin from "./login.module.css";
import Button from "@/components/reusables/button/Button";
import Input from "@/components/reusables/input/Input";
import { useActionState, useEffect } from "react";
import LogIn from "@/features/auth/actions/LogIn";
import { toast } from "sonner";
import Image from "next/image";

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
    <form action={action} className={stylesLogin.form}>
      <Image src="/favicon.ico" alt="Logo de Loop" width={62} height={62} />
      <h2 className="text-07! text-foreground">Inicia Sesion</h2>
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
      <div className="flex items-center justify-center gap-3">
        <p>¿Has olvidado la contraseña?</p>
        <p><b>Resetear contraseña</b></p>
      </div>
      <Button text={isPending ? "Iniciando sesión..." : "Iniciar Sesión"} type="submit" disabled={isPending} />
    </form>
  )
}
export default Login;