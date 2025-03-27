import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
}

const Button = ({ content, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-accent-brand mt-4 flex cursor-pointer items-center justify-center rounded-xl px-3 py-4 text-sm leading-5 font-semibold text-nowrap transition-colors duration-100 ease-in-out not-disabled:hover:bg-[#A8D30D]",
        className,
      )}
    >
      {content}
    </button>
  );
};

export default Button;
