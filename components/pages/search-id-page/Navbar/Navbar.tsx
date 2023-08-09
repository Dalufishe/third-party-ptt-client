import React, { ReactNode } from "react";
import { cn } from "../../../@/lib/utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "dark:bg-secondary",
        "flex items-center gap-4",
        "px-4",
        "h-[48px]"
      )}
    >
      <div className="text-xl">
        <AiOutlineArrowLeft
          className={cn("w-5 h-5")}
          onClick={() => {
            router.back();
          }}
        />
      </div>
      <div className={cn("text-lg")}>{props.children}</div>
    </div>
  );
};

export default Navbar;
