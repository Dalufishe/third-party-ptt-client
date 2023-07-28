import React from "react";
import { cn } from "../../../utils/cn";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      className={cn(
        "h-[48px]",
        "bg-[#0c0a66]",
        "flex items-center justify-between",
        "p-3"
      )}
    >
      <Link href="/">
        <h1 className={cn("text-[#ff6] text-xl font-bold")}>批踢踢</h1>
      </Link>
      <div className={cn("text-2xl")}>
        <AiOutlineSearch />
      </div>
    </div>
  );
};

export default Navbar;
