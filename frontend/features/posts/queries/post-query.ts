'use client';
import useSWR from "swr";
import { getPosts } from "../post.service";

export function usePosts(){
    const {data, error, isLoading} = useSWR('/posts', getPosts)
    return{
        posts: data ?? [],
        isLoading,
        isError: error,
    }
}