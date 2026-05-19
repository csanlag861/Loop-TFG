"use client";

import { useActionState } from "react";
import { forgotPasswordAction } from "@/features/auth/actions/forgot-password-action";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
    message: "",
    fieldErrors: {},
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Recuperar Contraseña
          </h1>
          <p className="text-sm text-zinc-400">
            Introduce tu correo electrónico para que te enviemos un enlace de recuperación.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          {(state?.status === "ERROR" || state?.status === "ERROR2") && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
              {state.message}
            </div>
          )}

          {state?.status === "SUCCESS" && (
            <div className="p-3 text-sm text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg">
              {state.message}
            </div>
          )}

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-300"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-zinc-500"
              placeholder="correo@ejemplo.com"
            />
            {state?.fieldErrors?.email && (
              <p className="text-xs text-red-500 mt-1">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending || state?.status === "SUCCESS"}
            className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Enviando..." : "Enviar Enlace"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" replace className="text-sm text-zinc-400 hover:text-white hover:underline transition-colors">
            Volver a Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
