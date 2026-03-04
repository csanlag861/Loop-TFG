"use client";
import { User } from "@geist-ui/icons";
import { getDataUser } from "../queries/user-data";
import Image from "next/image";
import { useEffect, useState } from "react";

type UserData = {
  avatarURL: string;
  id: string;
};

const Avatar = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    getDataUser().then(setUserData);
  }, []);

  if (!userData) return <User />;
  return (
      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
        <Image
          src={userData?.avatarURL}
          alt="Avatar usuario"
          width={24}
          height={24}
          className="object-cover w-full h-full"
        />
      </div>
  );
};

export default Avatar;
