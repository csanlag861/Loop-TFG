import stylesButton from "./button.module.css";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
const Button = ({ text, type = "button", ...otherProps}: ButtonProps) => {
  return (
    <button type={type} className={stylesButton.loop} {...otherProps}>
      {text}
    </button>
  );
};

export default Button;
