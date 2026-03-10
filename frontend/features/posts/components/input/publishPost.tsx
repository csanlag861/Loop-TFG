"use client";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";
import PublishPostAction from "../../actions/publisPost-action";
import { toast } from "sonner";
import Button from "@/components/reusables/button/Button";
import { ComboboxTecnologias } from "@/components/reusables/combobox/combobox-tech";

interface Tecnologia {
  id: number;
  nombre: string;
}

interface Props {
  tecnologias: Tecnologia[];
}

const PublishPost = ({ tecnologias }: Props) => {
  const [ids, setIds] = useState<number[]>([]);

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
      <div className="flex flex-col">
        <Textarea
          name="contenido"
          placeholder="¿Qué has aprendido hoyyyy?"
          className="w-120 h-16 font-sohne-light mb-8"
        />
        {actionState?.fieldErrors?.contenido && (
          <p className="text-sm text-red-500">
            {actionState.fieldErrors.contenido[0]}
          </p>
        )}
        <input type="hidden" name="tecnologias" value={JSON.stringify(ids)} />
        <ComboboxTecnologias tecnologias={tecnologias} onChange={setIds} />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        text={isPending ? "Publicando..." : "Publicar"}
        classname="[--btn-width:128px]"
      />
    </form>
  );
};

export default PublishPost;
