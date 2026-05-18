"use client";

import Image from "next/image";
import Link from "next/link";
import { SeguidorUser } from "@/types/seguidor-types";
import { FollowButton } from "../seguidor/seguir-button";

interface UserCardProps {
  user: SeguidorUser;
  showFollowButton?: boolean;
}

export function UserCard({
  user,
  showFollowButton = true,
}: Readonly<UserCardProps>) {
  return (
    <li className="flex items-center justify-between gap-4 p-4 rounded-xl bg-(--bg-02) border border-(--gris-07) hover:border-(--gris-05) transition-all duration-200">
      <Link
        href={`/perfil/${user.id}`}
        className="flex items-center gap-3 min-w-0 flex-1"
      >
        <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
          <Image
            src={user.avatarURL || "/default-avatar.png"}
            alt={`Avatar de ${user.username}`}
            width={44}
            height={44}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-sohne-regular text-gris01 text-[14px] truncate">
            @{user.username}
          </span>
          <span className="font-sohne-light text-gris03 text-[13px] truncate">
            {user.nombre}
          </span>
        </div>
      </Link>

      {showFollowButton && (
        <FollowButton
          targetUserId={user.id}
          initialIsFollowing={user.isFollowing}
        />
      )}
    </li>
  );
}
