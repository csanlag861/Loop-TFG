"use client";

import { useQueryState } from "nuqs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginacionTablaProps {
  totalPaginas: number;
  paginaActual: number;
}

export function PaginacionTabla({
  totalPaginas,
  paginaActual,
}: PaginacionTablaProps) {
  const [, setPagina] = useQueryState("pagina", {
    defaultValue: "1",
    shallow: false,
  });

  const irA = (pagina: number) => setPagina(String(pagina));

  if (totalPaginas <= 1) return null;

  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-t"
      style={{ borderColor: "var(--gris-08)" }}
    >
      <span className="text-sm" style={{ color: "var(--gris-05)" }}>
        Página {paginaActual} de {totalPaginas}
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          disabled={paginaActual <= 1}
          onClick={() => irA(paginaActual - 1)}
          style={{ color: "var(--gris-05)" }}
        >
          <ChevronLeft size={16} />
        </Button>

        {/* Números de página */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPaginas }, (_, i) => i + 1)
            .filter((p) => {
              // Muestra: primera, última, y las 2 cercanas a la actual
              return (
                p === 1 || p === totalPaginas || Math.abs(p - paginaActual) <= 1
              );
            })
            .reduce<(number | "...")[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((item, i) =>
              item === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-2 text-sm"
                  style={{ color: "var(--gris-05)" }}
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => irA(item as number)}
                  className="w-8 h-8 rounded text-sm transition-colors"
                  style={{
                    backgroundColor:
                      item === paginaActual
                        ? "var(--primary-color)"
                        : "transparent",
                    color: item === paginaActual ? "white" : "var(--gris-05)",
                  }}
                >
                  {item}
                </button>
              ),
            )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          disabled={paginaActual >= totalPaginas}
          onClick={() => irA(paginaActual + 1)}
          style={{ color: "var(--gris-05)" }}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
