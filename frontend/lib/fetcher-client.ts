export async function fetcherClient(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (res.status === 401) {
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    throw new Error("Error al hacer fetching");
  }

  return res.json();
}