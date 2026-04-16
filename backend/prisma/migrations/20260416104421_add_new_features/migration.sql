-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "contenido" VARCHAR(280) NOT NULL,
    "parent_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seguidor" (
    "id" SERIAL NOT NULL,
    "seguidor_id" INTEGER NOT NULL,
    "seguido_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seguidor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Like_post_id_idx" ON "Like"("post_id");

-- CreateIndex
CREATE INDEX "Like_usuario_id_idx" ON "Like"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_usuario_id_post_id_key" ON "Like"("usuario_id", "post_id");

-- CreateIndex
CREATE INDEX "Comentario_post_id_idx" ON "Comentario"("post_id");

-- CreateIndex
CREATE INDEX "Comentario_usuario_id_idx" ON "Comentario"("usuario_id");

-- CreateIndex
CREATE INDEX "Comentario_parent_id_idx" ON "Comentario"("parent_id");

-- CreateIndex
CREATE INDEX "Seguidor_seguidor_id_idx" ON "Seguidor"("seguidor_id");

-- CreateIndex
CREATE INDEX "Seguidor_seguido_id_idx" ON "Seguidor"("seguido_id");

-- CreateIndex
CREATE UNIQUE INDEX "Seguidor_seguidor_id_seguido_id_key" ON "Seguidor"("seguidor_id", "seguido_id");

-- CreateIndex
CREATE INDEX "PostGuardado_usuario_id_carpeta_id_idx" ON "PostGuardado"("usuario_id", "carpeta_id");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Comentario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguidor" ADD CONSTRAINT "Seguidor_seguidor_id_fkey" FOREIGN KEY ("seguidor_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguidor" ADD CONSTRAINT "Seguidor_seguido_id_fkey" FOREIGN KEY ("seguido_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
