import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  Icon?: LucideIcon;
}

const Button = ({ Icon, content, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-accent-brand flex cursor-pointer items-center justify-center gap-1 rounded-xl px-3 py-4 text-sm leading-5 font-semibold text-nowrap transition-colors duration-200 ease-in-out not-disabled:hover:bg-[#05dbd2] disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
    >
      {Icon && <Icon className="text-content-p h-4 w-4" />}
      {content}
    </button>
  );
};

export default Button;
