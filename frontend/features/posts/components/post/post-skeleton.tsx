import { Skeleton } from "@/components/ui/skeleton";
import stylePost from "./post.module.css";

export function PostSkeleton() {
  return (
    <div className={stylePost.post}>
      
      {/* USER */}
      <div className={stylePost.user}>
        <div className="w-full flex gap-3 items-center justify-baseline">
          
          <Skeleton className="w-10 h-10 rounded-full" />

          <div className="flex items-baseline gap-2">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-3 w-[60px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>

        <Skeleton className="h-6 w-6 rounded-md" />
      </div>

      <div className={stylePost.badges}>
        <Skeleton className="h-5 w-[60px] rounded-full" />
        <Skeleton className="h-5 w-[80px] rounded-full" />
        <Skeleton className="h-5 w-[50px] rounded-full" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>

      <div className={stylePost.acciones}>
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  );
}