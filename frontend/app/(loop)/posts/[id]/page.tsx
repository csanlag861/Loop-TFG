import { getPostById } from "@/features/posts/queries/postId-query";
import Post from "@/features/posts/components/post/post";
import CommentForm from "@/features/comentarios/components/comentarioInput";
import CommentListWrapper from "@/features/comentarios/components/comentarioList-wrapper";
import MobileCommentAction from "@/features/comentarios/components/comentarioMobileAction";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const postId = Number(id);
  if (Number.isNaN(postId)) return notFound();

  let post;

  try {
    post = await getPostById(postId);
  } catch {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-0">
      <div className="w-full max-w-[544px]">
        {/* CABECERA MÓVIL (BOTÓN VOLVER ATRÁS) */}
        <div className="flex items-center gap-2 py-4 md:hidden border-b border-[var(--gris-07)] mb-4">
          <Link
            href="/posts"
            className="flex items-center gap-2 text-gris01 hover:text-primary-color transition-colors duration-200 text-[14px]"
          >
            <ArrowLeft size={20} />
            <span className="font-sohne-regular">Volver al Inicio</span>
          </Link>
        </div>

        {/* DETALLE DEL POST */}
        <Post post={post} variant="detail" />

        {/* CAJA DE COMENTARIOS TRADICIONAL (SÓLO DESKTOP) */}
        <div className="hidden md:block">
          <CommentForm postId={postId} />
        </div>

        {/* LISTA DE COMENTARIOS */}
        <Suspense fallback={<p className="text-[var(--gris-03)] text-sm my-4">Cargando comentarios...</p>}>
          <CommentListWrapper postId={postId} />
        </Suspense>

        {/* BOTÓN FLOTANTE Y DIÁLOGO MÓVIL PARA COMENTAR */}
        <MobileCommentAction post={post} />
      </div>
    </div>
  );
}

