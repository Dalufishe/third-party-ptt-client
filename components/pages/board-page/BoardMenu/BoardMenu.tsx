import React, { useState } from "react";
import { BsFire } from "react-icons/bs";
import { cn } from "../../../@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../@/components/ui/sheet";
import { BoardMan } from "../../../../core/PTT";

type Props = {
  boardName: string;
  boardMan: BoardMan;
};

const BoardMenu = (props: Props) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className={cn("text-2xl")}>
            <BsFire />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>關於 {props.boardName}</SheetTitle>
            <SheetDescription>
              這裡記載著 {props.boardName} 看版的所有信息
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BoardMenu;
