-- CreateEnum
CREATE TYPE "RolNombreEnum" AS ENUM ('USUARIO', 'MODERADOR', 'ADMINISTRADOR');

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" "RolNombreEnum" NOT NULL DEFAULT 'USUARIO',

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");
