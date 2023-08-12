import React, { ReactNode } from "react";
import { cn } from "../../../@/lib/utils";
import { Card } from "../../../@/components/ui/card";
import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";

type Props = {
  children: ReactNode;
  icon: any;
  hasNext?: boolean;
  href: string;
};

const MoreItem = ({ children, icon, hasNext = true, href }: Props) => {
  return (
    <Link href={href}>
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
    </Link>
  );
};

export default MoreItem;
