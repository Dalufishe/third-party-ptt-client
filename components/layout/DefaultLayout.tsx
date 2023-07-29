import React, { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import Tabbar from "./Tabbar/Tabbar";

type Props = {
  children: ReactNode;
  noNavbar?: boolean;
  noTabbar?: boolean;
};

const DefaultLayout = (props: Props) => {
  return (
    <div>
      {props.noNavbar || <Navbar />}
      {props.children}
      {props.noTabbar || <Tabbar />}
    </div>
  );
};

export default DefaultLayout;
