import Link from "next/link";
import React from "react";
import { GroupBoard } from "../../../core/PTT";
import { Card, CardContent } from "../../@/components/ui/card";
import { cn } from "../../@/lib/utils";

type Props = {
  forum: GroupBoard;
  onClick?: () => void;
};

const GroupBoardCard = ({ forum, onClick }: Props) => {
  return (
    <Link
      href={
        forum.boardType === "group"
          ? forum.boardHref
          : `/forum/${forum.boardHref}`
      }
    >
      <Card className="rounded-none">
        <CardContent
          className={cn("bg-primary", "flex flex-col justify-between", "p-2")}
        >
          <div className="flex justify-between">
            <div className="flex">
              <h3>
                {forum.boardClass === "一一" ? "" : forum.boardClass + "・"}
                {forum.boardName}
              </h3>
            </div>
            <div></div>
          </div>
          <div className="text-text2 text-sm">{forum.boardTitle}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GroupBoardCard;
