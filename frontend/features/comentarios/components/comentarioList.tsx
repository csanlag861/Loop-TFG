"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsByPost } from "../queries/get-comentarios";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CommentItem from "./comentarioItem";

export default function CommentList({
  postId,
  initialData,
}: {
  postId: number;
  initialData: any;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", postId],
      queryFn: ({ pageParam }) => getCommentsByPost(postId, pageParam),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [initialData],
        pageParams: [undefined],
      },
      staleTime: 0,
      gcTime: 0,
    });

  const comments = data?.pages.flatMap((page: any) => page.list) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}

      {isFetchingNextPage && <p className="p-4">Cargando más comentarios...</p>}

      <div ref={ref} />

      {!hasNextPage && comments.length > 0 && (
        <p className="p-4 text-sm text-gray-500">No hay más comentarios</p>
      )}
    </div>
  );
}
