import React, { ReactNode } from "react";
import { cn } from "../../@/lib/utils";
import { Card } from "../../@/components/ui/card";
import { AiOutlineRight } from "react-icons/ai";

type Props = {
  children: ReactNode;
  icon: any;
  hasNext?: boolean;
};

const MoreItem = ({ children, icon, hasNext = true }: Props) => {
  return (
    <Card
      className={cn(
        "border-0",
        "text-text-3",
        "p-4",
        "flex items-center justify-between"
      )}
    >
      <div className={"flex items-center gap-3"}>
        <div className="text-lg">{icon}</div>
        <h2>{children}</h2>
      </div>
      {hasNext && <AiOutlineRight />}
    </Card>
  );
};

export default MoreItem;
