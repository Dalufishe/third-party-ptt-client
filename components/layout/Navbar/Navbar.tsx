import React from "react";
import { cn } from "../../../utils/cn";
import { BiHappyAlt } from "react-icons/bi";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      className={cn(
        "h-[48px]",
        "bg-brand",
        "flex items-center justify-between",
        "p-3"
      )}
    >
      <Link href="/">
        <h1 className={cn("text-brand2 text-xl font-bold")}>我の批踢踢</h1>
      </Link>
      <div className={cn("text-2xl")}>
        <BiHappyAlt />
      </div>
    </div>
  );
};

export default Navbar;
