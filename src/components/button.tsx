import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
}

const Button = ({ content, className }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "bg-accent-brand mt-4 flex w-1/4 cursor-pointer items-center justify-center rounded-xl p-4 text-sm leading-5 font-semibold text-nowrap transition-colors duration-100 ease-in-out hover:bg-[#A8D30D]",
        className,
      )}
    >
      {content}
    </button>
  );
};

export default Button;
