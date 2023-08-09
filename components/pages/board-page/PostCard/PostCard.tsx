import Link from "next/link";
import React, { useCallback } from "react";
import { Card, CardContent } from "../../../@/components/ui/card";
import { cn } from "../../../@/lib/utils";
import { BoardItem } from "../../../../core/PTT";

type Props = {
  post: BoardItem;
  onClick?: () => void;
};

const PostCard = (props: Props) => {
  const { post } = props;
  const handleLink = useCallback((post: BoardItem) => {
    if (post.href === "") {
      return `/forum/page-delete`;
    }
    return `/forum/${post.href}`;
  }, []);

  return (
    <Link key={post.id} href={handleLink(post)} onClick={props.onClick}>
      <Card className="rounded-none">
        <CardContent
          className={cn(
            "bg-primary",
            "flex flex-col justify-between",
            "p-2 pl-0 pr-6"
          )}
        >
          <div className="flex items-center">
            <div className={cn("w-10", "flex items-center justify-center")}>
              <div>
                <h3
                  className={cn(
                    post.level === 1 ? "text-red-400" : "",
                    post.level === 2 ? "text-green-400" : "",
                    post.level === 3 ? "text-yellow-400" : "",
                    post.level === 4 ? "text-text1" : "",
                    ""
                  )}
                >
                  {post.rate === -1 ? "爆" : post.rate || ""}
                </h3>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <h3>{post.title}</h3>
              <div className={cn("text-text2 text-sm", "flex justify-between")}>
                <p>{post.author}</p>
                <p>{post.date}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
