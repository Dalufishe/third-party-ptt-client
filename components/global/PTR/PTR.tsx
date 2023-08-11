import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import Loading from "../Loading/Loading";

const PTR = (props: { children: ReactElement }) => {
  const router = useRouter();

  const handleScrollRefresh = async () => {
    router.reload();
  };

  return (
    <PullToRefresh pullingContent={<></>} onRefresh={handleScrollRefresh} refreshingContent={<Loading/>}>
      {props.children}
    </PullToRefresh>
  );
};

export default PTR;
