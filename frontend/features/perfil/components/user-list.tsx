"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { SeguidorUser } from "@/types/seguidor-types";
import {
  fetchSeguidores,
  fetchSeguidos,
} from "../seguidor/queries/seguidor-query";
import { UserCard } from "./user-card";

interface UserListProps {
  userId: number;
  type: "seguidores" | "seguidos";
  initialData?: any;
}

export default function UserList({
  userId,
  type,
  initialData,
}: Readonly<UserListProps>) {
  const queryKey =
    type === "seguidores"
      ? ["user-seguidores", userId]
      : ["user-seguidos", userId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) =>
        type === "seguidores"
          ? fetchSeguidores(userId, pageParam)
          : fetchSeguidos(userId, pageParam),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.metadata?.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: initialData
        ? { pages: [initialData], pageParams: [undefined] }
        : undefined,
    });

  const users = data?.pages.flatMap((page: any) => page.list) ?? [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if ((status as string) === "pending" && !initialData) {
    return (
      <div className="flex justify-center mt-8 text-gris01 text-[14px]">
        Cargando...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex justify-center mt-8 text-gris01 text-[14px]">
        {type === "seguidores"
          ? "Este usuario no tiene seguidores aún."
          : "Este usuario no sigue a nadie aún."}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3 mt-4 w-full">
      {users.map((user: SeguidorUser) => (
        <UserCard key={`${type}-${user.id}`} user={user} />
      ))}

      {isFetchingNextPage && (
        <div className="flex justify-center mt-4 text-gris01 text-[14px]">
          Cargando más usuarios...
        </div>
      )}

      <div ref={ref}>
        {!hasNextPage && users.length > 0 && (
          <p className="text-center text-gris01 text-[14px] mt-4">
            No hay más usuarios.
          </p>
        )}
      </div>
    </ul>
  );
}
