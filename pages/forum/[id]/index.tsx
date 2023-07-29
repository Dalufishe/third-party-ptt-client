import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PTT, { BoardItem } from "../../../core/PTT";
import { Card, CardContent } from "../../../components/@/components/ui/card";
import Link from "next/link";
import { cn } from "../../../utils/cn";
import { Input } from "../../../components/@/components/ui/input";
import Need18Up from "../../../components/layout/Need18Up/Need18Up";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  forum: BoardItem[];
  need18up: boolean;
};

const Page: NextPage<Props> = (props: Props) => {
  const router = useRouter();

  const [is18, setIs18] = useState(false);

  useEffect(() => {
    if (props.need18up) {
      setIs18(false);
    }
  }, []);

  const handleIs18 = useCallback(() => {
    setIs18(true);
  }, []);
  const handleIsNot18 = useCallback(() => {
    router.push("/");
  }, []);

  return !is18 ? (
    <Need18Up onIs18Click={handleIs18} onIsNot18Click={handleIsNot18} />
  ) : (
    <div className={cn("w-screen h-[calc(100vh-96px)] overflow-y-scroll")}>
      <Input
        type="text"
        placeholder="搜尋文章..."
        className={cn("h-[48px]", "rounded-none")}
      />
      {props.forum?.map((forumItem) => (
        <Link key={forumItem.title} href={forumItem.href}>
          <Card className="rounded-none">
            <CardContent
              className={cn(
                "bg-primary",
                "flex flex-col justify-between",
                "p-2 pl-0"
              )}
            >
              <div className="flex items-center">
                <div className={cn("w-10", "flex items-center justify-center")}>
                  <div>
                    <h3
                      className={cn(
                        forumItem.level === 1 ? "text-cyan-400" : "",
                        forumItem.level === 2 ? "text-blue-400" : "",
                        forumItem.level === 3 ? "text-red-400" : "",
                        forumItem.level === 4 ? "text-text1" : "",
                        ""
                      )}
                    >
                      {forumItem.rate === -1 ? "爆" : forumItem.rate}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3>{forumItem.title}</h3>
                  <div className="text-text2 text-sm">{forumItem.author}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
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

  return {
    props: {
      forum,
      need18up,
    },
    revalidate: 3,
  };
};

export default Page;
