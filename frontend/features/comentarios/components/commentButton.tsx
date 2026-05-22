"use client";

import { MessageCircle } from "@geist-ui/icons";
import { useQuery } from "@tanstack/react-query";

export const CommentButton = ({
  postId,
  initialCount,
  onClick,
}: {
  postId: number;
  initialCount: number;
  onClick: () => void;
}) => {
  const { data: count } = useQuery({
    queryKey: ["commentCount", postId],
    initialData: initialCount,
    staleTime: Infinity,
  });

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
