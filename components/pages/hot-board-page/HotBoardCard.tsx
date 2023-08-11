import React from "react";
import { HotBoard } from "../../../core/PTT";
import Link from "next/link";
import { Card, CardContent } from "../../@/components/ui/card";
import { cn } from "../../@/lib/utils";

type Props = {
  forum: HotBoard;
  onClick?: () => void;
};

const HotBoardCard = ({ forum, onClick }: Props) => {
  return (
    <Link href={forum.boardHref} onClick={onClick}>
      <Card className="rounded-none">
        <CardContent
          className={cn("bg-primary", "flex flex-col justify-between", "p-2")}
        >
          <div className="flex justify-between">
            <div className="flex">
              <h3>{forum.boardClass}</h3>・<h3>{forum.boardName}</h3>
            </div>
            <div>
              <h3
                className={cn(
                  forum.boardLevel === 1 ? "text-cyan-400" : "",
                  forum.boardLevel === 2 ? "text-blue-400" : "",
                  forum.boardLevel === 3 ? "text-red-400" : "",
                  forum.boardLevel === 4 ? "text-text1" : "",
                  forum.boardLevel === 5 ? "text-yellow-400" : ""
                )}
              >
                {forum.boardRate}
              </h3>
            </div>
          </div>
          <div className="text-text2 text-sm">{forum.boardTitle}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HotBoardCard;
