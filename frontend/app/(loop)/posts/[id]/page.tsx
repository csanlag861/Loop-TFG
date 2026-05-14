import { getPostById } from "@/features/posts/queries/postId-query";
import Post from "@/features/posts/components/post/post";
import CommentForm from "@/features/comentarios/components/comentarioInput";
import CommentList from "@/features/comentarios/components/comentarioList-wrapper";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CommentListWrapper from "@/features/comentarios/components/comentarioList-wrapper";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ width: "544px" }}>
        <Post post={post} variant="detail" />

        <CommentForm postId={postId} />

        <Suspense fallback={<p>Cargando comentarios...</p>}>
          <CommentListWrapper postId={postId} />
        </Suspense>
      </div>
    </div>
  );
}
