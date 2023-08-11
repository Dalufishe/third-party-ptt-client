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
import PostCard from "../../../components/pages/board-page/PostCard/PostCard";
import { AiOutlineSearch } from "react-icons/ai";

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

  const [currentId, setCurrentId] = useState(Number(props.board.currentId));

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

  //* 無限加載

  const fetchNextData = useCallback(async () => {
    let url = "";
    // 一般模式下

    const nextId = currentId - 1;
    url = `/api/getBoard?name=${props.board.boardName}&id=${nextId}`;
    setCurrentId(nextId);

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
  }, [currentId, board_data, router.query.id]);

  //* 特殊情況下的初始資料補全

  useEffect(() => {
    if (board_data?.length != 0 && board_data?.length < 20) {
      fetchNextData();
    }
  }, [board_data?.length]);

  //* 過濾篩選器
  // const restartPage = useCallback(() => {
  //   setCurrentId(Number(props.board.currentId) + 2);
  //   set_board_data(["PLACE_HOLDER"]);
  // }, []);

  // const sortData = useMemo(
  //   () => [
  //     { name: "類型", data: ["不限", "公告", "Re:"] },
  //     { name: "排序依據", data: ["關聯性", "最新", "最舊"] },
  //     { name: "發文時間", data: ["不限時間", "今天", "一周內"] },
  //   ],
  //   []
  // );

  // const [defaultSortData, setDefaultSortData] = useState<CurrentSortData>(
  //   sortData.map((item) => {
  //     return { name: item.name, data: item.data[0] };
  //   })
  // );

  // const handleSortConfirm = useCallback((data: CurrentSortData) => {
  //   setDefaultSortData(data);
  //   for (let d of data) {
  //     if (d.name === "類型") {
  //       if (d.data === "不限") {
  //         restartPage();
  //       } else if (d.data === "Re:") {
  //         handlePostSearchSubmit({ keyword: d.data });
  //       } else {
  //         handlePostSearchSubmit({ keyword: "[" + d.data + "]" });
  //       }
  //     }
  //   }
  // }, []);

  //* 滾動效果 (記憶, 選單隱藏)

  // element
  const pageRef = useRef(null);
  const [pageEl, setPageEl] = useState<any>(pageRef.current);

  useEffect(() => {
    setPageEl(pageRef.current);
  }, []);

  const [isTabListHidden, setTabListHiddden] = useState(false);

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
        onRightClick={() => {
          router.push(`/forum/${props.board.boardName}/search`);
        }}
      >
        <span
          onClick={() => {
            pageEl?.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {props.board.boardName}
        </span>
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
          ></div>
          {/* Posts */}
          <InfiniteScroll
            scrollableTarget="react-infinite-scroll-component"
            dataLength={board_data?.length || 0}
            next={() => {
              fetchNextData();
            }}
            hasMore={true}
            loader={<div></div>}
          >
            <PTR>
              {board_data?.map((post: BoardItem) => (
                <PostCard key={post.id} post={post} onClick={handleNextPage} />
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
    fallback: "blocking",
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
