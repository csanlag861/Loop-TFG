"use client";

import { useEffect } from "react";
import ErrorPageUI from "./error/page";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Frontend Error Capturado:", error);
  }, [error]);

  return (
    <ErrorPageUI
      sourceProp="client"
      errorMessage={error.message}
      reset={reset}
    />
  );
}
