import stylesPage from "./page.module.css";
import { PostList } from "@/features/posts/components/post-list/post-list";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import InputText from "@/features/posts/components/input/input";

export default function PostsPage() {
  return (
    <section className={`flex flex-col justify-center ${stylesPage.section}`}>
      <h1>Home</h1>
      <InputText />
      <Suspense fallback={<SkeletonCard />}>
        <PostList />
      </Suspense>
    </section>
  );
}
