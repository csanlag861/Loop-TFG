"use client";

import { useActionState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/reusables/button/Button";
import { useQueryClient } from "@tanstack/react-query";
import createComentarioAction from "../actions/createComentario";

export default function CommentForm({ postId }: { postId: number }) {
  const queryClient = useQueryClient();

  const [state, action, pending] = useActionState(createComentarioAction, null);

  useEffect(() => {
    if (state && state.status === "SUCCESS") {
      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old) return old;

        const firstPage = old.pages[0];

        return {
          ...old,
          pages: [
            {
              ...firstPage,
              list: [state.payload, ...firstPage.list],
            },
            ...old.pages.slice(1),
          ],
        };
      });
    }
  }, [state, queryClient, postId]);

  return (
    <form 
      action={action} 
      onSubmit={() => {
        queryClient.setQueryData(["commentCount", postId], (old: number | undefined) => (old ?? 0) + 1);
      }}
      className="w-full p-4 border-b"
    >
      <Textarea name="contenido" placeholder="Escribe un comentario..." />
      <input type="hidden" name="post_id" value={postId} />

      <div className="flex justify-end mt-2">
        <Button
          type="submit"
          text={pending ? "Comentando..." : "Comentar"}
        />
      </div>
    </form>
  );
}