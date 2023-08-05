import React, { ReactNode } from "react";
import { cn } from "../../../@/lib/utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";

type Props = {
  onClickLeft: () => any;
  children: ReactNode;
  right: ReactNode;
};

const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "h-[48px] bg-brand",
        "flex justify-between items-center",
        "px-4"
      )}
    >
      <div onClick={props.onClickLeft}>
        <AiOutlineArrowLeft className={cn("w-5 h-5")} />
      </div>
      <div>
        <h2
          className={cn(
            "text-lg text-text1 font-bold whitespace-nowrap text-center text-ellipsis overflow-hidden",
            "w-52"
          )}
        >
          {props.children}
        </h2>
      </div>
      <div className={cn("w-5 h-5")}>{props.right}</div>
    </div>
  );
};

export default Navbar;
