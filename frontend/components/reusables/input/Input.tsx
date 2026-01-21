import stylesInput from "./input.module.css";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
}

const Input = ({label, placeholder, type, name}: InputProps) => {
  return (
    <div className={stylesInput.contenedor}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} name={name} />
    </div>
  );
};
export default Input;
