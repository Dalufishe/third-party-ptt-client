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
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import useScrollMemo from "../../../hooks/useScrollMemo";
import Head from "next/head";
import IsBottom from "../../../components/layout/IsBottom/IsBottom";
import getSiteURL from "../../../utils/getSiteURL";
import { wrapper } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import set_scroll_position from "../../../redux/actions/set_scroll_position";
import set_hot_board_from_redux from "../../../redux/actions/set_hot_board";
import PTR from "../../../components/global/PTR/PTR";
import HotBoardCard from "../../../components/pages/hot-board-page/HotBoardCard";

const forumsType = [
  { name: "熱門看板", href: "/forum/hot" },
  { name: "分類看板", href: "/forum/group/1" },
];

type Props = {
  forums: HotBoard[];
};

const Page: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //* hot_board

  const [hot_board, set_hot_board] = useState<HotBoard[]>([]);
  const hot_board_from_redux = useSelector((state: any) => state.hot_board);

  useEffect(() => {
    if (hot_board_from_redux.length === 0) {
      set_hot_board(props.forums);
      dispatch(set_hot_board_from_redux(props.forums));
    } else {
      set_hot_board(hot_board_from_redux);
    }
  }, []);

  //* scroll

  const pageRef = useRef(null);
  const [pageEl, setPageEl] = useState<any>(pageRef.current);
  const [isTabListHidden, setTabListHiddden] = useState(true);

  useEffect(() => {
    setPageEl(pageRef.current);
  }, []);

  // tablist scroll hidden

  useScroll(
    pageEl,
    () => {
      setTabListHiddden(true);
    },
    () => {
      setTabListHiddden(false);
    }
  );

  // scroll height memo
  const scroll_position = useSelector(
    (state: any) => state?.scroll_position?.queue
  );
  useLayoutEffect(() => {
    const scrollMemo = scroll_position[0];
    if (scrollMemo && pageEl) {
      pageEl.scrollTo({ top: scrollMemo });
      dispatch(set_scroll_position([]));
    }
  }, [pageEl]);

  const scrollTop = useScrollMemo(pageEl);

  const handleNextPage = useCallback(() => {
    dispatch(set_scroll_position([...scroll_position, scrollTop]));
  }, [scrollTop]);

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
            isTabListHidden ? "top-[-40px]" : "top-[-1px]",
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
              <PTR key={forumType.name}>
                <TabsContent value={forumType.name} className="mt-0">
                  {hot_board.map((forum) => (
                    <HotBoardCard
                      key={forum.id}
                      forum={forum}
                      onClick={handleNextPage}
                    />
                  ))}
                  <IsBottom />
                </TabsContent>
              </PTR>
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
