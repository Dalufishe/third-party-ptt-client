import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PTT, { Board, BoardItem, BoardMan } from "../../../core/PTT";
import { Card, CardContent } from "../../../components/@/components/ui/card";
import Link from "next/link";
import { cn } from "../../../utils/cn";
import Need18Up from "../../../components/layout/Need18Up/Need18Up";
import {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import use18 from "../../../hooks/use18";
import Head from "next/head";
import useScroll from "../../../hooks/useScroll";
import getSiteURL from "../../../utils/getSiteURL";
import { wrapper } from "../../../redux/store";
import PostSearch from "../../../components/pages/board-page/PostSearch/PostSearch";
import { NextPageWithLayout } from "../../../components/layout/NextPageWithLayout";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import Navbar from "../../../components/pages/board-page/Navbar/Navbar";
import Sorter, {
  CurrentSortData,
} from "../../../components/pages/board-page/Sorter/Sorter";
import useScrollMemo from "../../../hooks/useScrollMemo";
import { useDispatch, useSelector } from "react-redux";
import set_scroll_position from "../../../redux/actions/set_scroll_position";
import set_board_data_from_redux from "../../../redux/actions/set_board_data";
import BoardMenu from "../../../components/pages/board-page/BoardMenu/BoardMenu";
import PTR from "../../../components/global/PTR/PTR";

type Props = {
  board: Board;
  boardMan: BoardMan;
};

const Page: NextPageWithLayout<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 18
  const [need18, handleIs18, handleIsNot18] = use18(props.board.need18up);

  //* 看板資料

  const [board_data, set_board_data] = useState<any>();
  const board_data_from_redux = useSelector(
    (state: any) => state.board_data?.[props.board.boardName]
  );

  // 進入頁面時
  useEffect(() => {
    // 若 redux 中沒有資料
    if (typeof board_data_from_redux === "undefined") {
      // 使用後端資料
      set_board_data(props.board.data);
      // 設置 redux
      dispatch(
        set_board_data_from_redux(props.board.boardName, props.board.data)
      );
    } else {
      // 使用 redux 資料
      set_board_data(board_data_from_redux);
    }
  }, []);

  // 數據段 (用於無限加載 & 重整定位)
  const [currentId, setCurrentId] = useState(props.board.currentId);

  //* 文章搜尋

  const [keyword, setKeyword] = useState("");

  const handlePostSearchSubmit = useCallback(
    async (data: any) => {
      setKeyword(data.keyword);
      setCurrentId("1");
      setFetchNextDataMode("search");
      const url = `/api/searchPosts/?boardName=${
        props.board.boardName
      }&keyword=${data.keyword}&page=${1}`;
      const res = await fetch(url);
      const json = await res.json();
      set_board_data(json.data);
    },
    [props.board.boardName]
  );

  //* 無限加載

  // 滾動模式
  type fetchNextDataType = "general" | "search";

  // 預設: 一般模式
  const [fetchNextDataMode, setFetchNextDataMode] =
    useState<fetchNextDataType>("general");

  const fetchNextData = useCallback(
    async (type: fetchNextDataType) => {
      let url = "";
      // 一般模式下
      if (type === "general") {
        const nextId = Number(currentId) - 1;
        url = `/api/getBoard?name=${props.board.boardName}&id=${nextId}`;
        setCurrentId(String(nextId));
      }
      // 查詢模式下
      else if (type === "search") {
        const nextId = Number(currentId) + 1;
        url = `/api/searchPosts/?boardName=${props.board.boardName}&keyword=${keyword}&page=${nextId}`;
        setCurrentId(String(nextId));
      }
      // 獲取資料
      const res = await fetch(url);
      const json = await res.json();

      // 設置資料
      set_board_data([...board_data, ...json?.data]);
      dispatch(
        set_board_data_from_redux(props.board.boardName, [
          ...board_data,
          ...json?.data,
        ])
      );
    },
    [currentId, board_data, router.query.id, keyword]
  );

  //* 特殊情況下的初始資料補全

  useEffect(() => {
    if (board_data?.length != 0 && board_data?.length < 20) {
      fetchNextData(fetchNextDataMode);
    }
  }, [board_data?.length, fetchNextDataMode]);

  const restartPage = useCallback(() => {
    setCurrentId(String(Number(props.board.currentId) + 2));
    setFetchNextDataMode("general");
    set_board_data(["PLACE_HOLDER"]);
  }, []);

  //* 過濾篩選器
  const sortData = useMemo(
    () => [
      { name: "類型", data: ["不限", "公告", "Re:"] },
      { name: "排序依據", data: ["關聯性", "最新", "最舊"] },
      { name: "發文時間", data: ["不限時間", "今天", "一周內"] },
    ],
    []
  );

  const [defaultSortData, setDefaultSortData] = useState<CurrentSortData>(
    sortData.map((item) => {
      return { name: item.name, data: item.data[0] };
    })
  );

  const handleSortConfirm = useCallback((data: CurrentSortData) => {
    setDefaultSortData(data);
    for (let d of data) {
      if (d.name === "類型") {
        if (d.data === "不限") {
          restartPage();
        } else if (d.data === "Re:") {
          handlePostSearchSubmit({ keyword: d.data });
        } else {
          handlePostSearchSubmit({ keyword: "[" + d.data + "]" });
        }
      }
    }
  }, []);

  //* 滾動效果 (記憶, 選單隱藏)

  // element
  const pageRef = useRef(null);
  const [pageEl, setPageEl] = useState<any>(pageRef.current);
  const [isTabListHidden, setTabListHiddden] = useState(false);

  useEffect(() => {
    setPageEl(pageRef.current);
  }, []);

  // tabs behavior
  useScroll(
    pageEl,
    () => {
      setTabListHiddden(true);
    },
    () => {
      setTabListHiddden(false);
    }
  );

  // scroll position
  const scroll_position = useSelector(
    (state: any) => state?.scroll_position?.queue
  );

  useLayoutEffect(() => {
    const scrollMemo = scroll_position[1];

    if (scrollMemo && pageEl) {
      pageEl.scrollTo({ top: scrollMemo });
      dispatch(set_scroll_position([scroll_position[0]]));
    }
  }, [pageEl]);

  const scrollTop = useScrollMemo(pageEl);

  //* 前往下一頁 (文章)

  const handleNextPage = useCallback(() => {
    dispatch(set_scroll_position([...scroll_position, scrollTop]));
  }, [scrollTop, board_data]);

  const handleLink = useCallback((post: BoardItem) => {
    if (post.href === "") {
      return `/forum/page-delete`;
    }
    return `/forum/${post.href}`;
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
      {/* replaced Navbar */}
      <Navbar
        onClickLeft={() => {
          router.push("/forum");
        }}
        right={
          <BoardMenu
            boardMan={props.boardMan}
            boardName={props.board.boardName}
          />
        }
      >
        {props.board.boardName}
      </Navbar>
      {/* Main Content */}
      {need18 ? (
        <Need18Up onIs18Click={handleIs18} onIsNot18Click={handleIsNot18} />
      ) : (
        <div
          ref={pageRef}
          id="react-infinite-scroll-component"
          className={cn(
            "w-screen h-[calc(100vh-96px)] overflow-y-scroll",
            "relative"
          )}
        >
          {/* Searchbar */}
          <div
            className={cn(
              "sticky",
              isTabListHidden ? "top-[-48px]" : "top-[-1px]",
              "transition-all",
              "z-50"
            )}
          >
            <PostSearch
              placeholder={`在 ${props.board.boardName} 版搜尋文章...`}
              onSubmit={handlePostSearchSubmit}
              right={
                <Sorter
                  sortData={sortData}
                  defaultSortData={defaultSortData}
                  onConfirm={handleSortConfirm}
                />
              }
            />
          </div>
          {/* Posts */}
          <InfiniteScroll
            scrollableTarget="react-infinite-scroll-component"
            dataLength={board_data?.length || 0}
            next={() => {
              fetchNextData(fetchNextDataMode);
            }}
            hasMore={true}
            loader={<div></div>}
          >
            <PTR>
              {board_data?.map((post: any) => (
                <Link
                  key={post.id}
                  href={handleLink(post)}
                  onClick={handleNextPage}
                >
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
            </PTR>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
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
    const boardMan = await PTT.getBoardMan(forumId);

    return {
      props: {
        board,
        boardMan,
      },
      revalidate: 3,
    };
  }
);

export default Page;
