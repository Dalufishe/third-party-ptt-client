import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/forum/hot");
  }, []);

  return <></>;
};

export default IndexPage;
