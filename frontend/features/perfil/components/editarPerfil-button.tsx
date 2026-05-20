"use client";

import { useState } from "react";
import Button from "@/components/reusables/button/Button";
import { EditarPerfilSheet } from "./editarPerfil-sheet";
import { ProfileData } from "./editarPerfil-sheet";

type EditarPerfilButtonProps = {
  profileData: ProfileData;
  className?: string;
};

export const EditarPerfilButton = ({ profileData, className }: EditarPerfilButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className={className} text="Editar Perfil" onClick={() => setOpen(true)} />
      <EditarPerfilSheet
        open={open}
        onOpenChange={setOpen}
        profileData={profileData}
      />
    </>
  );
};