import React from "react";
import { cn } from "../../../utils/cn";
import { AiFillAppstore, AiFillSetting } from "react-icons/ai";

const tabs = [
  { id: 1, icon: <AiFillAppstore /> },
  { id: 2, icon: <AiFillAppstore /> },
  { id: 3, icon: <AiFillAppstore /> },
  { id: 4, icon: <AiFillSetting /> },
];

const Tabbar = () => {
  return (
    <ul
      className={cn(
        "fixed bottom-0",
        "w-full h-[48px]",
        "bg-secondary",
        "flex items-center justify-between",
        "p-2"
      )}
    >
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className={cn(
            "w-full",
            "flex justify-center items-center",
            "text-2xl text-text2"
          )}
        >
          {tab.icon}
        </li>
      ))}
    </ul>
  );
};

export default Tabbar;
