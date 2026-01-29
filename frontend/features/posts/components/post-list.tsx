"use client";

import styleList from "./post-list.module.css";
import { Spinner } from "@/components/ui/spinner";
import { usePosts } from "../queries/post-query";
import Post from "./post";

export const PostList = () => {
  const { posts, isLoading, isError } = usePosts();
  
  return (
    <ul className={styleList.posts}>
        {isLoading && (<Spinner />)}
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </ul>
  );
};

export default Post;
