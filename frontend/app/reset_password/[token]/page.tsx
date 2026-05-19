"use client";

import { useActionState, use } from "react";
import { resetPasswordAction } from "@/features/auth/actions/reset-password-action";

export default function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params);
  const [state, formAction, isPending] = useActionState(resetPasswordAction, {
    message: "",
    fieldErrors: {},
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Restablecer Contraseña
          </h1>
          <p className="text-sm text-zinc-400">
            Introduce tu nueva contraseña para acceder a Loop.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="token" value={resolvedParams.token} />

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
              htmlFor="password"
            >
              Nueva Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-zinc-500"
              placeholder="Minimo 8 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || state?.status === "SUCCESS"}
            className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Actualizando..." : "Actualizar Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
