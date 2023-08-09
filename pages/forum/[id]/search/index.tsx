import { useRouter } from "next/router";
import DefaultLayout from "../../../../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../../../../components/layout/NextPageWithLayout";
import { useCallback, useEffect, useState } from "react";
import Searchbar from "../../../../components/pages/search-page/Searchbar/Searchbar";
import SearchItem from "../../../../components/pages/search-page/SearchItem/SearchItem";
import { cn } from "../../../../components/@/lib/utils";
import { Card, CardContent } from "../../../../components/@/components/ui/card";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const boardName = router.query.id;

  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [historyKeyword, setHistoryKeyword] = useState<string[]>([]);

  // 判斷是否正在搜尋
  useEffect(() => {
    keyword ? setIsSearching(true) : setIsSearching(false);
  }, [keyword]);

  // 歷史搜尋紀錄
  useEffect(() => {
    setHistoryKeyword(
      JSON.parse(localStorage.getItem(boardName + "-history-keyword") || "[]")
    );
  }, [boardName]);

  // 搜尋函式
  const handleSearch = useCallback(
    (keyword: string) => {
      // history keyword
      const result = Array.from(new Set([keyword, ...historyKeyword]));
      localStorage.setItem(
        boardName + "-history-keyword",
        JSON.stringify(result)
      );
      // routing (search id page)
      router.push(`/forum/${boardName}/search/${keyword}`);
    },
    [historyKeyword,boardName]
  );

  // Enter 確認
  const handleSubmit = useCallback(() => {
    handleSearch(keyword);
  }, [handleSearch, keyword]);

  // 清除紀錄
  const handleClearHistory = useCallback(() => {
    setHistoryKeyword([]);
    localStorage.setItem(boardName + "-history-keyword", JSON.stringify([]));
  }, [boardName]);

  return (
    <div>
      {/* 搜尋欄 */}
      <Searchbar
        placeholder={`在 ${boardName} 搜尋 「老高」`}
        onChange={(e: any) => {
          setKeyword(e.target.value);
        }}
        onSubmit={handleSubmit}
      />

      {isSearching ? (
        // 搜尋匹配
        <SearchItem
          value={keyword}
          onClick={() => {
            handleSearch(keyword);
          }}
        />
      ) : (
        // 您的搜尋紀錄
        <div>
          <div className="flex justify-between">
            <h4 className={cn("text-text3 text-sm", "p-3 pb-2")}>
              您的搜尋紀錄
            </h4>
            <h4
              onClick={handleClearHistory}
              className={cn(
                "cursor-pointer",
                "text-text2 text-sm underline",
                "p-3 pb-2"
              )}
            >
              清除
            </h4>
          </div>
          {historyKeyword.map((k, index) => (
            <Card
              onClick={() => {
                handleSearch(k);
              }}
              className="cursor-pointer rounded-none border-0 px-1"
              key={index}
            >
              <CardContent
                className={cn(
                  "bg-primary",
                  "flex flex-col justify-between",
                  "p-2",
                  "text-lg"
                )}
              >
                {k}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export default Page;
