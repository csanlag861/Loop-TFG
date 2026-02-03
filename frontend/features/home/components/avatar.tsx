import { User } from "@geist-ui/icons";
import { getUserData } from "../queries/user-data";
import Image from "next/image";

const Avatar = async () => {
    const userData = await getUserData();
    if (!userData) return <User />
    return (
        <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image src={userData?.avatarURL} alt="Avatar usuario" width={24} height={24} className="object-cover w-full h-full" />
        </div>
    )
}

export default Avatar;