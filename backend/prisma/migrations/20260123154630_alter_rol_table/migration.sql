/*
  Warnings:

  - The values [ADMINISTRADOR] on the enum `RolNombreEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [SILENCIAD] on the enum `UsuarioEstadoEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `rolId` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Rol` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol_id` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RolNombreEnum_new" AS ENUM ('USUARIO', 'MODERADOR', 'ADMIN');
ALTER TABLE "Rol" ALTER COLUMN "nombre" TYPE "RolNombreEnum_new" USING ("nombre"::text::"RolNombreEnum_new");
ALTER TYPE "RolNombreEnum" RENAME TO "RolNombreEnum_old";
ALTER TYPE "RolNombreEnum_new" RENAME TO "RolNombreEnum";
DROP TYPE "public"."RolNombreEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UsuarioEstadoEnum_new" AS ENUM ('ACTIVO', 'SILENCIADO', 'BLOQUEADO', 'SUSPENDIDO');
ALTER TABLE "public"."Usuario" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Usuario" ALTER COLUMN "estado" TYPE "UsuarioEstadoEnum_new" USING ("estado"::text::"UsuarioEstadoEnum_new");
ALTER TYPE "UsuarioEstadoEnum" RENAME TO "UsuarioEstadoEnum_old";
ALTER TYPE "UsuarioEstadoEnum_new" RENAME TO "UsuarioEstadoEnum";
DROP TYPE "public"."UsuarioEstadoEnum_old";
ALTER TABLE "Usuario" ALTER COLUMN "estado" SET DEFAULT 'ACTIVO';
COMMIT;

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_rolId_fkey";

-- AlterTable
ALTER TABLE "Rol" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "rolId",
ADD COLUMN     "rol_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rol_slug_key" ON "Rol"("slug");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
