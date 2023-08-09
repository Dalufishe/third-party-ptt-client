import Link from "next/link";
import React, { useCallback } from "react";
import { GlobalPostItem } from "../../../../core/PTT";
import { Card, CardContent } from "../../../@/components/ui/card";
import { cn } from "../../../@/lib/utils";

type Props = {
  post: GlobalPostItem;
  onClick?: () => void;
};

const SearchPostCard = (props: Props) => {
  const { post } = props;
  const handleLink = useCallback((post: GlobalPostItem) => {
    if (post.id === "") {
      return `/forum/page-delete`;
    }
    return `/forum/${post.id}`;
  }, []);
  return (
    <Link href={handleLink(post)} onClick={props.onClick}>
      <Card className="rounded-none">
        <CardContent
          className={cn(
            "bg-primary",
            "flex flex-col justify-between",
            "p-2 pl-0 pr-6"
          )}
        >
          <div className="flex items-center">
            <div className={cn("w-24", "flex items-center justify-center")}>
              <div>
                <h3>{post.board}</h3>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <h3>{post.title}</h3>
              <div
                className={cn("text-text2 text-sm", "flex justify-between")}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SearchPostCard;
