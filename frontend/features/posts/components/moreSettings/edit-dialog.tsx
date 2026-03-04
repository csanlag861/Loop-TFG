"use client"; // <-- Cambiar de "use server" a "use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./submit-button";

type EditDialogProps = {
  post: any;
  formAction: (formData: FormData) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditDialog = ({ formAction, open, onOpenChange, post }: EditDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar publicacion</AlertDialogTitle>
          <AlertDialogDescription>
            Modifica los campos que desees y confirma los cambios.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Preview del post actual */}
        <div className="rounded-md border p-4 text-sm">
          <p className="text-muted-foreground">{post.contenido}</p>
        </div>

        {/* Formulario de edicion */}
        <form action={formAction}>
          <input type="hidden" name="postId" value={post.id} />
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contenido">Contenido</Label>
              <Textarea
                id="contenido"
                name="contenido"
                defaultValue={post.contenido}
                maxLength={260}
                rows={4}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <SubmitButton label="Confirmar cambios" />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { EditDialog };