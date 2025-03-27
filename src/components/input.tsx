import { twMerge } from "tailwind-merge";

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={twMerge(
        "border-bg-t text-content-ph hover:border-content-ph focus:border-accent-brand focus:text-content-p w-full rounded-xl border p-3 transition ease-in-out outline-none",
        className,
      )}
    />
  );
};

export default Input;
