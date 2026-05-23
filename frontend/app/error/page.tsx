"use client";

import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ChevronDown,
  TerminalSquare,
  RotateCcw,
  Home,
} from "lucide-react";
import { useState, Suspense } from "react";
import Link from "next/link";

function ErrorContent({
  sourceProp,
  errorMessage,
  reset,
}: {
  sourceProp?: string;
  errorMessage?: string;
  reset?: () => void;
}) {
  const searchParams = useSearchParams();
  const [showDetails, setShowDetails] = useState(false);

  // Parámetros por si viene de una redirección o es montado directamente por el Error Boundary
  const source = sourceProp || searchParams.get("source") || "unknown";
  const code = searchParams.get("code") || "500";
  const isServer = source === "server";

  const displayMessage =
    errorMessage || "Ha ocurrido un error inesperado al procesar tu solicitud.";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[var(--primary-color)] opacity-[0.03] blur-[100px] -z-10 m-auto"></div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            SYSTEM_FAULT // {code}
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--gris-01)]">
              Algo ha salido mal.
            </h1>
            <p className="text-[var(--gris-03)] text-lg md:text-xl max-w-lg mx-auto">
              Nuestros servidores detectaron una anomalía. El problema ha sido
              registrado y estamos trabajando en ello.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center">
            {reset ? (
              <button
                onClick={reset}
                className="flex items-center gap-2 px-6 py-2.5 bg-[var(--primary-color)] hover:bg-[var(--color-07)] text-white rounded-[var(--radius)] font-medium transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <RotateCcw className="w-4 h-4" />
                Reintentar
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-6 py-2.5 bg-[var(--primary-color)] hover:bg-[var(--color-07)] text-white rounded-[var(--radius)] font-medium transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <RotateCcw className="w-4 h-4" />
                Recargar página
              </button>
            )}
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--gris-09)] hover:bg-[var(--gris-08)] text-[var(--gris-01)] border border-[var(--gris-07)] rounded-[var(--radius)] font-medium transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <Home className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ErrorPage(props: any) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-[var(--gris-04)] font-mono text-sm">
          Cargando contexto de error...
        </div>
      }
    >
      <ErrorContent {...props} />
    </Suspense>
  );
}
