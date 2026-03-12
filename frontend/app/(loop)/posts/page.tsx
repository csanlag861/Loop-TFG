import stylesPage from "./page.module.css";
import PostListWrapper from "@/features/posts/components/post-list-wrapper/post-list-wrapper";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import InputText from "@/features/posts/components/input/input";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "@/features/search/search-params";

type PostsPageParams = {
  searchParams: Promise<SearchParams>;
}

export default async function PostsPage({searchParams}: PostsPageParams) {
  return (
    <section className={`flex flex-col justify-center ${stylesPage.section}`}>
      <h1>Home</h1>
      <InputText />
      <Suspense fallback={<SkeletonCard />}>
        <PostListWrapper searchParams={searchParamsCache.parse(await searchParams)} />
      </Suspense>
    </section>
  );
}
