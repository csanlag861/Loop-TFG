"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ComboboxTecnologias } from "@/components/reusables/combobox/combobox-tech";
import PostPreview from "./postPreview";
import type { PostEditable } from "@/types/post-types";
import { useTecnologias } from "../../hooks/useTecnologias";
import { useMemo } from "react";

const MAX_CHARS = 280;

type EditDialogProps = {
  post: PostEditable;
  tecnologiasDisponibles?: { id: number; nombre: string }[];
  formAction: (formData: FormData) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditDialog = ({
  post,
  tecnologiasDisponibles,
  formAction,
  open,
  onOpenChange,
}: EditDialogProps) => {
  const { data: tecnologiasFetched = [] } = useTecnologias();
  
  const containerRef = useRef<HTMLDivElement>(null);

  const tecnologias = useMemo(() => 
    tecnologiasDisponibles ?? tecnologiasFetched, 
    [tecnologiasDisponibles, tecnologiasFetched]
  );

  const [contenido, setContenido] = useState(post.contenido);
  const [tecnologiaIds, setTecnologiaIds] = useState<number[]>(
    post.tecnologias.map((t) => t.id)
  );
  const formRef = useRef<HTMLFormElement>(null);
  const lastOpenedPostId = useRef<number | null>(null);

  // Sincronizar estado solo cuando el modal se abre para un post específico
  useEffect(() => {
    if (open && lastOpenedPostId.current !== post.id) {
      setContenido(post.contenido);
      setTecnologiaIds(post.tecnologias.map((t) => t.id));
      lastOpenedPostId.current = post.id;
    }
    if (!open) {
      lastOpenedPostId.current = null;
    }
  }, [open, post]);

  const charsRestantes = MAX_CHARS - contenido.length;
  const isOverLimit = charsRestantes < 0;

  const handleSubmit = () => {
    if (isOverLimit || !formRef.current) return;
    formRef.current.requestSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 p-0 overflow-visible">
        <div ref={containerRef} />
        
        <DialogHeader className="px-5 py-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-sm font-medium">
            <Pencil size={14} className="text-muted-foreground" />
            Editar publicación
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 py-4 flex flex-col gap-5">

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs text-muted-foreground">Editando</span>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3 pointer-events-none select-none">
            <PostPreview post={post} />
          </div>

          <form ref={formRef} action={formAction}>
            <input type="hidden" name="postId" value={post.id} />
            <input
              type="hidden"
              name="tecnologiaIds"
              value={JSON.stringify(tecnologiaIds)}
            />

            <div className="flex flex-col gap-4">

              <div className="flex flex-col gap-2">
                <Label htmlFor="contenido" className="text-sm">
                  Contenido
                </Label>
                <Textarea
                  id="contenido"
                  name="contenido"
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  rows={4}
                  className="resize-none"
                  placeholder="¿Qué quieres compartir?"
                />
                <p
                  className={`text-xs text-right tabular-nums ${
                    isOverLimit
                      ? "text-destructive"
                      : charsRestantes <= 20
                      ? "text-amber-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {contenido.length} caracteres
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm">Tecnologías</Label>
                <ComboboxTecnologias
                  key={`${post.id}-${open}`}
                  tecnologias={tecnologias}
                  defaultValues={post.tecnologias.map((t) => t.nombre)}
                  onChange={setTecnologiaIds}
                  container={containerRef}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isOverLimit || contenido.trim().length === 0}
          >
            Guardar cambios
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export { EditDialog };