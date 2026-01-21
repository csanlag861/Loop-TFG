import stylesButton from "./button.module.css";

type ButtonProps = {
  text: string;
}
const Button = ({text}: ButtonProps) => {
  return (
    <button type="button" className={stylesButton.loop}>
      {text}
    </button>
  );
};

export default Button;
