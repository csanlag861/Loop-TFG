"use client";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect } from "react";
import PublishPostAction from "../../actions/publisPost-action";
import { toast } from "sonner";
import Button from "@/components/reusables/button/Button";

const PublishPost = () => {
  const [actionState, action, isPending] = useActionState(PublishPostAction, {
    message: "",
    fieldErrors: {},
  });

  useEffect(() => {
    if (actionState?.status === "ERROR2") {
      toast.error(actionState.message);
    }
  }, [actionState]);
  return (
    <form action={action}>
      <Textarea
        name="contenido"
        placeholder="¿Qué has aprendido hoy?"
        className="w-120 h-16 font-sohne-light mb-8"
      />
      {actionState?.fieldErrors?.contenido && (
        <p className="text-sm text-red-500">
          {actionState.fieldErrors.contenido[0]}
        </p>
      )}
      <Button type="submit" disabled={isPending} text={
        isPending ? "Publicando..." : "Publicar"
      } classname="[--btn-width:128px]" />
    </form>
  );
};

export default PublishPost;
