import type { NextPage } from "next";
import useRedirect from "../hooks/useRedirect";

const IndexPage: NextPage = () => {
  useRedirect("/forum/hot");

  return <></>;
};

export default IndexPage;
