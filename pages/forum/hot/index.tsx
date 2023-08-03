import type { GetStaticProps, NextPage } from "next";
import PTT, { HotBoard } from "../../../core/PTT";
import { cn } from "../../../utils/cn";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/@/components/ui/tabs";
import { Card, CardContent } from "../../../components/@/components/ui/card";
import Link from "next/link";
import useScroll from "../../../hooks/useScroll";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useScrollMemo from "../../../hooks/useScrollMemo";
import Head from "next/head";
import IsBottom from "../../../components/layout/IsBottom/IsBottom";
import getSiteURL from "../../../utils/getSiteURL";
import { wrapper } from "../../../redux/store";
import PullToRefresh from "react-simple-pull-to-refresh";

const forumsType = [
  { name: "熱門看板", href: "/forum/hot" },
  { name: "分類看板", href: "/forum/group/1" },
];

type Props = {
  forums: HotBoard[];
};

const Page: NextPage<Props> = (props: Props) => {
  // router
  const router = useRouter();

  //* scroll

  const pageRef = useRef(null);
  const [pageEl, setPageEl] = useState<any>(pageRef.current);
  const [isTabListHidden, setTabListHiddden] = useState(false);

  useEffect(() => {
    setPageEl(pageRef.current);
  }, []);

  // tablist scroll hidden

  useScroll(
    pageEl,
    () => {
      setTabListHiddden(false);
    },
    () => {
      setTabListHiddden(true);
    }
  );

  // srcoll pull refresh
  const handleScrollRefresh = async () => {
    router.reload();
  };

  // scroll height memo
  const scrollTop = useScrollMemo(pageEl);

  return (
    <div
      ref={pageRef}
      id="main-content"
      className={cn("w-screen h-[calc(100vh-96px)] overflow-y-scroll")}
    >
      <Head>
        <title>熱門看板 - 我の批踢踢</title>
        <meta property="og:title" content="熱門看板 - 我の批踢踢" key="title" />
        <meta
          property="og:url"
          content={`${getSiteURL()}/forum/hot`}
          key="url"
        />
      </Head>
      <Tabs
        defaultValue={forumsType[0].name}
        className={cn("w-full", "relative")}
      >
        <TabsList
          className={cn(
            "z-50",
            "w-full rounded-none",
            "sticky",
            isTabListHidden ? "top-0" : "top-[-40px]",
            "transition-all"
          )}
        >
          {forumsType.map((forumType) => (
            <TabsTrigger
              key={forumType.name}
              value={forumType.name}
              className="w-full"
              onClick={() => {
                router.push(forumType.href);
              }}
            >
              {forumType.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {forumsType.map((forumType) => {
          if (forumType.name === "熱門看板") {
            return (
              <PullToRefresh onRefresh={handleScrollRefresh}>
                <TabsContent
                  key={forumType.name}
                  value={forumType.name}
                  className="mt-0"
                >
                  {props.forums.map((forum) => (
                    <Link key={forum.id} href={forum.boardHref}>
                      <Card className="rounded-none">
                        <CardContent
                          className={cn(
                            "bg-primary",
                            "flex flex-col justify-between",
                            "p-2"
                          )}
                        >
                          <div className="flex justify-between">
                            <div className="flex">
                              <h3>{forum.boardClass}</h3>・
                              <h3>{forum.boardName}</h3>
                            </div>
                            <div>
                              <h3
                                className={cn(
                                  forum.boardLevel === 1 ? "text-cyan-400" : "",
                                  forum.boardLevel === 2 ? "text-blue-400" : "",
                                  forum.boardLevel === 3 ? "text-red-400" : "",
                                  forum.boardLevel === 4 ? "text-text1" : "",
                                  forum.boardLevel === 5
                                    ? "text-yellow-400"
                                    : ""
                                )}
                              >
                                {forum.boardRate}
                              </h3>
                            </div>
                          </div>
                          <div className="text-text2 text-sm">
                            {forum.boardTitle}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  <IsBottom />
                </TabsContent>
              </PullToRefresh>
            );
          }
        })}
      </Tabs>
    </div>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  () => async () => {
    const forums = await PTT.getHotBoards();
    return {
      props: {
        forums,
        revalidate: 3,
      },
    };
  }
);

export default Page;
