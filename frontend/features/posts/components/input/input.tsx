import Button from "@/components/reusables/button/Button";
import { Code, Image } from "@geist-ui/icons";
import Img from "next/image";
import { getDataUser } from "../../queries/user-data";
import PublishPost from "./publishPost";
import { fetcher } from "@/lib/fetcher";
import { getTecnologias } from "@/utils/api";

const InputText = async () => {
  const dataUser = await getDataUser();
  if (!dataUser) return null;

  const tecnologias = await fetcher(getTecnologias());

  return (
    <div className="w-full h-48 flex flex-col items-center justify-center border-t border-b border-(--gris-07)">
      <div className="flex gap-6">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Img
            src={dataUser.avatarURL}
            width={40}
            height={40}
            alt="User Profile"
          />
        </div>
        <PublishPost tecnologias={tecnologias} />
      </div>
      <div className="flex justify-center items-center gap-72">
        <div className="flex gap-4">
          <Code width={24} color="var(--primary-color)" />
          <Image width={24} color="var(--primary-color)" />
        </div>
      </div>
    </div>
  );
};

export default InputText;
