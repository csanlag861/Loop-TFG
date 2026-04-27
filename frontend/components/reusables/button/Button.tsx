import { ButtonHTMLAttributes } from "react";
import stylesButton from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = ({ text, type = "button", className, ...otherProps}: ButtonProps) => {
  return (
    <button type={type} className={`${stylesButton.loop} ${className}`} {...otherProps}>
      {text}
    </button>
  );
};

export default Button;
