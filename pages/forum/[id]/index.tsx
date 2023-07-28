import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PPT, { BoardItem } from "../../../core/PPT";
import { Card, CardContent } from "../../../components/@/components/ui/card";
import Link from "next/link";
import { cn } from "../../../utils/cn";
import { Input } from "../../../components/@/components/ui/input";

type Props = {
  forum: BoardItem[];
};

const Page: NextPage<Props> = (props: Props) => {
  return (
    <div className={cn("w-screen h-[calc(100vh-96px)] overflow-y-scroll")}>
      <Input
        type="text"
        placeholder="搜尋文章..."
        className={cn("h-[48px]", "rounded-none")}
      />
      {props.forum?.map((forumItem) => (
        <Link href={forumItem.href}>
          <Card key={forumItem.title} className="rounded-none">
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const forumId = context.params?.id as string;
  const forum = await PPT.getBoard(forumId);
  return {
    props: {
      forum,
    },
  };
};

export default Page;
