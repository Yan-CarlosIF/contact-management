import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface labelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const LabelButton = ({ children, className, ...props }: labelButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        "border-bg-t text-content-p hover:border-content-body flex h-12 w-12 flex-2 cursor-pointer items-center justify-center rounded-xl border-1 transition-colors duration-300 ease-in-out",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default LabelButton;
