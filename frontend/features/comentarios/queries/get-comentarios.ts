"use server";

import { GetCookies } from "@/lib/get-token";
import { getCommentsByPost as getCommentsByPostUrl } from "@/utils/api";

export async function getCommentsByPost(postId: number, cursor?: number) {
  const token = await GetCookies();

  const url = new URL(getCommentsByPostUrl({ param: postId }));

  if (cursor) url.searchParams.set("cursor", String(cursor));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error fetching comments");
  }

  return res.json();
}
