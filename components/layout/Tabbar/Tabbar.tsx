import React, { useState } from "react";
import { cn } from "../../../utils/cn";
import {
  AiFillAppstore,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineSearch,
} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

const tabs = [
  { id: 1, icon: <AiOutlineHome />, href: "/forum/hot" },
  { id: 2, icon: <AiOutlineSearch />, href: "/search" },
  { id: 3, icon: <AiOutlineMenu />, href: "/more" },
];

const Tabbar = () => {
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);
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
          key={tab.id}
          href={tab.href}
          onClick={() => {
            setActive(tab.href);
          }}
          className={cn(
            active === tab.href ? "text-text3" : "text-text2",
            "p-2",
            "w-full h-full",
            "flex justify-center items-center",
            "text-2xl"
          )}
        >
          {tab.icon}
        </Link>
      ))}
    </ul>
  );
};

export default Tabbar;
