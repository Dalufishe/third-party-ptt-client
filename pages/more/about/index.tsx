import DefaultLayout from "../../../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../../../components/layout/NextPageWithLayout";
import Navbar from "../../../components/pages/more-page/Navbar/Navbar";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { GetStaticProps } from "next";
import { readFile } from "fs/promises";
import path from "path";
import MdxRenderer from "../../../components/pages/more-page/MdxRenderer/MdxRenderer";

type Props = {
  mdxSource: MDXRemoteSerializeResult;
};

const Page: NextPageWithLayout<Props> = (props: Props) => {
  return (
    <div>
      <Navbar>關於</Navbar>
      <MdxRenderer mdxSource={props.mdxSource} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const source = await readFile(
    path.join(process.cwd(), "/blog/about-the-app/關於.mdx")
  );
  const mdxSource = await serialize(source);

  return {
    props: {
      mdxSource,
    },
  };
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export default Page;
