import stylesInput from "./input.module.css";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
}

const Input = ({label, placeholder, type}: InputProps) => {
  return (
    <div className={stylesInput.contenedor}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
};
export default Input;
