import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { alphabet } from "@/types/alphabet.d";

const AlphabetBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const response = searchParams.get("letterSort");

  const handleClick = (letter: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (letter === response) {
      newParams.delete("letterSort");
    } else {
      newParams.set("letterSort", letter);
    }

    setSearchParams(newParams);
  };

  return (
    <aside className="bg-accent-brand custom-scroll flex w-15 flex-col items-center gap-3 overflow-y-scroll rounded-[20px] py-3">
      {alphabet.map((letter) => (
        <button
          className={twMerge(
            "hover: cursor-pointer text-sm font-bold opacity-40 transition-all duration-300 ease-in-out",
            response === letter && "text-xl opacity-100",
          )}
          onClick={() => handleClick(letter)}
        >
          {letter}
        </button>
      ))}
    </aside>
  );
};

export default AlphabetBar;
