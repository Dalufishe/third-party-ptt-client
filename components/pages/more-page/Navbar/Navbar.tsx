import React, { ReactNode } from "react";
import { cn } from "../../../@/lib/utils";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { children } from "cheerio/lib/api/traversing";

type Props = {
  children: ReactNode;
};

const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "h-[48px]",
        "dark:bg-secondary",
        "flex items-center gap-2",
        "px-4"
      )}
    >
      {/* Left */}
      <div
        onClick={() => {
          router.back();
        }}
      >
        <AiOutlineArrowLeft className={cn("w-5 h-5")} />
      </div>
      <div className="text-lg pl-2">{props.children}</div>
    </div>
  );
};

export default Navbar;
