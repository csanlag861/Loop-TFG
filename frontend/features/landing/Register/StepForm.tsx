"use client";

import { useStepper } from "./stepper";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import InputField from "@/components/reusables/inputfield/inputField";
import {
  RegisterAction,
  CheckUsernameAction,
  CheckEmailAction,
} from "./actions/Register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { homePath } from "@/utils/paths";
import { ArrowLeft } from "@geist-ui/icons";

type FormData = {
  nombre: string;
  username: string;
  email: string;
  password: string;
};

const StepForm = () => {
  const stepper = useStepper();
  const router = useRouter();

  const schema =
    "schema" in stepper.state.current.data
      ? stepper.state.current.data.schema
      : undefined;

  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: schema
      ? (zodResolver(schema) as unknown as Resolver<FormData>)
      : undefined,
    mode: "onChange",
    defaultValues: {
      nombre: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    if (!stepper.state.isLast) {
      if (stepper.state.current.data.id === "username") {
        const check = await CheckUsernameAction(data.username);
        if (!check.available) {
          form.setError("username", {
            type: "manual",
            message: "Este nombre de usuario ya está en uso",
          });
          setLoading(false);
          return;
        }
      }

      if (stepper.state.current.data.id === "email") {
        const check = await CheckEmailAction(data.email);
        if (!check.available) {
          form.setError("email", {
            type: "manual",
            message: "Este email ya está en uso",
          });
          setLoading(false);
          return;
        }
      }

      stepper.navigation.next();
      setLoading(false);
      return;
    }

    try {
      const result = await RegisterAction({ status: "IDLE" }, data);

      if (result?.status === "SUCCESS") {
        router.push(homePath());
        return;
      }

      if (result?.status === "ERROR") {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {stepper.flow.switch({
        username: () => (
          <>
            <InputField
              label="Nombre"
              error={errors.nombre?.message}
              register={register("nombre")}
              placeholder="Tu nombre"
            />
            <InputField
              label="Nombre de Usuario"
              error={errors.username?.message}
              register={register("username")}
              placeholder="Nombre de usuario"
            />
          </>
        ),
        email: () => (
          <InputField
            label="Email"
            error={errors.email?.message}
            register={register("email")}
            placeholder="Email"
          />
        ),
        password: () => (
          <InputField
            label="Contraseña"
            type="password"
            error={errors.password?.message}
            register={register("password")}
            placeholder="Contraseña"
          />
        ),
        done: () => null,
      })}

      <div className="flex items-center gap-3 mt-4">
        {!stepper.state.isFirst && (
          <button
            type="button"
            onClick={() => stepper.navigation.prev()}
            disabled={loading}
            className="flex items-center justify-center rounded-full p-3 border border-muted text-foreground hover:bg-muted/50 transition cursor-pointer"
            aria-label="Volver al paso anterior"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <button
          type="submit"
          disabled={!isValid || loading}
          className={`
            w-full rounded-full py-3 transition
            ${
              !isValid || loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-(--primary-color) text-white hover:bg-(--color-08)"
            }
          `}
        >
          {loading
            ? "Cargando..."
            : stepper.state.isLast
              ? "Crear cuenta"
              : "Continuar"}
        </button>
      </div>
    </form>
  );
};

export default StepForm;
