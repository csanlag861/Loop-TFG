import styleList from "./post-list.module.css";
import { getPosts } from "../../queries/post-query";
import Post from "../post/post";

export const PostList = async () => {
  const posts = await getPosts();  
  return (
    <ul className={`${styleList.posts} mt-8`}>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </ul>
  );
};

export default Post;
