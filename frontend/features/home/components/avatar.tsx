"use client";
import { User } from "@geist-ui/icons";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetcherClient } from "@/lib/fetcher-client";
import { getUserData } from "@/utils/api";

const Avatar = () => {
  const { data: userData } = useQuery({
    queryKey: ["profile-me"],
    queryFn: () => fetcherClient(getUserData()),
  });

  if (!userData?.avatarURL) return <User />;
  return (
    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
      <Image
        src={userData.avatarURL}
        alt="Avatar usuario"
        width={24}
        height={24}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Avatar;
