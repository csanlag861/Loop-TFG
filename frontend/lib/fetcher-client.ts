export async function fetcherClient(url: string, options?: RequestInit) {
  const defaultOptions = {
    ...options,
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };

  let res = await fetch(url, defaultOptions);

  if (res.status === 401) {
    try {
      const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
      if (refreshRes.ok) {
        // Retry the original request
        res = await fetch(url, defaultOptions);
      } else {
        window.location.href = "/";
        return;
      }
    } catch {
      window.location.href = "/";
      return;
    }
  }

  if (!res.ok) {
    if (res.status >= 500) {
      window.location.href = `/error?source=server&code=${res.status}`;
      return;
    }
    throw new Error("Error al hacer fetching");
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}
