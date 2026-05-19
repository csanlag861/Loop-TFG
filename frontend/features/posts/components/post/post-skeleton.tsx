import { Skeleton } from "@/components/ui/skeleton";
import stylePost from "./post.module.css";

export function PostSkeleton() {
  return (
    <div className={`${stylePost.post} border-[var(--gris-07)] bg-rgba(26,26,26,0.35) opacity-65 pointer-events-none w-full max-w-[544px] p-4 flex flex-col gap-4`}>
      {/* Header section (Avatar + Username) */}
      <div className="flex gap-3 items-center w-full">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>

      {/* Badges section */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      {/* Content text section */}
      <div className="flex flex-col gap-2 w-full mt-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Actions footer section */}
      <div className="flex justify-around items-center w-full border-t border-[var(--gris-07)]/30 pt-3 mt-1">
        <Skeleton className="h-4 w-8 rounded" />
        <Skeleton className="h-4 w-8 rounded" />
        <Skeleton className="h-4 w-8 rounded" />
      </div>
    </div>
  );
}