import { redirect } from "next/navigation";
import { GetCookies } from "./get-token";

export async function fetcher(url: string) {
  console.log("Fetching URL:", url);
  const token = await GetCookies();
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/");
  }

  if (!res.ok) {
    if (res.status >= 500) {
      redirect(`/error?source=server&code=${res.status}`);
    }
    console.error("Error al hacer fetching", res);
    throw new Error("Error al hacer fetching");
  }
  return res.json();
}
