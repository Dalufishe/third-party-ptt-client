import React, { ReactNode, useCallback } from "react";
import { cn } from "../../@/lib/utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

const Navbar = (props: Props) => {
  const router = useRouter();
  const handleLeft = useCallback(() => {
    router.back();
  }, []);
  return (
    <div
      className={cn(
        "h-[48px] bg-brand",
        "flex justify-between items-center",
        "px-4"
      )}
    >
      <div onClick={handleLeft}>
        <AiOutlineArrowLeft className={cn("w-5 h-5")} />
      </div>
      <div>
        <h2
          className={cn(
            "text-sm text-text3 whitespace-nowrap text-center text-ellipsis overflow-hidden",
            "w-52"
          )}
        >
          {props.children}
        </h2>
      </div>
      <div>
        <FiMoreVertical className={cn("w-5 h-5")} />
      </div>
    </div>
  );
};

export default Navbar;
