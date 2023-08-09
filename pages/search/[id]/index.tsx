import { useCallback, useEffect, useState } from "react";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../../../components/layout/NextPageWithLayout";
import Navbar from "../../../components/pages/search-id-page/Navbar/Navbar";
import { useRouter } from "next/router";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/@/components/ui/tabs";
import { cn } from "../../../components/@/lib/utils";
import PTR from "../../../components/global/PTR/PTR";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import getSiteURL from "../../../utils/getSiteURL";
import useBoardsNames from "../../../hooks/useBoardsNames";

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const keyword = router.query.id as string | undefined;
  const [currentId, setCurrentId] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);

  // 所有看板名稱
  const boardsNamesPromise = useBoardsNames();

  // 搜尋邏輯
  const handleSearch = useCallback(
    async (id: number = 0) => {
      if (keyword !== undefined) {
        const url = "";
        const res = await fetch(url);
        const searchPosts = await res.json();
        return searchPosts;
      } else {
        return [];
      }
    },
    [keyword]
  );

  // 最初進入頁面
  useEffect(() => {
    if (keyword) {
      handleSearch(currentId).then((data) => {
        setPosts(data);
        setCurrentId(currentId + 1);
      });
    }
  }, [keyword]);

  // 頁面資料不足
  useEffect(() => {
    if (posts?.length != 0 && posts?.length < 20) {
      fetchNextData();
    }
  }, [posts?.length]);

  // 無限滾動
  const fetchNextData = useCallback(() => {
    handleSearch(currentId).then((data) => {
      setPosts([...posts, ...data]);
      setCurrentId(currentId + 1);
    });
  }, [currentId, keyword, posts]);

  return (
    <div>
      <Head>
        <title>「{keyword}」的搜尋結果 - 我の批踢踢</title>
        <meta
          property="og:title"
          content={`「${keyword}」的搜尋結果 - 我の批踢踢`}
          key="title"
        />
        <meta
          property="og:url"
          content={`${getSiteURL()}/search/${keyword}`}
          key="url"
        />
      </Head>
      <Navbar>「{keyword}」的搜尋結果：</Navbar>
      <Tabs defaultValue="文章" className={cn("w-full", "relative")}>
        <TabsList
          className={cn(
            "z-50",
            "w-full rounded-none",
            "sticky",
            "transition-all"
          )}
        >
          <TabsTrigger value="文章" className="w-full">
            文章
          </TabsTrigger>
          <TabsTrigger value="看板" className="w-full">
            看板
          </TabsTrigger>
          <TabsTrigger value="用戶" className="w-full">
            用戶
          </TabsTrigger>
        </TabsList>
        <TabsContent value="文章" className="mt-0">
          {/* <div
            className="h-[calc(100vh-144px)] overflow-scroll"
            id="react-infinite-scroll-component"
          >
            <InfiniteScroll
              scrollableTarget="react-infinite-scroll-component"
              dataLength={posts?.length || 0}
              next={() => {
                fetchNextData();
              }}
              hasMore={true}
              loader={<div></div>}
            >
              <PTR>
                <div>
                  {posts.map((post) => (
                    <></>
                  ))}
                </div>
              </PTR>
            </InfiniteScroll>
          </div> */}
          開發中
        </TabsContent>
        <TabsContent value="看板" className="mt-0">
          開發中
        </TabsContent>
        <TabsContent value="用戶" className="mt-0">
          開發中
        </TabsContent>
      </Tabs>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export default Page;
