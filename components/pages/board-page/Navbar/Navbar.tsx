import React, { ReactNode } from "react";
import { cn } from "../../../@/lib/utils";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
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
      {/* Left */}
      <div
        onClick={() => {
          router.back();
          props.onLeftClick && props.onLeftClick();
        }}
      >
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
      {/* Right */}
      <div
        onClick={() => {
          props.onRightClick && props.onRightClick();
        }}
      >
        <AiOutlineSearch className="text-2xl" />
      </div>
    </div>
  );
};

export default Navbar;
