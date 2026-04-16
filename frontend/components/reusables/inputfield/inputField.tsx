"use client";

type InputProps = {
  label: string;
  error?: string;
  register: any;
  placeholder: string;
  type?: string;
};

const InputField = ({
  label,
  error,
  register,
  placeholder,
  type = "text",
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-(--gris-07)">{label}</label>

      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className={`
          border rounded-full px-4 py-3 outline-none
          ${error ? "border-red-500" : "border-(--gris-07)"}
          focus:border-(--primary-color) focus:ring-2 focus:ring-(--color-04)
        `}
      />

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default InputField;
