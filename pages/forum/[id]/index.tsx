import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PTT, { BoardItem } from "../../../core/PTT";
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

type Props = {
  forum: BoardItem[];
  need18up: boolean;
  currentId: string;
};

const Page: NextPage<Props> = (props: Props) => {
  const router = useRouter();

  // forums

  const [forum, setForum] = useState(props.forum);
  const [currentId, setCurrentId] = useState(props.currentId);

  const fetchNextData = useCallback(async () => {
    const res = await fetch(
      `/api/getBoard/?forum=${router.query.id}&id=${Number(currentId) - 1}`
    );
    const json = await res.json();
    setForum([...forum, ...json?.data]);
    setCurrentId(String(Number(currentId) - 1));
  }, [currentId]);

  useEffect(() => {
    if (forum.length < 20) {
      fetchNextData();
    }
  }, []);

  // 18
  const [need18, setNeed18] = useState(false);

  useLayoutEffect(() => {
    if (props.need18up) {
      setNeed18(true);
    }
  }, []);

  const handleIs18 = useCallback(() => {
    setNeed18(false);
  }, []);

  const handleIsNot18 = useCallback(() => {
    router.push("/");
  }, []);

  return need18 ? (
    <Need18Up onIs18Click={handleIs18} onIsNot18Click={handleIsNot18} />
  ) : (
    <div
      id="react-infinite-scroll-component"
      className={cn("w-screen h-[calc(100vh-96px)] overflow-y-scroll")}
    >
      <Input
        type="text"
        placeholder="搜尋文章..."
        className={cn("h-[48px]", "rounded-none")}
      />
      <InfiniteScroll
        scrollableTarget="react-infinite-scroll-component"
        dataLength={forum.length}
        next={fetchNextData}
        hasMore={true}
        loader={<div></div>}
      >
        {forum?.map((forumItem) => (
          <Link
            key={forumItem.title}
            href={(function () {
              if (typeof window !== "undefined") {
                return forumItem.href;
              }
              return "";
            })()}
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
                    className={cn("w-10", "flex items-center justify-center")}
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
                        {forumItem.rate === -1 ? "爆" : forumItem.rate || ""}
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
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const hotBoards = await PTT.getHotBoards();
  const paths = hotBoards.map((board) => "/forum/" + board.boardHref);
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const forumId = context.params?.id as string;
  const response = await PTT.getBoard(forumId);
  const forum = response.data;
  const need18up = response.need18up;
  const currentId = response.currentId;

  return {
    props: {
      forum,
      need18up,
      currentId,
    },
    revalidate: 3,
  };
};

export default Page;
