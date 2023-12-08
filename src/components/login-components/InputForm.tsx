import { ChangeEvent } from "react";

type InputLoginProps = {
  placeholder: string;
  type: "text" | "email" | "password";
  name: string;
  icon?: JSX.Element;
  onChange:(event: ChangeEvent<HTMLInputElement>) =>void
};

const InputForm = (props: InputLoginProps) => {
  const { name, placeholder, type, icon, onChange } = props;
  return (
    <div className="w-full relative">
      <input
        className="h-8 rounded input input-bordered border-white w-full bg-slate-100 placeholder:text-primary text-p600"
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        required
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-p500">
        {icon}
      </span>
    </div>
  );
};
export default InputForm;
