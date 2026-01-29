import stylesPage from "./page.module.css";
import { PostList } from "@/features/posts/components/post-list";

export default function PostsPage() {
  return (
    <section className={`flex flex-col justify-center ${stylesPage.section}`}>
      <h1>Home</h1>
      <hr />
      <PostList />
    </section>
  );
}
