"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../queries/post-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import styleList from "../post-list-wrapper/post-list.module.css";
import Post from "../post/post";

const PostList = ({ initialData }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) => getPosts(pageParam),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [initialData],
        pageParams: [undefined],
      },
    });

  const posts = data.pages.flatMap((page) => page.list);

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
