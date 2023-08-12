// static import
import React, { ReactNode, useCallback } from "react";
import { cn } from "../../@/lib/utils";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Post } from "../../../core/PTT";
import Link from "next/link";

// dynamic import
const DropdownMenu = dynamic(
  () =>
    import("../../@/components/ui/dropdown-menu").then((m) => m.DropdownMenu),
  { ssr: false }
);
const DropdownMenuContent = dynamic(
  () =>
    import("../../@/components/ui/dropdown-menu").then(
      (m) => m.DropdownMenuContent
    ),
  { ssr: false }
);
const DropdownMenuItem = dynamic(
  () =>
    import("../../@/components/ui/dropdown-menu").then(
      (m) => m.DropdownMenuItem
    ),
  { ssr: false }
);
const DropdownMenuTrigger = dynamic(
  () =>
    import("../../@/components/ui/dropdown-menu").then(
      (m) => m.DropdownMenuTrigger
    ),
  { ssr: false }
);

type Props = {
  children: ReactNode;
  post: Post;
};

const Navbar = (props: Props) => {
  const router = useRouter();

  const post = props.post;

  const handleLeft = useCallback(() => {
    router.back();
  }, []);

  const handleCopyLink = useCallback(() => {
    const board = navigator.clipboard;
    board
      .writeText(window.location.href)
      .then(() => {})
      .catch(() => {
        alert("複製失敗");
      });
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ url: window.location.href });
    } else {
      alert("您的瀏覽器不支援分享模式");
    }
  }, []);

  return (
    <div
      className={cn(
        "h-[48px] bg-brand",
        "flex justify-between items-center",
        "px-4"
      )}
    >
      <div onClick={handleLeft}>
        <AiOutlineArrowLeft className={cn("w-5 h-5")} />
      </div>
      <div>
        <h2
          className={cn(
            "text-sm text-text3 whitespace-nowrap text-center text-ellipsis overflow-hidden",
            "w-52"
          )}
        >
          {props.children}
        </h2>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <FiMoreVertical className={cn("w-5 h-5")} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-secondary rounded-t-sm">
          <Link href={post.originUrl} target="_blank">
            <DropdownMenuItem className="text-base">原版網址</DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="text-base" onClick={handleCopyLink}>
            複製連結
          </DropdownMenuItem>
          <DropdownMenuItem className="text-base" onClick={handleShare}>
            分享
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
