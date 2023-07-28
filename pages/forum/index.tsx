import type { GetStaticProps, NextPage } from "next";
import { cn } from "../../utils/cn";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/@/components/ui/tabs";
import { Card, CardContent } from "../../components/@/components/ui/card";
import PPT, { HotBoard } from "../../core/PPT";

const forumsType = [{ name: "熱門看板" }, { name: "分類看板" }];

type Props = {
  forums: HotBoard[];
};

const ForumPage: NextPage<Props> = (props: Props) => {

  return (
    <div className="w-screen h-screen overflow-scroll">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full rounded-none">
          {forumsType.map((forumType) => (
            <TabsTrigger value={forumType.name} className="w-full">
              {forumType.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {forumsType.map((forumType) => (
          <TabsContent value={forumType.name} className="mt-0">
            {props.forums.map((forum) => (
              <Card key={forum.boardName} className="rounded-none">
                <CardContent
                  className={cn("bg-primary", "flex justify-between")}
                >
                  <div>
                    <h3>{forum.boardName}</h3>
                    <h3>{forum.boardClass}</h3>
                  </div>
                  <div>
                    <h3 className={cn(
                    forum.boardLevel === 1 ? "text-red-500": "",
                    forum.boardLevel === 2 ? "text-blue-400": "",
                    forum.boardLevel === 3 ? "text-white": "",
                    forum.boardLevel === 4 ? "text-green-400": "",
                      )}>{forum.boardRate}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const forums = await PPT.getHotBoards();

  return {
    props: {
      forums,
    },
  };
};

export default ForumPage;
