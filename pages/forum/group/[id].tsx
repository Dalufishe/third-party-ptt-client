import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PPT, { GroupBoard, HotBoard } from "../../../core/PPT";
import { cn } from "../../../utils/cn";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/@/components/ui/tabs";
import { Card, CardContent } from "../../../components/@/components/ui/card";
import Link from "next/link";

const forumsType = [
  { name: "熱門看板", href: "/forum/hot" },
  { name: "分類看板", href: "/forum/group/1" },
];
type Props = {
  groups: GroupBoard[];
};

const Page: NextPage<Props> = (props: Props) => {
  return (
    <div className={cn("w-screen h-[calc(100vh-96px)] overflow-y-scroll")}>
      <Tabs defaultValue={forumsType[1].name} className={cn("w-full")}>
        <TabsList className="w-full rounded-none">
          {forumsType.map((forumType) => (
            <TabsTrigger
              key={forumType.name}
              value={forumType.name}
              className="w-full"
            >
              <Link href={forumType.href}>{forumType.name}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
        {forumsType.map((forumType) => {
          if (forumType.name === "分類看板") {
            return (
              <TabsContent
                key={forumType.name}
                value={forumType.name}
                className="mt-0"
              >
                {props.groups?.map((forum) => (
                  <Link href={forum.boardHref}>
                    <Card key={forum.boardName} className="rounded-none">
                      <CardContent
                        className={cn(
                          "bg-primary",
                          "flex flex-col justify-between",
                          "p-2"
                        )}
                      >
                        <div className="flex justify-between">
                          <div className="flex">
                            <h3>{forum.boardName}</h3>
                          </div>
                          <div></div>
                        </div>
                        <div className="text-text2 text-sm">
                          {forum.boardTitle}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </TabsContent>
            );
          }
        })}
      </Tabs>
    </div>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/forum/group/1"],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const groupId = context.params?.id as string | undefined;
  const groups = await PPT.getGroupBoards(groupId);
  return {
    props: {
      groups,
      revalidate: 3,
    },
  };
};

export default Page;
