-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "contenido" VARCHAR(280) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTecnologia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PostToTecnologia_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PostToTecnologia_B_index" ON "_PostToTecnologia"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTecnologia" ADD CONSTRAINT "_PostToTecnologia_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTecnologia" ADD CONSTRAINT "_PostToTecnologia_B_fkey" FOREIGN KEY ("B") REFERENCES "Tecnologia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
