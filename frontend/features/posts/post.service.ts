import { fetcher } from "@/lib/fetcher";

export const getPosts = async () => fetcher('http://localhost:3000/api/post/getAll')