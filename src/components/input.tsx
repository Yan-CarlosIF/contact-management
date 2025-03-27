import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={twMerge(
        "border-bg-t text-content-ph hover:border-content-ph focus:border-accent-brand focus:text-content-p mt-2 w-full rounded-xl border p-3 transition ease-in-out outline-none",
        className,
      )}
    />
  );
};

export default Input;
