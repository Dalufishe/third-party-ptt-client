import React from "react";
import { cn } from "../../@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../@/components/ui/sheet";
import { AiOutlineMore } from "react-icons/ai";

type Props = {};

const Share = (props: Props) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className={cn("text-2xl")}>
            <AiOutlineMore />
          </div>
        </SheetTrigger>
        <SheetContent side="bottom"></SheetContent>
      </Sheet>
    </div>
  );
};

export default Share;
