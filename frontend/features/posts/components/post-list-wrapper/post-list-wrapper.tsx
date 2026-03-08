import { getPosts } from "../../queries/post-query";
import PostList from "../post-list/PostList";

const PostListWrapper = async () => {
  const posts = await getPosts();

  return <PostList initialData={posts} />;
};

export default PostListWrapper;
