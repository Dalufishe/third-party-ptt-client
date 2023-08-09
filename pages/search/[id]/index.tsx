import { useCallback, useEffect, useMemo, useState } from "react";
import DefaultLayout from "../../../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../../../components/layout/NextPageWithLayout";
import Navbar from "../../../components/pages/search-id-page/Navbar";
import { useRouter } from "next/router";
import { Board, BoardItem } from "../../../core/PTT";
import PostCard from "../../../components/pages/board-page/PostCard/PostCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/@/components/ui/tabs";
import { cn } from "../../../components/@/lib/utils";
import PTR from "../../../components/global/PTR/PTR";
import InfiniteScroll from "react-infinite-scroll-component";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const keyword = router.query.id as string | undefined;
  const [currentId, setCurrentId] = useState(1);
  const [posts, setPosts] = useState<BoardItem[]>([]);

  // 搜尋邏輯
  const handleSearch = useCallback(
    async (id: number = 1, boardName: string = "Gossiping") => {
      if (keyword !== undefined) {
        const url = `/api/searchPosts/?boardName=${boardName}&keyword=${keyword}&page=${id}`;
        const res = await fetch(url);
        const json: Board = await res.json();
        return json.data;
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
          <TabsTrigger value="綜合" className="w-full">
            綜合
          </TabsTrigger>
          <TabsTrigger value="文章" className="w-full">
            文章
          </TabsTrigger>
          <TabsTrigger value="看板" className="w-full">
            看板
          </TabsTrigger>
        </TabsList>
        <TabsContent value="綜合">開發中</TabsContent>
        <TabsContent value="文章" className="mt-0">
          <div
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
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </PTR>
            </InfiniteScroll>
          </div>
        </TabsContent>
        <TabsContent value="看板">開發中</TabsContent>
      </Tabs>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export default Page;
