"use client";
import { InputHTMLAttributes } from "react";
import stylesInput from "./input.module.css";
import { EyeOff , Eye} from '@geist-ui/icons';
import { useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({label, type, ...otherProps}: InputProps) => {
  const [show, setShow] = useState(false);


  return (
    <div className={stylesInput.contenedor}>
      <label>{label}</label>
      <input type={show ? "text" : type} {...otherProps} />
      {type === "password" && !show ? (
        <EyeOff size={16} onClick={() => setShow(true)} />
      ) : type === "password" && (<Eye size={16} onClick={() => setShow(false)} />) }
    </div>
  );
};
export default Input;
