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
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfileAction } from "../actions/updateProfile-action";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

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
      // Invalidate profile cache so Avatar and BottomNav refresh reactively
      void queryClient.invalidateQueries({ queryKey: ["profile-me"] });
      router.refresh(); // refrescamos los datos del perfil (Server Components)
    }
  }, [state.timestamp, state.status, state.message]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:min-w-[450px] sm:max-w-[450px] flex flex-col gap-6 p-6 sm:p-8"
      >
        <SheetHeader>
          <SheetTitle>Editar Perfil</SheetTitle>
          <SheetDescription>
            Actualiza tu información personal.
          </SheetDescription>
        </SheetHeader>

        <form action={formAction} className="flex flex-col gap-4">
          <AvatarSection avatarURL={profileData.avatarURL} />
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
  const [image, setImage] = useState<string | undefined>(avatarURL);

  const handleChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="avatar" className="cursor-pointer">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={image || avatarURL || "/default-avatar.png"}
            alt="Avatar del usuario"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
      </label>

      <input
        id="avatar"
        name="avatar"
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleChange(e.target.files[0]);
          }
        }}
      />

      <span className="text-sm text-(--gris-06)">
        Haz clic en la imagen para cambiarla
      </span>
    </div>
  );
};
