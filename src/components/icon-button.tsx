import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: LucideIcon;
  active?: boolean;
}

const IconButton = ({ Icon, active, className, ...props }: IconButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-bg-t text-accent-brand flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition-colors duration-300 ease-in-out",
        !active &&
          "bg-bg-s hover:bg-bg-t text-content-muted hover:text-accent-red",
        className,
      )}
    >
      <Icon size={24} />
    </button>
  );
};

export default IconButton;
