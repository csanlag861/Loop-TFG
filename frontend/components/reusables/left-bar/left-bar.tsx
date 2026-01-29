import stylesLeft from "./left-bar.module.css";
import {
  Home,
  Search,
  Bookmark,
  LogIn,
  Settings,
  Minimize2,
} from "@geist-ui/icons";
import Image from "next/image";

const LeftBar = () => {
  return (
    <aside className="h-screen flex flex-col items-center justify-around bg-(--bg-01) border-r border-(--gris-07)">
      <Image src="/favicon.ico" alt="Logo de Loop" width={62} height={62} />
      <nav>
        <ul className="flex flex-col md:gap-10">
          <li className="flex gap-2 justify-center items-center md:text-03">
            <Home size={24} />
            Home
          </li>
          <li className="flex gap-2 justify-center items-center md:text-03">
            <Search size={24} />
            Busqueda
          </li>
          <li className="flex gap-2 justify-center items-center md:text-03">
            <Bookmark size={24} />
            Guardados
          </li>
          <li className="flex gap-2 justify-center items-center md:text-03">
            Perfil
          </li>
        </ul>
      </nav>
      <div>
        <ul className="flex flex-col md:gap-5">
          <li className="flex gap-2 justify-center items-center md:text-(--gris-03)">
            <LogIn size={24} />
            Iniciar Sesión
          </li>
          <li className="flex gap-2 justify-center items-center md:text-(--gris-03)">
            <Minimize2 size={24} />
            Contraer
          </li>
          <li className="flex gap-2 justify-center items-center md:text-(--gris-03)">
            <Settings size={24} />
            Ajustes
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftBar;
