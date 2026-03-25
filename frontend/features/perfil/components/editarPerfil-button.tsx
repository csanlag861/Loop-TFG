"use client";

import { useState } from "react";
import Button from "@/components/reusables/button/Button";
import { EditarPerfilSheet } from "./editarPerfil-sheet";
import { ProfileData } from "./editarPerfil-sheet";

type EditarPerfilButtonProps = {
  profileData: ProfileData;
};

export const EditarPerfilButton = ({ profileData }: EditarPerfilButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="absolute top-10 right-10" text="Editar Perfil" onClick={() => setOpen(true)} />
      <EditarPerfilSheet
        open={open}
        onOpenChange={setOpen}
        profileData={profileData}
      />
    </>
  );
};