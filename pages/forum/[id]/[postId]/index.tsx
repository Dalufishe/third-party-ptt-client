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
import { useRouter } from "next/router";
import Need18Up from "../../../../components/layout/Need18Up/Need18Up";
import use18 from "../../../../hooks/use18";
import Head from "next/head";
import Navbar from "../../../../components/pages/post-page/Navbar";
import Image from "next/image";
import IsBottom from "../../../../components/layout/IsBottom/IsBottom";
import getSiteURL from "../../../../utils/getSiteURL";
import { wrapper } from "../../../../redux/store";
import PTR from "../../../../components/global/PTR/PTR";
import { useCallback, useEffect, useRef, useState } from "react";

const convertImage = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:hderef="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="infinite"  />
  </svg>`;

const toBase64 = (str: any) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

type Props = {
  post: Post;
};

const Page: NextPageWithLayout<Props> = (props: Props) => {
  const router = useRouter();

  // 18
  const [need18, handleIs18, handleIsNot18] = use18(props.post?.need18up);

  // image quality
  const [q, setQ] = useState(25);
  useEffect(() => {
    setTimeout(() => {
      setQ(75);
    }, 5000);
  }, []);

  const getArticle = useCallback(() => {
    // image 處理
    const img_article = PTT.imageReplacer(props.post?.article, (img, index) => {
      return (
        <div key={index}>
          {img}
          <Image
            quality={q}
            priority
            src={img}
            referrerPolicy="no-referrer"
            alt={props.post?.title + "的照片"}
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(700, 475)
            )}`}
          />
        </div>
      );
    });

    // url 處理
    const url_article = PTT.urlReplacer(img_article, (url, index) => {
      return (
        <a href={url} target="_blank" className="underline">
          {url}
        </a>
      );
    });

    return url_article;
  }, [props.post.article, props.post.title]);

  const getCommentContent = useCallback((c: string) => {
    // image 處理
    const img_c = PTT.imageReplacer(c, (img, index) => {
      return (
        <div key={index}>
          {img}
          <Image
            className="mt-1"
            quality={q}
            priority
            src={img}
            referrerPolicy="no-referrer"
            alt={""}
            width={250}
            height={250}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(700, 475)
            )}`}
          />
        </div>
      );
    });

    // url 處理
    const url_c = PTT.urlReplacer(img_c, (url, index) => {
      return (
        <a href={url} target="_blank" className="underline">
          {url}
        </a>
      );
    });

    return url_c;
  }, []);

  // page element
  const pageRef = useRef(null);
  const [pageEl, setPageEl] = useState<any>(pageRef.current);
console.log(pageEl)
  useEffect(() => {
    setPageEl(pageRef.current);
  }, []);
  return need18 ? (
    <Need18Up onIs18Click={handleIs18} onIsNot18Click={handleIsNot18} />
  ) : (
    <>
      <Head>
        <title>{props.post?.title} - 我の批踢踢</title>
        <meta
          property="og:title"
          content={props.post?.title + " - 我の批踢踢"}
          key="title"
        />
        <meta
          property="og:description"
          content={props.post?.article.slice(0, 100)}
          key="description"
        />
        <meta
          property="og:url"
          content={`${getSiteURL()}/forum/${props.post?.page}`}
          key="url"
        />
      </Head>
      {/* replaced Navbar */}
      <Navbar
        onClickLeft={() => {
          router.push("/forum/" + props.post?.board);
        }}
      >
        <span
          onClick={() => {
         pageEl?.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          {props.post?.title}
        </span>
      </Navbar>
      {/* Main Content */}
      <PTR>
        <div ref={pageRef} className="w-screen h-[calc(100vh-96px)]  overflow-y-scroll">

            <Card className={cn("p-3", "rounded-none")}>
              <CardHeader className="p-0 gap-1">
                <CardDescription className="text-text2">
                  @{props.post?.author}
                </CardDescription>
                <CardTitle className="text-xl">{props.post?.title}</CardTitle>
                <div className="flex justify-between">
                  <CardDescription className="text-text2">
                    {props.post?.board}
                  </CardDescription>
                  <CardDescription className={cn("text-text2 ", "flex gap-2")}>
                    <span>{new Date(props.post?.time).toLocaleString()}</span>
                    <span>{props.post?.edited ? "(已編輯)" : ""}</span>
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
                {getArticle()}
              </CardContent>
            </Card>
            <Card className={cn("p-3", "rounded-none")}>
              <CardContent
                className={cn(
                  "p-0",
                  "flex justify-between items-center gap-0.5",
                  "text-base text-text2"
                )}
              >
                <div>發送: {props.post?.fromIp}</div>
                <div>來自: {props.post?.fromCountry}</div>
              </CardContent>
            </Card>
            <Card className={cn("p-2", "rounded-none", "border-b-0")}>
              <CardContent className={cn("p-0")}>
                {props.post?.comments.map((c) => (
                  <Card
                    key={c.id}
                    className={cn(
                      "p-0",
                      "rounded-none",
                      "border-x-0 border-t-0",
                      "text-base"
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
                        <h5 className="text-text3 whitespace-nowrap">
                          {c?.user}:
                        </h5>
                        <h5 className="text-text3">
                          {getCommentContent(c?.content)}
                        </h5>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
            <IsBottom />
          </div>

      </PTR>
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

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  () => async (ctx) => {
    const params = ctx.params;
    const page = params?.id + "/" + params?.postId;
    const post = await PTT.getPost(page);
    return {
      props: { post },
      revalidate: 10,
    };
  }
);

export default Page;
