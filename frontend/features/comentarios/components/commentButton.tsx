"use client";

import { MessageCircle } from "@geist-ui/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const CommentButton = ({
  postId,
  initialCount,
  onClick,
}: {
  postId: number;
  initialCount: number;
  onClick: () => void;
}) => {
  const queryClient = useQueryClient();

  const { data: count } = useQuery({
    queryKey: ["commentCount", postId],
    queryFn: () => initialCount,
    initialData: initialCount,
    staleTime: Infinity,
  });

  useEffect(() => {
    queryClient.setQueryData(["commentCount", postId], (old: number | undefined) => 
      Math.max(old ?? 0, initialCount)
    );
  }, [initialCount, postId, queryClient]);

  return (
    <div className="flex items-center gap-1">
      <MessageCircle
        size={16}
        className="cursor-pointer hover:text-[var(--primary-color)] transition-colors duration-200"
        onClick={onClick}
      />
      <span>{count}</span>
    </div>
  );
};
