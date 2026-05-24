"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePostAction } from "@/features/posts/actions/like-action";
import { unlikePostAction } from "@/features/posts/actions/unlike-action";
import { Heart, HeartFill } from "@geist-ui/icons";
import { toast } from "sonner";

export const LikeButton = ({
  post_id,
  initialLiked,
  initialCount,
}: {
  readonly post_id: number;
  readonly initialLiked: boolean;
  readonly initialCount: number;
}) => {
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [count, setCount] = useState<number>(initialCount ?? 0);

  const queryClient = useQueryClient();

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  useEffect(() => {
    setCount(initialCount ?? 0);
  }, [initialCount]);

  const mutation = useMutation({
    mutationFn: async (isCurrentlyLiked: boolean) => {
      console.log(
        `📡 Iniciando acción: ${isCurrentlyLiked ? "UNLIKE" : "LIKE"} en post ${post_id}`,
      );
      let result;
      if (isCurrentlyLiked) {
        result = await unlikePostAction(post_id);
      } else {
        result = await likePostAction(post_id);
      }
      
      if (result && "error" in result) {
        throw new Error(result.error as string);
      }
      
      return result;
    },
    onMutate: async (isCurrentlyLiked: boolean) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousLiked = liked;
      const previousCount = count;

      setLiked(!isCurrentlyLiked);
      setCount((prev) => prev + (isCurrentlyLiked ? -1 : 1));

      console.log(
        `✨ Optimistic update: ${isCurrentlyLiked ? "liked" : "unliked"} → ${!isCurrentlyLiked ? "liked" : "unliked"}`,
      );

      return { previousLiked, previousCount };
    },
    onError: (error, isCurrentlyLiked, context) => {
      console.error(`❌ Error en la mutación:`, error);

      if (context) {
        setLiked(context.previousLiked);
        setCount(context.previousCount);
        console.log(
          `⏪ Revirtiendo a estado anterior: liked=${context.previousLiked}, count=${context.previousCount}`,
        );
      }

      toast.error(error.message || "Error al procesar el like");
    },
    onSuccess: (data, isCurrentlyLiked) => {
      console.log(`✅ Éxito:`, data);
      toast.success(isCurrentlyLiked ? "Like eliminado" : "Like añadido");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <button
      className="flex items-center gap-2 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => mutation.mutate(liked)}
      disabled={mutation.isPending}
    >
      {liked ? (
        <HeartFill key="filled" size={16} className="text-red-500 animate-heart-pop" />
      ) : (
        <Heart key="empty" size={16} className="hover:scale-110 transition-transform duration-200" />
      )}{" "}
      {count}
    </button>
  );
};
