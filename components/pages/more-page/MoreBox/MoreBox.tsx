import React, { ReactNode } from "react";
import { Card } from "../../../@/components/ui/card";
import { cn } from "../../../@/lib/utils";

type Props = {
  title: string;
  children: ReactNode;
};

const MoreBox = (props: Props) => {
  return (
    <div>
      <h2 className={cn("text-sm text-text2", "p-3 pb-1.5 pt-4")}>{props.title}</h2>
      <Card>{props.children}</Card>
    </div>
  );
};

export default MoreBox;
