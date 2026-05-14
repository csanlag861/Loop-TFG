import { getCommentsByPost } from "../queries/get-comentarios";
import CommentList from "./comentarioList";

export default async function CommentListWrapper({
  postId,
}: {
  postId: number;
}) {
  const initialData = await getCommentsByPost(postId);

  return (
    <CommentList postId={postId} initialData={initialData} />
  );
}