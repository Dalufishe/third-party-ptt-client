import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import { NextPageWithLayout } from "../../../../../components/layout/NextPageWithLayout";
import getSiteURL from "../../../../../utils/getSiteURL";
import Navbar from "../../../../../components/pages/search-id-page/Navbar/Navbar";
import DefaultLayout from "../../../../../components/layout/DefaultLayout";
import PTR from "../../../../../components/global/PTR/PTR";
import { BoardItem } from "../../../../../core/PTT";
import PostCard from "../../../../../components/pages/board-page/PostCard/PostCard";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Props = {
  keyword: string;
  boardName: string;
};

const Page: NextPageWithLayout<Props> = (props: Props) => {
  
  const keyword = props.keyword;
  const boardName = props.boardName;

  const [currentId, setCurrentId] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);

  // 搜尋邏輯
  const handleSearch = useCallback(
    async (id: number = 0) => {
      if (keyword !== undefined) {
        const url = `/api/searchPosts?boardName=${boardName}&keyword=${keyword}&page=${id}`;
        const res = await fetch(url);
        const searchPosts: BoardItem[] = (await res.json()).data;
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
        <title>
          「{keyword}」在 {boardName} 的搜尋結果 - 我の批踢踢
        </title>
        <meta
          property="og:title"
          content={`「${keyword}」在 ${boardName} 的搜尋結果 - 我の批踢踢`}
          key="title"
        />
        <meta
          property="og:url"
          content={`${getSiteURL()}/forum/${boardName}/search/${keyword}`}
          key="url"
        />
      </Head>
      <Navbar>
        「{keyword}」在 {boardName} 的搜尋結果：
      </Navbar>

      <div
        className="h-[calc(100vh-96px)] overflow-scroll"
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
              {posts.map((post: BoardItem) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </PTR>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  console.log(ctx.params);
  const keyword = ctx.params?.searchid || "";
  const boardName = ctx.params?.id || "";
  return {
    props: { keyword, boardName },
  };
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export default Page;
