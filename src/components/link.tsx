import { Link } from "react-router-dom";

interface LinkProps {
  to: string;
  content: string;
  labelContent: string;
}

const LinkComponent = ({ to, content, labelContent }: LinkProps) => {
  return (
    <span className="text-content-body mt-10 text-right text-sm text-nowrap">
      {content}{" "}
      <Link
        to={to}
        className="text-accent-brand hover:border-accent-brand border-b border-transparent transition duration-300 ease-in-out"
      >
        {labelContent}
      </Link>
    </span>
  );
};

export default LinkComponent;
