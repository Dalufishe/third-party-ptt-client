import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import PTT, { Post } from "../../../../core/PTT";
import { cn } from "../../../../components/@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/@/components/ui/card";
import { NextPageWithLayout } from "../../../../components/layout/NextPageWithLayout";
import DefaultLayout from "../../../../components/layout/DefaultLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { useCallback, useLayoutEffect, useState } from "react";
import Need18Up from "../../../../components/layout/Need18Up/Need18Up";
import use18 from "../../../../hooks/use18";
import Head from "next/head";
import Navbar from "../../../../components/pages/post-page/Navbar";

type Props = {
  post: Post;
};

const Page: NextPageWithLayout<Props> = (props: Props) => {
  const router = useRouter();
  // 18
  const [need18, handleIs18, handleIsNot18] = use18(props.post.need18up);

  return need18 ? (
    <Need18Up onIs18Click={handleIs18} onIsNot18Click={handleIsNot18} />
  ) : (
    <>
      <Head>
        <title>{props.post.title} - 我の批踢踢</title>
        <meta
          property="og:title"
          content={props.post.title + " - 我の批踢踢"}
        />
      </Head>
      {/* replaced Navbar */}
      <Navbar
        onClickLeft={() => {
          router.push("/forum/" + props.post.board);
        }}
      >
        {props.post.title}
      </Navbar>
      {/* Main Content */}
      <div className="w-screen h-[calc(100vh-96px)]  overflow-y-scroll">
        <Card className={cn("p-3", "rounded-none")}>
          <CardHeader className="p-0 gap-1">
            <CardDescription className="text-text2">
              @{props.post.author}
            </CardDescription>
            <CardTitle className="text-xl">{props.post.title}</CardTitle>
            <div className="flex justify-between">
              <CardDescription className="text-text2">
                {props.post.board}
              </CardDescription>
              <CardDescription className={cn("text-text2 ", "flex gap-2")}>
                <span>{new Date(props.post.time).toLocaleString()}</span>
                <span>{props.post.edited ? "(已編輯)" : ""}</span>
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card className={cn("p-3", "rounded-none")}>
          <CardContent
            className={cn(
              "overflow-hidden",
              "p-0",
              "whitespace-pre-wrap break-words",
              "text-text3"
            )}
          >
            {props.post.article}
          </CardContent>
        </Card>
        <Card className={cn("p-3", "rounded-none")}>
          <CardContent
            className={cn(
              "p-0",
              "flex justify-between items-center gap-0.5",
              "text-sm text-text3"
            )}
          >
            <div>發送: {props.post.fromIp}</div>
            <div>來自: {props.post.fromCountry}</div>
          </CardContent>
        </Card>
        <Card className={cn("p-2", "rounded-none", "border-b-0")}>
          <CardContent className={cn("p-0")}>
            {props.post.comments.map((c) => (
              <Card
                key={c.id}
                className={cn(
                  "p-0",
                  "rounded-none",
                  "border-x-0 border-t-0",
                  "text-sm"
                )}
              >
                <div className={cn("px-1 py-3")}>
                  <div className="flex gap-3">
                    <h5
                      className={cn(
                        "text-base",
                        c.tag === "推" ? "text-text1" : "",
                        c.tag === "噓" ? "text-red-400" : "",
                        c.tag === "→" ? "text-red-400" : ""
                      )}
                    >
                      {c.tag}
                    </h5>
                    <h5 className="text-text3 whitespace-nowrap">{c.user}:</h5>
                    <h5 className="text-text3">{c.content}</h5>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const hotBoards = await PTT.getHotBoards();
  const paths: string[] = [];
  await Promise.all(
    hotBoards.map(async (b) => {
      let path = "";
      const board = await PTT.getBoard(b.boardName);
      board.data.map((boardItem) => {
        if (boardItem.href) {
          path = "/forum/" + boardItem.href;
          paths.push(path);
        }
      });
    })
  );
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = ctx.params;
  const page = params?.id + "/" + params?.postId;
  const post = await PTT.getPost(page);

  return {
    props: { post },
  };
};

export default Page;
