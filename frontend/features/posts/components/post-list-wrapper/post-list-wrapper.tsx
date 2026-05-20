import { getPosts } from "../../queries/post-query";
import PostList from "../post-list/PostList";
import { ParsedSearchParams } from "@/features/search/search-params";
import { GetCookies } from "@/lib/get-token";

type PostListProps = {
  searchParams: ParsedSearchParams;
}

const PostListWrapper = async ({searchParams}: PostListProps) => {
  const [posts, cookieStore] = await Promise.all([
    getPosts(undefined, searchParams.search, searchParams.username, searchParams.tech),
    GetCookies(),
  ]);
  const isAuthenticated = !!cookieStore;

  return <PostList initialData={posts} isAuthenticated={isAuthenticated} />;
};

export default PostListWrapper;
