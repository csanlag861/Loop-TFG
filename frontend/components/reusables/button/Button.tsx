import stylesButton from "./button.module.css";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}
const Button = ({ text, type = "button", className, ...otherProps}: ButtonProps) => {
  return (
    <button type={type} className={`${stylesButton.loop} ${className}`} {...otherProps}>
      {text}
    </button>
  );
};

export default Button;
