import stylesPage from "./page.module.css";
import PostListWrapper from "@/features/posts/components/post-list-wrapper/post-list-wrapper";
import { Suspense } from "react";
import InputText from "@/features/posts/components/input/input";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "@/features/search/search-params";
import { PostSkeleton } from "@/features/posts/components/post/post-skeleton";
import MobileHeader from "@/components/reusables/mobile-header/mobile-header";
 
type PostsPageParams = {
  searchParams: Promise<SearchParams>;
};
 
export default async function PostsPage({ searchParams }: PostsPageParams) {
  return (
    <>
      <MobileHeader />
      <section className={`flex flex-col justify-center ${stylesPage.section}`}>
        <h1 className="hidden md:block">Home</h1>
        <div className="hidden md:block">
          <InputText />
        </div>
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 justify-center items-center mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        }
      >
        {" "}
        <PostListWrapper
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </section>
   </>
  );
}
