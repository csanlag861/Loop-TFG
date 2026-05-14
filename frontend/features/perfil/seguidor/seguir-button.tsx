"use client";

import { useTransition, useOptimistic } from "react";
import { toggleFollowAction } from "./seguidor-action";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

interface FollowButtonProps {
  targetUserId: number;
  initialIsFollowing: boolean;
}

export function FollowButton({
  targetUserId,
  initialIsFollowing,
}: FollowButtonProps) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  // Estado Optimista
  const [optimisticFollowing, addOptimisticFollowing] = useOptimistic<
    boolean,
    boolean
  >(
    initialIsFollowing,
    (state, optimisticValue) => optimisticValue, // Reemplaza el estado temporalmente
  );

  const handleToggle = async () => {
    // 1. Calculamos el futuro estado (toggle)
    const newFollowState = !optimisticFollowing;

    startTransition(async () => {
      // 2. Actualizamos la UI inmediatamente sin esperar la DB
      addOptimisticFollowing(newFollowState);

      // 3. Ejecutamos la Server Action
      const result = await toggleFollowAction(targetUserId, pathname);
      console.log(result);

      // 4. Fallback si algo salió mal en el backend
      if (!result.isFollowing) {
        toast.error(result.message);
      } else {
        toast.success(newFollowState ? "Siguiendo" : "Dejaste de seguir");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`px-4 py-2 font-semibold rounded-full transition-all duration-300
        ${
          optimisticFollowing
            ? "bg-transparent border border-gray-600 text-white hover:border-red-500 hover:text-red-500"
            : "bg-white text-black hover:bg-gray-200"
        }
      `}
    >
      {optimisticFollowing ? "Siguiendo" : "Seguir"}
    </button>
  );
}
