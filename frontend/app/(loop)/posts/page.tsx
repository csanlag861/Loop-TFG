import stylesPage from "./page.module.css";
import PostListWrapper from "@/features/posts/components/post-list-wrapper/post-list-wrapper";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import InputText from "@/features/posts/components/input/input";

export default function PostsPage() {
  return (
    <section className={`flex flex-col justify-center ${stylesPage.section}`}>
      <h1>Home</h1>
      <InputText />
      <Suspense fallback={<SkeletonCard />}>
        <PostListWrapper />
      </Suspense>
    </section>
  );
}
