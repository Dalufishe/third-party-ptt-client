import React, { useState } from "react";
import { BsFire } from "react-icons/bs";
import { cn } from "../../@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
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
