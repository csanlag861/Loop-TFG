"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState, useActionState } from "react";
import { toast } from "sonner";
import { Trash, MoreVertical, Edit2 } from "@geist-ui/icons";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "./action/deleteAction";
import { ConfirmDialog } from "./confirm-dialog";
import { EditDialog } from "./edit-dialog";
import { EditPostAction } from "./action/editAction";

const MoreSettings = ({ post }) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteState, deleteFormAction] = useActionState(
    deletePostAction.bind(null, post.id),
    { status: "IDLE", message: "", timestamp: 0 },
  );
  const [editState, action, isPending] = useActionState(EditPostAction, {
    message: "",
    fieldErrors: {},
  });

  useEffect(() => {
    if (deleteState.status === "ERROR") {
      toast.error(deleteState.message);
    }
    if (deleteState.status === "SUCCESS") {
      console.log("sucess");
      toast.success(deleteState.message);
      router.refresh();
    }
  }, [deleteState.timestamp, deleteState.status, deleteState.message, router]);

  useEffect(() => {
    if (editState.status === "ERROR") {
      toast.error(editState.message);
    }
    if (editState.status === "SUCCESS") {
      console.log("sucess");
      toast.success(editState.message);
      router.refresh();
    }
  }, [editState.timestamp, editState.status, editState.message, router]);


  return (
    <>
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="¿Deseas eliminar esta publicación?"
        description="Al eliminar este post desaparecerá de tu perfil y del feed de los demás usuarios. Esta acción no se puede deshacer."
        formAction={deleteFormAction}
        confirmLabel="Confirmar"
      />
      <EditDialog
        post={post}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        formAction={action}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
            <Edit2 className="h-4 w-4" />
            <span>Editar</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsDeleteOpen(true)}>
            <Trash className="h-4 w-4" />
            <span>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MoreSettings;
