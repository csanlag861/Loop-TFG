"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/reusables/button/Button";
import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Post from "@/features/posts/components/post/post";
import createComentarioAction from "../actions/createComentario";
import { DialogTitle } from "@radix-ui/react-dialog";

const initialState = {
  status: "",
  message: "",
  payload: undefined,
  fieldErrors: {},
};

export default function CommentModal({ open, onOpenChange, post }: any) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createComentarioAction,
    initialState,
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
        <form action={formAction} className="flex flex-col gap-3">
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
