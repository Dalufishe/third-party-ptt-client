import React from "react";
import { cn } from "../../../utils/cn";
import { css } from "@emotion/css";

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
      <li className="w-full">1</li>
      <li className="w-full">2</li>
      <li className="w-full">3</li>
      <li className="w-full">4</li>
    </ul>
  );
};

export default Tabbar;
