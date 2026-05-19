"use client";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../queries/post-query";
import { useInView } from "react-intersection-observer";
import styleList from "../post-list-wrapper/post-list.module.css";
import Post from "../post/post";
import { PostSkeleton } from "../post/post-skeleton";
import { useSearchParams } from "next/navigation";
import { PostEditable } from "@/types/post-types";
import { Plus } from "@geist-ui/icons";
import CreatePostDialog from "../input/create-post-dialog";

const PostList = ({ initialData }: { initialData: any }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const username = searchParams.get("username") ?? "";
  const tech = searchParams.get("tech") ?? "";

  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", search, username, tech],
      queryFn: ({ pageParam }) => getPosts(pageParam, search, username, tech),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.metadata?.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: search || username || tech ? undefined : {
        pages: [initialData],
        pageParams: [undefined],
      },
      staleTime: 0,
      gcTime: 0
    });

  const posts = data?.pages.flatMap((page: any) => page.list) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <ul className={`${styleList.posts} mt-8`}>
        {posts.map((post: PostEditable) => (
          <Post key={post.id} post={post} />
        ))}

        {isFetchingNextPage && (
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

        <div ref={ref}>
          {!hasNextPage && posts.length > 0 && <p className="text-[var(--gris-03)] text-sm text-center my-4">No hay más posts.</p>}
        </div>
      </ul>

      {/* 
        MOBILE CREATOR FAB (floating '+' button)
        Only visible on mobile screens. Uses Geist UI Plus icon.
      */}
      <button
        onClick={() => setIsCreatorOpen(true)}
        className="
          fixed bottom-20 right-6 z-40 
          bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] 
          text-white w-14 h-14 rounded-full shadow-2xl 
          flex items-center justify-center 
          md:hidden border-0 cursor-pointer 
          active:scale-95 transition-all duration-150
        "
        aria-label="Crear nueva publicación"
      >
        <Plus size={22} />
      </button>

      {/* Create Post Dialog (Separated Component) */}
      <CreatePostDialog
        open={isCreatorOpen}
        onOpenChange={setIsCreatorOpen}
      />
    </>
  );
};

export default PostList;
