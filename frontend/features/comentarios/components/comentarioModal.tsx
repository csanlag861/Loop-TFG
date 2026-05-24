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
      // Revertir la actualización optimista si falla
      queryClient.setQueryData(["commentCount", post.id], (old: number | undefined) => 
        Math.max((old ?? 1) - 1, 0)
      );
    }
  }, [state, post.id, queryClient]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden sm:rounded-2xl">
        {/* POST */}
        <div className="pt-10 px-6 border-b pb-4 bg-background">
          <DialogTitle className="sr-only">Responder a {post.usuario.nombre}</DialogTitle>
          <Post post={post} variant="modal" />
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
          className="flex flex-col gap-3 px-6 pb-6 pt-2"
        >
          <input type="hidden" name="post_id" value={post.id} />

          <Textarea
            name="contenido"
            placeholder="Escribe tu respuesta..."
            maxLength={280}
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 resize-none min-h-[80px]"
          />

          <div className="flex justify-end mt-2">
            <Button text="Enviar comentario" type="submit" disabled={isPending}>
              {isPending ? "Enviando..." : "Responder"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
