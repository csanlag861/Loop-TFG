"use client";

import { useStepper } from "./stepper";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import InputField from "@/components/reusables/inputfield/inputField";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const StepForm = () => {
  const stepper = useStepper();

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

    await new Promise((res) => setTimeout(res, 800));

    if (!stepper.state.isLast) {
      stepper.navigation.next();
      setLoading(false);
      return;
    }

    console.log("REGISTER FINAL:", data);

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {stepper.flow.switch({
        username: () => (
          <InputField
            label="Nombre de Usuario"
            error={errors.username?.message}
            register={register("username")}
            placeholder="Nombre de usuario"
          />
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

      <button
        type="submit"
        disabled={!isValid || loading}
        className={`
          rounded-full py-3 text-white transition
          ${
            !isValid || loading
              ? "bg-(--gris-07) cursor-not-allowed"
              : "bg-(--primary-color) hover:bg-(--color-08)"
          }
        `}
      >
        {loading
          ? "Cargando..."
          : stepper.state.isLast
            ? "Crear cuenta"
            : "Continuar"}
      </button>
    </form>
  );
};

export default StepForm;
