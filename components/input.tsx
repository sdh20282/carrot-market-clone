import { InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 transition focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {
        errors.map((error, idx) => <span key={idx} className="text-red-500 font-medium">{error}</span>)
      }
    </div>
  )
}