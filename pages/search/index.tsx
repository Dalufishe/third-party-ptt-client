import { useState } from "react";
import { cn } from "../../components/@/lib/utils";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { NextPageWithLayout } from "../../components/layout/NextPageWithLayout";
import Searchbar from "../../components/pages/search-page/Searchbar/Searchbar";
import { Card, CardContent } from "../../components/@/components/ui/card";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [historyKeyword, setHistoryKeyword] = useState(["老高", "白飯"]);
  return (
    <div>
      {/* Search bar */}
      <Searchbar
        value={keyword}
        onChange={(e: any) => {
          setKeyword(e.target.value);
        }}
        placeholder="全站搜尋 「老高」"
      />
      {/* Board Short Cut */}
      <div>
        <h4 className={cn("text-text3 text-sm", "p-3 pb-2")}>看板</h4>
      </div>
      {/* Your Record */}
      <div>
        <div className="flex justify-between">
          <h4 className={cn("text-text3 text-sm", "p-3 pb-2")}>您的搜尋紀錄</h4>
          <h4 className={cn("text-text2 text-sm underline", "p-3 pb-2")}>
            清除
          </h4>
        </div>
        {historyKeyword.map((k, index) => (
          <Card className="rounded-none border-0 px-1" key={index}>
            <CardContent
              className={cn(
                "bg-primary",
                "flex flex-col justify-between",
                "p-2"
              )}
            >
              {k}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export default Page;
