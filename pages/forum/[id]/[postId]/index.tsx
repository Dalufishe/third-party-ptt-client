import { GetServerSideProps } from "next";
import PTT, { Post } from "../../../../core/PTT";
import { cn } from "../../../../components/@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/@/components/ui/card";

type Props = {
  post: Post;
};

const Page = (props: Props) => {
  return (
    <div className="w-screen h-[calc(100vh-96px)]  overflow-scroll">
      <Card className={cn("p-3", "rounded-none")}>
        <CardHeader className="p-0">
          <CardDescription className="text-text2">
            {props.post.author}
          </CardDescription>
          <CardTitle className="text-xl">{props.post.title}</CardTitle>
          <div className="flex justify-between">
            <CardDescription className="text-text2">
              {props.post.board}
            </CardDescription>
            <CardDescription className="text-text2">
              {new Date(props.post.time).toLocaleString()}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card className={cn("p-3", "rounded-none")}>
        <CardContent className={cn("p-0", "whitespace-pre-line")}>
          {props.post.article}
        </CardContent>
      </Card>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = (ctx.query?.id + "/" + ctx.query?.postId) as string;
  const post = await PTT.getPost(page);
  return {
    props: { post },
  };
};

export default Page;
