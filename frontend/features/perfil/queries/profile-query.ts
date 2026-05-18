import { fetcher } from "@/lib/fetcher";
import { getPostsFromUser, getUserLikes } from "@/utils/api";

export const fetchUserPosts = async (userId: number, pageParam?: number) => {
  let url = getPostsFromUser({ param: userId });
  if (pageParam !== undefined) {
    url += `?cursor=${pageParam}`;
  }
  return fetcher(url);
};

export const fetchUserLikes = async (userId: number, pageParam?: number) => {
  let url = getUserLikes({ param: userId });
  if (pageParam !== undefined) {
    url += `?cursor=${pageParam}`;
  }
  return fetcher(url);
};
