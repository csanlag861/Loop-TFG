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

import { SubmitButton } from "./submit-button";

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  formAction: (formData: FormData) => void;

  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const ConfirmDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  confirmLabel = "Confirm",
  formAction,

  open,
  onOpenChange,
}: ConfirmDialogProps) => {
  const dialog = (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <SubmitButton label={confirmLabel} />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return dialog;
};

export { ConfirmDialog };
