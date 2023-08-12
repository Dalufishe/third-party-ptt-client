import React, { ReactNode, useCallback } from "react";
import { cn } from "../../@/lib/utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <FiMoreVertical className={cn("w-5 h-5")} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-secondary rounded-t-sm">
          <DropdownMenuItem className="text-base">原版網址</DropdownMenuItem>
          <DropdownMenuItem className="text-base">複製連結</DropdownMenuItem>
          <DropdownMenuItem className="text-base">分享</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
