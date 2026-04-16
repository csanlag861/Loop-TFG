"use client";
import stylesInput from "./input.module.css";
import { EyeOff , Eye} from '@geist-ui/icons';
import { useState } from "react";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
}
const Input = ({label, placeholder, type, name}: InputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className={stylesInput.contenedor}>
      <label>{label}</label>
      <input type={show ? "text" : type} placeholder={placeholder} name={name} />
      {type === "password" && !show ? (
        <EyeOff size={16} onClick={() => setShow(true)} />
      ) : type === "password" && (<Eye size={16} onClick={() => setShow(false)} />) }
    </div>
  );
};
export default Input;
