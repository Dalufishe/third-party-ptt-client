import { NextPage } from "next";
import useRedirect from "../../hooks/useRedirect";

const Page: NextPage = () => {
  useRedirect("/forum/hot");

  return <></>;
};

export default Page;
