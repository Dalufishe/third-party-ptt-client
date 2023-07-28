import React, { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import Tabbar from "./Tabbar/Tabbar";

type Props = {
  children: ReactNode;
};

const DefaultLayout = (props: Props) => {
  return (
    <div>
      <Navbar />
      {props.children}
      <Tabbar />
    </div>
  );
};

export default DefaultLayout;
