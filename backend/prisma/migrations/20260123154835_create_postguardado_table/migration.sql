-- CreateTable
CREATE TABLE "PostGuardado" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "carpeta_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostGuardado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostGuardado" ADD CONSTRAINT "PostGuardado_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostGuardado" ADD CONSTRAINT "PostGuardado_carpeta_id_fkey" FOREIGN KEY ("carpeta_id") REFERENCES "Carpeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
