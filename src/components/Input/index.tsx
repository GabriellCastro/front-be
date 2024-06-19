import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder?: string;
  error?: string;
  description?: string;
  icon?: any;
  forgotPassword?: boolean;
  register: any;
};

export function Input({
  name,
  error,
  placeholder,
  description,
  icon,
  forgotPassword,
  register,
  ...rest
}: Props) {
  return (
    <div className={`flex w-full flex-col justify-start mb-2`}>
      <div className="w-full flex flex-row items-center justify-between mb-1 mt-2">
        {placeholder && <p className={`text-sm font-bold `}>{placeholder}</p>}
        {forgotPassword && (
          <a href="#" className="text-[#7C3AED] font-bold text-sm">
            Esqueceu a senha?
          </a>
        )}
      </div>

      <div
        className={`px-4 flex flex-row items-center
          h-12 w-full rounded-md border-[1px] border-blue400 p-[1px]
          ${error && "border-red-500"}
        `}
      >
        <input
          className="text-2 h-full w-full border-none  text-blue400
           placeholder:text-blue400 focus:outline-none"
          {...register(name)}
          {...rest}
          placeholder={description}
        />
        {icon}
      </div>
      {error && (
        <div className="flex flex-row">
          <p className="mt-1 text-end text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
