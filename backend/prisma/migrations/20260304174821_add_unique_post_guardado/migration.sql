/*
  Warnings:

  - A unique constraint covering the columns `[post_id,carpeta_id]` on the table `PostGuardado` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PostGuardado_post_id_carpeta_id_key" ON "PostGuardado"("post_id", "carpeta_id");
