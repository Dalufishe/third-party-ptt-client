import React from "react";
import { Input } from "../../../@/components/ui/input";
import { cn } from "../../../@/lib/utils";
import { AiOutlineArrowLeft } from "react-icons/ai";

type Props = {
  value: string;
  onChange: any;
  placeholder: string;
};

const Searchbar = (props: Props) => {
  return (
    <div className={cn("dark:bg-secondary", "flex items-center gap-2", "px-4")}>
      <div className="text-xl">
        <AiOutlineArrowLeft />
      </div>
      <Input
        value={props.value}
        onChange={props.onChange}
        type="text"
        placeholder={props.placeholder}
        autoComplete="off"
        className={cn(
          "dark:bg-secondary",
          "text-text3 text-base",
          "h-[48px]",
          "rounded-none",
          "focus-visible:ring-0",
          "focus-visible:ring-offset-0",
          "border-r-0",
          "caret-text1"
        )}
      />
    </div>
  );
};

export default Searchbar;
