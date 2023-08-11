import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import PTT, { GroupBoard } from "../../../core/PTT";
import { cn } from "../../../utils/cn";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/@/components/ui/tabs";
import { useRouter } from "next/router";
import Head from "next/head";
import IsBottom from "../../../components/layout/IsBottom/IsBottom";
import getSiteURL from "../../../utils/getSiteURL";
import { wrapper } from "../../../redux/store";
import PTR from "../../../components/global/PTR/PTR";
import GroupBoardCard from "../../../components/pages/group-board-page/GroupBoardCard";

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
              <PTR key={forumType.name}>
                <TabsContent value={forumType.name} className="mt-0">
                  {props.groups?.map((forum) => (
                    <GroupBoardCard key={forum.id} forum={forum} />
                  ))}
                  <IsBottom />
                </TabsContent>
              </PTR>
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
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  () => async (context) => {
    const groupId = context.params?.id as string | undefined;
    const groups = await PTT.getGroupBoards(groupId);
    return {
      props: {
        groups,
        revalidate: 3,
      },
    };
  }
);

export default Page;
