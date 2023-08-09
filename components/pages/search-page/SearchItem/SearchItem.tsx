import React from "react";
import { cn } from "../../../@/lib/utils";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  value: string;
  onClick?: () => void;
};

const SearchItem = (props: Props) => {
  return (
    <div className={cn("cursor-pointer")} onClick={props.onClick}>
      <div className="flex justify-between">
        <h4
          className={cn(
            "text-lg",
            "p-3 pb-2 pl-2.5",
            "flex gap-3.5 items-center"
          )}
        >
          <div className="bg-secondary p-2 rounded-full">
            <AiOutlineSearch />
          </div>
          <div>{props.value}</div>
        </h4>
      </div>
    </div>
  );
};

export default SearchItem;
