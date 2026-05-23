"use client";

import { useEffect } from "react";
import ErrorPageUI from "./error/page";
import "./globals.css";

export default function GlobalLayoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical Layout Error:", error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <ErrorPageUI
          sourceProp="client_critical"
          errorMessage={error.message}
          reset={reset}
        />
      </body>
    </html>
  );
}
