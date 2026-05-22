"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/reusables/button/Button";
import { useEffect, startTransition, useActionState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Post from "@/features/posts/components/post/post";
import createComentarioAction from "../actions/createComentario";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CommentModal({ open, onOpenChange, post }: any) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [state, formAction, isPending] = useActionState(
    createComentarioAction,
    null,
  );

  useEffect(() => {
    if (!state?.status) return;

    if (state.status === "SUCCESS") {
      toast.success(state.message);

      onOpenChange(false);
      router.refresh(); // 🔥 clave en tu arquitectura
    }

    if (state.status === "ERROR") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {/* POST */}
        <div className="border-b pb-4 mb-4">
          <Post post={post} />
        </div>

        {/* FORM */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            
            // Actualización optimista
            queryClient.setQueryData(["commentCount", post.id], (old: number | undefined) => (old ?? 0) + 1);
            
            startTransition(() => {
              formAction(formData);
            });
          }}
          className="flex flex-col gap-3"
        >
          <input type="hidden" name="post_id" value={post.id} />

          <Textarea
            name="contenido"
            placeholder="Escribe tu respuesta..."
            maxLength={280}
          />

          <div className="flex justify-end">
            <Button text="Enviar comentario" type="submit" disabled={isPending}>
              {isPending ? "Enviando..." : "Responder"}
            </Button>
          </div>
        </form>
      </DialogContent>
      <DialogTitle />
    </Dialog>
  );
}
