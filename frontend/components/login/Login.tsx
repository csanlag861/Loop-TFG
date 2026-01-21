"use client";
import stylesLogin from "./signin.module.css";
import Button from "@/components/reusables/button/Button";
import Input from "@/components/reusables/input/Input";
import { useActionState } from "react";
import LogIn from "@/components/actions/LogIn";
const Login = () => {
  const [actionState, action, isPending] = useActionState()
  return (
    <form>
      <Input label="Nombre de usuario" placeholder="Introduce tu nombre de usuario..." type="text" />
      <Input label="Contraseña" placeholder="Introduce tu contraseña" type="password" />
      <Button text="Iniciar Sesión" />
    </form>
  )
}
export default Login;