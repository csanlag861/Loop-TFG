import stylesButton from "./button.module.css";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  classname?: string;
}
const Button = ({ text, type = "button", classname, ...otherProps}: ButtonProps) => {
  return (
    <button type={type} className={`${stylesButton.loop} ${classname}`} {...otherProps}>
      {text}
    </button>
  );
};

export default Button;
