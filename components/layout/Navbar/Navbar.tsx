import React from "react";
import { cn } from "../../../utils/cn";

const Navbar = () => {
  return (
    <div className={cn("h-[48px]", "bg-[#0c0a66]", "flex items-center", "p-2")}>
      <h1 className={cn("text-[#ff6] text-xl")}>批踢踢實業坊</h1>
    </div>
  );
};

export default Navbar;
