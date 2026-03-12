import { getPosts } from "../../queries/post-query";
import PostList from "../post-list/PostList";
import { ParsedSearchParams } from "@/features/search/search-params";

type PostListProps = {
  searchParams: ParsedSearchParams;
}

const PostListWrapper = async ({searchParams}: PostListProps) => {
  const posts = await getPosts(undefined, searchParams.search, searchParams.username, searchParams.tech);

  return <PostList initialData={posts} />;
};

export default PostListWrapper;
