"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Input from "@/components/reusables/input/Input";
import Button from "@/components/reusables/button/Button";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfileAction } from "../actions/updateProfile-action";

export type ProfileData = {
  id: number;
  nombre: string;
  username: string;
  biografia?: string;
  avatarURL?: string;
};

type EditarPerfilSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileData: ProfileData;
};

export const EditarPerfilSheet = ({
  open,
  onOpenChange,
  profileData,
}: EditarPerfilSheetProps) => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(updateProfileAction, {
    status: "IDLE" as const,
    message: "",
    timestamp: 0,
  });

  useEffect(() => {
    if (state.status === "ERROR") {
      toast.error(state.message);
    }
    if (state.status === "SUCCESS") {
      toast.success(state.message);
      onOpenChange(false); // cerramos el sheet
      router.refresh(); // refrescamos los datos del perfil
    }
  }, [state.timestamp, state.status, state.message]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Editar Perfil</SheetTitle>
          <SheetDescription>
            Actualiza tu información personal.
          </SheetDescription>
        </SheetHeader>

        <AvatarSection avatarURL={profileData.avatarURL} />

        <form action={formAction} className="flex flex-col gap-4">
          <Input
            label="Nombre"
            placeholder={profileData.nombre}
            type="text"
            name="nombre"
          />
          <Input
            label="Nombre de Usuario"
            placeholder={profileData.username}
            type="text"
            name="username"
          />
          <Input
            label="Biografía"
            placeholder={profileData.biografia ?? "Cuéntanos algo sobre ti"}
            type="text"
            name="biografia"
          />
          <Input
            label="Contraseña"
            placeholder="••••••••••••"
            type="password"
            name="password"
          />
          <Button
            text={isPending ? "Guardando..." : "Confirmar"}
            type="submit"
            disabled={isPending}
            className="w-full mt-2"
          />
        </form>
      </SheetContent>
    </Sheet>
  );
};

type AvatarSectionProps = {
  avatarURL?: string;
};

const AvatarSection = ({ avatarURL }: AvatarSectionProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image
          src={avatarURL ?? "/default-avatar.png"}
          alt="Avatar del usuario"
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>
      <Button text="Publicar" />
    </div>
  );
};
