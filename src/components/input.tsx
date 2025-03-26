import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const Input = ({ placeholder, title, type, className }: InputProps) => {
  return (
    <div>
      <h2 className="text-content-body text-md leading-5 font-semibold">
        {title}
      </h2>
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        className={twMerge(
          "border-bg-t text-content-ph hover:border-content-ph focus:border-accent-brand focus:text-content-p mt-2 w-full rounded-lg border p-3 transition ease-in-out outline-none",
          className,
        )}
      />
    </div>
  );
};

export default Input;
