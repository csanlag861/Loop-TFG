import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/reusables/button/Button";
import { Code, Image } from "@geist-ui/icons";
import Img from "next/image";
import { getDataUser } from "../../queries/user-data";

const InputText = async () => {
  const dataUser = await getDataUser();
  if (!dataUser) return null;
  return (
    <div className="w-full h-48 flex flex-col items-center justify-center border-t border-b border-(--gris-07)">
      <div className="flex gap-6">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Img src={dataUser.avatarURL} width={40} height={40} alt="User Profile" />
        </div>
        <Textarea
          placeholder="¿Qué has aprendido hoy?"
          className="w-120 h-16 font-sohne-light mb-8"
        />
      </div>
      <div className="flex justify-center items-center gap-72">
        <div className="flex gap-4">
          <Code width={24} color="var(--primary-color)" />
          <Image width={24} color="var(--primary-color)" />
        </div>
        <Button text="Publicar" classname="[--btn-width:128px]" />
      </div>
    </div>
  );
};

export default InputText;
