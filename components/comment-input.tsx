import { InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
}

export default function CommentInput({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        name={name}
        className="bg-transparent w-full h-10 focus:outline-none border-0 border-b-2 border-neutral-200 focus:border-orange-500 focus:ring-0 transition placeholder:text-neutral-400"
        {...rest}
      />
      {
        errors.map((error, idx) => <span key={idx} className="text-red-500 font-medium">{error}</span>)
      }
    </div>
  );
}