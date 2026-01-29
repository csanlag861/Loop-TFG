import { GetCookies } from "./get-token";

export async function fetcher(url: string) {
  const token = GetCookies();
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al hacer fetching");
  }  
  return res.json();
}
