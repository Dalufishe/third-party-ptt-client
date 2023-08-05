import { useRouter } from "next/router";
import React, { ReactElement, ReactNode } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

const PTR = (props: { children: ReactElement }) => {
  const router = useRouter();

  const handleScrollRefresh = async () => {
    router.reload();
  };

  return (
    <PullToRefresh pullingContent={<></>} onRefresh={handleScrollRefresh}>
      {props.children}
    </PullToRefresh>
  );
};

export default PTR;
