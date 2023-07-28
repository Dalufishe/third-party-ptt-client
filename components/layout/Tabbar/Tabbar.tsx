import React from "react";
import { cn } from "../../../utils/cn";
import { AiFillAppstore, AiFillSetting } from "react-icons/ai";

const tabs = [
  <AiFillAppstore />,
  <AiFillAppstore />,
  <AiFillAppstore />,
  <AiFillSetting />,
];

const Tabbar = () => {
  return (
    <ul
      className={cn(
        "absolute bottom-0",
        "w-full h-[48px]",
        "bg-secondary",
        "flex items-center justify-between",
        "p-2"
      )}
    >
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={cn(
            "w-full",
            "flex justify-center items-center",
            "text-2xl text-text2"
          )}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default Tabbar;
