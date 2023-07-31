import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PTT, { Board, BoardItem } from "../../../core/PTT";
import { Card, CardContent } from "../../../components/@/components/ui/card";
import Link from "next/link";
import { cn } from "../../../utils/cn";
import { Input } from "../../../components/@/components/ui/input";
import Need18Up from "../../../components/layout/Need18Up/Need18Up";
import {
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import use18 from "../../../hooks/use18";
import Head from "next/head";
import useScroll from "../../../hooks/useScroll";
import getSiteURL from "../../../utils/getSiteURL";
import { wrapper } from "../../../redux/store";

type Props = {
  board: Board;
};

const Page: NextPage<Props> = (props: Props) => {
  const router = useRouter();

  // forums

  const [forum, setForum] = useState(props.board.data);
  const [currentId, setCurrentId] = useState(props.board.currentId);

  const fetchNextData = useCallback(async () => {
    const res = await fetch(
      `/api/getBoard?name=${router.query.id}&id=${Number(currentId) - 1}`
    );
    const json = await res.json();
    setForum([...forum, ...json?.data]);
    setCurrentId(String(Number(currentId) - 1));
  }, [currentId, forum, router.query.id]);

  useEffect(() => {
    if (forum?.length < 20) {
      fetchNextData();
    }
  }, [fetchNextData, forum?.length]);

  // 18
  const [need18, handleIs18, handleIsNot18] = use18(props.board.need18up);

  // scroll
  const pageRef = useRef(null);
  const [pageEl, setPageEl] = useState(pageRef.current);
  const [isTabListHidden, setTabListHiddden] = useState(false);

  useEffect(() => {
    setPageEl(pageRef.current);
  }, []);

  useScroll(
    pageEl,
    () => {
      setTabListHiddden(false);
    },
    () => {
      setTabListHiddden(true);
    }
  );

  // fn
  const handleLink = useCallback((forumItem: BoardItem) => {
    if (typeof window !== "undefined") {
      if (forumItem.href === "") {
        return `/forum/page-delete`;
      }
      return `/forum/${forumItem.href}`;
    }
    return "";
  }, []);

  return (
    <>
      <Head>
        <title>{props.board.boardName} - 我の批踢踢</title>
        <meta
          property="og:title"
          content={props.board.boardName + " - 我の批踢踢"}
          key="title"
        />
        <meta
          property="og:url"
          content={`${getSiteURL()}/forum/${props.board.boardName}`}
          key="url"
        />
      </Head>
      {need18 ? (
        <Need18Up onIs18Click={handleIs18} onIsNot18Click={handleIsNot18} />
      ) : (
        <div
          ref={pageRef}
          id="react-infinite-scroll-component"
          className={cn("w-screen h-[calc(100vh-96px)] overflow-y-scroll")}
        >
          <Input
            type="text"
            placeholder={`在 ${props.board.boardName} 版搜尋文章...`}
            className={cn(
              "h-[48px]",
              "rounded-none",
              "sticky",
              isTabListHidden ? "top-0" : "top-[-48px]",
              "transition-all"
            )}
          />

          <InfiniteScroll
            scrollableTarget="react-infinite-scroll-component"
            dataLength={forum?.length}
            next={fetchNextData}
            hasMore={true}
            loader={<div></div>}
          >
            {forum?.map((forumItem) => (
              <Link key={forumItem.id} href={handleLink(forumItem)}>
                <Card className="rounded-none">
                  <CardContent
                    className={cn(
                      "bg-primary",
                      "flex flex-col justify-between",
                      "p-2 pl-0 pr-6"
                    )}
                  >
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-10",
                          "flex items-center justify-center"
                        )}
                      >
                        <div>
                          <h3
                            className={cn(
                              forumItem.level === 1 ? "text-red-400" : "",
                              forumItem.level === 2 ? "text-green-400" : "",
                              forumItem.level === 3 ? "text-yellow-400" : "",
                              forumItem.level === 4 ? "text-text1" : "",
                              ""
                            )}
                          >
                            {forumItem.rate === -1
                              ? "爆"
                              : forumItem.rate || ""}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <h3>{forumItem.title}</h3>
                        <div
                          className={cn(
                            "text-text2 text-sm",
                            "flex justify-between"
                          )}
                        >
                          <p>{forumItem.author}</p>
                          <p>{forumItem.date}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const hotBoards = await PTT.getHotBoards();
  const paths = hotBoards.map((board) => "/forum/" + board.boardHref);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  () => async (context) => {
    const forumId = context.params?.id as string;
    const board = await PTT.getBoard(forumId);

    return {
      props: {
        board,
      },
      revalidate: 3,
    };
  }
);

export default Page;
