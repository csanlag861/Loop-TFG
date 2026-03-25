"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../queries/post-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import styleList from "../post-list-wrapper/post-list.module.css";
import Post from "../post/post";
import { useSearchParams } from "next/navigation";

const PostList = ({ initialData }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const username = searchParams.get("username") ?? "";
  const tech = searchParams.get("tech") ?? "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", search, username, tech],
      queryFn: ({ pageParam }) => getPosts(pageParam, search, username, tech),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: search || username || tech ? undefined : {
        pages: [initialData],
        pageParams: [undefined],
      },
      staleTime: 0,
      gcTime: 0
    });

  const posts = data?.pages.flatMap((page) => page.list) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <ul className={`${styleList.posts} mt-8`}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isFetchingNextPage && <p>Cargando más posts...</p>}

      <div ref={ref}>
        {!hasNextPage && posts.length > 0 && <p>No hay más posts.</p>}
      </div>
    </ul>
  );
};

export default PostList;
