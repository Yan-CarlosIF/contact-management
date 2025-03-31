import { CircleAlert, CircleCheck, CircleX } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface WarningProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  done: boolean;
  type: "warning" | "error";
}

const Warning = ({ content, done, className, type }: WarningProps) => {
  return (
    <div
      className={twMerge(
        "text-content-body flex items-center gap-2 text-sm",
        className,
        done && "opacity-100",
      )}
    >
      {done ? (
        type === "warning" ? (
          <CircleAlert fill="#00c7be" className="text-bg-s h-5 w-5" />
        ) : (
          <CircleCheck fill="green" className="text-bg-s h-5 w-5" />
        )
      ) : type === "error" ? (
        <CircleX fill="red" className="text-bg-s h-5 w-5" />
      ) : (
        <CircleAlert fill="#00c7be" className="text-bg-s h-5 w-5" />
      )}
      <p>{content}</p>
    </div>
  );
};

export default Warning;
