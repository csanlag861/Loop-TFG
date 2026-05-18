"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Post from "@/features/posts/components/post/post";
import { PostEditable } from "@/types/post-types";
import { fetchUserPosts, fetchUserLikes } from "../queries/profile-query";

interface ProfilePostListProps {
  userId: number;
  type: "posts" | "likes";
  initialData?: any;
}

export const ProfilePostList = ({
  userId,
  type,
  initialData,
}: ProfilePostListProps) => {
  const queryKey =
    type === "posts" ? ["user-posts", userId] : ["user-likes", userId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        type === "posts"
          ? fetchUserPosts(userId, pageParam)
          : fetchUserLikes(userId, pageParam),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.metadata?.hasNextPage ? lastPage.metadata.cursor : undefined,
      // Hidratación opcional desde el Server Component
      initialData: initialData
        ? { pages: [initialData], pageParams: [undefined] }
        : undefined,
    });

  const posts = data?.pages.flatMap((page: any) => page.list) ?? [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending" && !initialData) {
    return (
      <div className="flex justify-center mt-8 text-gris01 text-[14px]">
        Cargando...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center mt-8 text-gris01 text-[14px]">
        {type === "posts"
          ? "Este usuario no tiene posts aún."
          : "Este usuario no ha dado like a ningún post."}
      </div>
    );
  }

  return (
    <ul className="flex flex-col items-center justify-center gap-8 mt-8 w-full">
      {posts.map((post: PostEditable) => (
        <Post key={`${type}-${post.id}`} post={post} />
      ))}

      {isFetchingNextPage && (
        <div className="flex justify-center mt-4 text-gris01 text-[14px]">
          Cargando más posts...
        </div>
      )}

      <div ref={ref}>
        {!hasNextPage && posts.length > 0 && (
          <p className="text-center text-gris01 text-[14px] mt-4">
            No hay más posts.
          </p>
        )}
      </div>
    </ul>
  );
};

export default ProfilePostList;
