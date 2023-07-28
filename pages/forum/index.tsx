import type { GetStaticProps, NextPage } from "next";
import { cn } from "../../utils/cn";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/@/components/ui/tabs";
import { Card, CardContent } from "../../components/@/components/ui/card";
import PPT, { GroupBoard, HotBoard } from "../../core/PPT";

const forumsType = [{ name: "熱門看板" }, { name: "分類看板" }];

type Props = {
  forums: HotBoard[];
  groups: GroupBoard[];
};

const ForumPage: NextPage<Props> = (props: Props) => {
  return (
    <div
      className={cn(
        "w-screen h-[calc(100vh-96px)] overflow-scroll",
      )}
    >
      <Tabs
        defaultValue={forumsType[0].name}
        className={cn("w-full")}
      >
        <TabsList className="w-full rounded-none">
          {forumsType.map((forumType) => (
            <TabsTrigger
              key={forumType.name}
              value={forumType.name}
              className="w-full"
            >
              {forumType.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {forumsType.map((forumType) => {
          if (forumType.name === "熱門看板") {
            return (
              <TabsContent
                key={forumType.name}
                value={forumType.name}
                className="mt-0"
              >
                {props.forums.map((forum) => (
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
                          <h3>{forum.boardClass}</h3>・
                          <h3>{forum.boardName}</h3>
                        </div>
                        <div>
                          <h3
                            className={cn(
                              forum.boardLevel === 1 ? "text-cyan-400" : "",
                              forum.boardLevel === 2 ? "text-blue-400" : "",
                              forum.boardLevel === 3 ? "text-red-400" : "",
                              forum.boardLevel === 4 ? "text-text1" : "",
                              forum.boardLevel === 5 ? "text-yellow-400" : ""
                            )}
                          >
                            {forum.boardRate}
                          </h3>
                        </div>
                      </div>
                      <div className="text-text2 text-sm">
                        {forum.boardTitle}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            );
          }
          if (forumType.name === "分類看板") {
            return (
              <TabsContent
                key={forumType.name}
                value={forumType.name}
                className="mt-0"
              >
                {props.groups.map((forum) => (
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
                ))}
              </TabsContent>
            );
          }
        })}
      </Tabs>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const forums = await PPT.getHotBoards();
  const groups = await PPT.getGroupBoards();
  return {
    props: {
      forums,
      groups,
    },
  };
};

export default ForumPage;
