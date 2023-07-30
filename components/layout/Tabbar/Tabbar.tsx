import React from "react";
import { cn } from "../../../utils/cn";
import { AiFillAppstore, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

const tabs = [
  { id: 1, icon: <AiFillAppstore />, href: "/" },
  { id: 2, icon: <AiFillAppstore />, href: "/" },
  { id: 3, icon: <AiFillAppstore />, href: "/" },
  { id: 4, icon: <AiOutlineMenu />, href: "/more" },
];

const Tabbar = () => {
  return (
    <ul
      className={cn(
        "fixed bottom-0",
        "w-full h-[48px]",
        "bg-secondary",
        "flex items-center justify-between"
      )}
    >
      {tabs.map((tab) => (
        <Link
          href={tab.href}
          key={tab.id}
          className={cn(
            "p-2",
            "w-full h-full",
            "flex justify-center items-center",
            "text-2xl text-text2"
          )}
        >
          {tab.icon}
        </Link>
      ))}
    </ul>
  );
};

export default Tabbar;
