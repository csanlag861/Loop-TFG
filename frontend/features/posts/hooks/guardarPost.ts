import { GetCookies } from "@/lib/get-token";
import { guardarPost } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const savePost = async ({
  post_id,
  carpeta_id,
}: {
  post_id: number;
  carpeta_id: number;
}) => {
  const token = await GetCookies();
  const res = await fetch(guardarPost(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ post_id, carpeta_id }),
    credentials: "include",
  });
  console.log("status:", res.status);
  console.log("ok:", res.ok);
  if (!res.ok) throw new Error("Error al guardar el post");
  return res.json();
};

export const useSavePost = () => {
  return useMutation({
    mutationFn: savePost,
  });
};
