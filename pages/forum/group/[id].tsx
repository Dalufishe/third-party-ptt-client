import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PTT, { GroupBoard, HotBoard } from "../../../core/PTT";
import { cn } from "../../../utils/cn";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/@/components/ui/tabs";
import { Card, CardContent } from "../../../components/@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import IsBottom from "../../../components/layout/IsBottom/IsBottom";
import getSiteURL from "../../../utils/getSiteURL";

const forumsType = [
  { name: "熱門看板", href: "/forum/hot" },
  { name: "分類看板", href: "/forum/group/1" },
];
type Props = {
  groups: GroupBoard[];
};

const Page: NextPage<Props> = (props: Props) => {
  const router = useRouter();

  return (
    <div className={cn("w-screen h-[calc(100vh-96px)] overflow-y-scroll")}>
      <Head>
        <title>分類看板 - 我の批踢踢</title>
        <meta property="og:title" content="分類看板 - 我の批踢踢" key="title" />
        <meta
          property="og:url"
          content={`${getSiteURL()}/forum/hot`}
          key="url"
        />
      </Head>
      <Tabs defaultValue={forumsType[1].name} className={cn("w-full")}>
        <TabsList className="w-full rounded-none">
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
          if (forumType.name === "分類看板") {
            return (
              <TabsContent
                key={forumType.name}
                value={forumType.name}
                className="mt-0"
              >
                {props.groups?.map((forum) => (
                  <Link key={forum.id} href={forum.boardHref}>
                    <Card className="rounded-none">
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
                <IsBottom />
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
  const groups = await PTT.getGroupBoards(groupId);
  return {
    props: {
      groups,
      revalidate: 3,
    },
  };
};

export default Page;
