import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PTT, { Board, BoardItem } from "../../../core/PTT";
import { Card, CardContent } from "../../../components/@/components/ui/card";
import Link from "next/link";
import { cn } from "../../../utils/cn";
import Need18Up from "../../../components/layout/Need18Up/Need18Up";
import { useCallback, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import use18 from "../../../hooks/use18";
import Head from "next/head";
import useScroll from "../../../hooks/useScroll";
import getSiteURL from "../../../utils/getSiteURL";
import { wrapper } from "../../../redux/store";
import PostSearch from "../../../components/pages/board-page/PostSearch";

type Props = {
  board: Board;
};

const Page: NextPage<Props> = (props: Props) => {
  const router = useRouter();

  // 18
  const [need18, handleIs18, handleIsNot18] = use18(props.board.need18up);

  // forum (posts)
  const [forum, setForum] = useState(props.board.data);
  const [currentId, setCurrentId] = useState(props.board.currentId);

  // post search
  const [keyword, setKeyword] = useState("");
  const handlePostSearchSubmit = useCallback(
    async (data: any) => {
      setKeyword(data.keyword);
      setCurrentId("1");
      setFetchNextDataMode("search");
      const res = await fetch(
        `/api/searchPosts/?boardName=${props.board.boardName}&keyword=${
          data.keyword
        }&page=${1}`
      );
      const json = await res.json();
      setForum(json.data);
    },
    [props.board.boardName]
  );

  // infinite scroll
  type fetchNextDataType = "general" | "search";
  const [fetchNextDataMode, setFetchNextDataMode] =
    useState<fetchNextDataType>("general");
  const fetchNextData = useCallback(
    async (type: fetchNextDataType) => {
      let url = "";
      if (type === "general") {
        const nextId = Number(currentId) - 1;
        url = `/api/getBoard?name=${props.board.boardName}&id=${nextId}`;
        setCurrentId(String(nextId));
      } else if (type === "search") {
        const nextId = Number(currentId) + 1;
        url = `/api/searchPosts/?boardName=${props.board.boardName}&keyword=${keyword}&page=${nextId}`;
        setCurrentId(String(nextId));
      }
      const res = await fetch(url);
      const json = await res.json();
      setForum([...forum, ...json?.data]);
    },
    [currentId, forum, router.query.id, keyword]
  );

  useEffect(() => {
    if (forum?.length < 20) {
      fetchNextData(fetchNextDataMode);
    }
  }, [forum?.length, fetchNextDataMode]);

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

  // post
  const handleLink = useCallback((post: BoardItem) => {
    if (typeof window !== "undefined") {
      if (post.href === "") {
        return `/forum/page-delete`;
      }
      return `/forum/${post.href}`;
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
          {/* Searchbar */}
          <div
            className={cn(
              "sticky",
              isTabListHidden ? "top-0" : "top-[-48px]",
              "transition-all"
            )}
          >
            <PostSearch
              placeholder={`在 ${props.board.boardName} 版搜尋文章...`}
              onSubmit={handlePostSearchSubmit}
            />
          </div>
          {/* Posts */}
          <InfiniteScroll
            scrollableTarget="react-infinite-scroll-component"
            dataLength={forum?.length}
            next={() => {
              fetchNextData(fetchNextDataMode);
            }}
            hasMore={true}
            loader={<div></div>}
          >
            {forum?.map((post) => (
              <Link key={post.id} href={handleLink(post)}>
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
                              post.level === 1 ? "text-red-400" : "",
                              post.level === 2 ? "text-green-400" : "",
                              post.level === 3 ? "text-yellow-400" : "",
                              post.level === 4 ? "text-text1" : "",
                              ""
                            )}
                          >
                            {post.rate === -1 ? "爆" : post.rate || ""}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <h3>{post.title}</h3>
                        <div
                          className={cn(
                            "text-text2 text-sm",
                            "flex justify-between"
                          )}
                        >
                          <p>{post.author}</p>
                          <p>{post.date}</p>
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
