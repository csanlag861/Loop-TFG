"use client";
import stylesInput from "./input.module.css";
import { EyeOff , Eye} from '@geist-ui/icons';
import { useState } from "react";

import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

const Input = ({ label, placeholder, type, name, error, register }: InputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className={stylesInput.contenedor}>
      <label>{label}</label>
      <div className={stylesInput.wrapper}>
        <input
          type={show ? "text" : type}
          placeholder={placeholder}
          {...register}
          className={error ? stylesInput.inputError : ""}
        />
        {type === "password" && (
          <div className={stylesInput.icon} onClick={() => setShow(!show)}>
            {show ? <Eye size={16} /> : <EyeOff size={16} />}
          </div>
        )}
      </div>
      {error && <span className={stylesInput.errorMessage}>{error}</span>}
    </div>
  );
};
export default Input;
