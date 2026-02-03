import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/reusables/button/Button";
import { Code, Image } from "@geist-ui/icons";

const InputText = () => {
  return (
    <div className="w-full h-48 flex flex-col items-center justify-center border-t border-b border-(--gris-07)">
      <Textarea
        placeholder="¿Qué has aprendido hoy?"
        className="w-120 h-16 font-sohne-light mb-8"
      />
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
