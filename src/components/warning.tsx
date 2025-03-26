import { CircleX } from "lucide-react";

interface WarningProps {
  content: string;
}

const Warning = ({ content }: WarningProps) => {
  return (
    <div className="text-content-body flex items-center gap-2 text-sm">
      <CircleX fill="red" className="text-bg-s h-4 w-4" />
      <p>{content}</p>
    </div>
  );
};

export default Warning;
