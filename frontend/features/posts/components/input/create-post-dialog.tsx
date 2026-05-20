"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import PublishPostAction from "../../actions/publisPost-action";
import { toast } from "sonner";
import { useTecnologias } from "../../hooks/useTecnologias";
import { ComboboxTecnologias } from "@/components/reusables/combobox/combobox-tech";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreatePostDialog({ open, onOpenChange }: Props) {
  const { data: tecnologias = [] } = useTecnologias();
  const [ids, setIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [actionState, action, isPending] = useActionState(PublishPostAction, {
    message: "",
    fieldErrors: {},
  });

  useEffect(() => {
    if (actionState?.status === "ERROR2" || (actionState?.message && actionState?.status !== "ERROR")) {
      toast.error(actionState.message);
    }
  }, [actionState]);

  // Close dialog on successful submission (before redirect)
  useEffect(() => {
    if (open && actionState?.message === "" && !isPending && ids.length > 0) {
      // If action ran and returned no message, it might be redirecting
      onOpenChange(false);
    }
  }, [isPending, actionState, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border border-[var(--gris-07)] text-[var(--gris-01)] rounded-xl max-w-[90%] md:max-w-md mx-auto overflow-visible p-0">
        <div ref={containerRef} />
        
        <DialogHeader className="px-5 py-4 border-b border-[var(--gris-07)]">
          <DialogTitle className="text-[var(--gris-01)] text-base font-medium">Crear Publicación</DialogTitle>
          <DialogDescription className="text-[var(--gris-03)] text-xs mt-1">
            Comparte tus aprendizajes y conocimientos con la comunidad.
          </DialogDescription>
        </DialogHeader>
 
        <form action={action} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="contenido" className="text-[var(--gris-03)] text-xs font-medium">
              Contenido del post
            </label>
            <Textarea
              id="contenido"
              name="contenido"
              placeholder="¿Qué has aprendido hoy?"
              className="h-24 bg-transparent border border-[var(--gris-07)] text-[var(--gris-01)] placeholder:text-[var(--gris-04)] focus:border-[var(--primary-color)] resize-none"
              disabled={isPending}
              required
            />
            {actionState?.fieldErrors?.contenido && (
              <p className="text-xs text-red-500 font-medium">
                {actionState.fieldErrors.contenido[0]}
              </p>
            )}
          </div>
 
          <div className="flex flex-col gap-2">
            <label className="text-[var(--gris-03)] text-xs font-medium">Tecnologías</label>
            <input type="hidden" name="tecnologias" value={JSON.stringify(ids)} />
            <ComboboxTecnologias 
              tecnologias={tecnologias} 
              onChange={setIds} 
              container={containerRef}
            />
          </div>
 
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[var(--gris-07)]">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-[var(--gris-03)] hover:bg-[var(--gris-08)] hover:text-[var(--gris-01)] cursor-pointer"
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white font-medium cursor-pointer"
            >
              {isPending ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
