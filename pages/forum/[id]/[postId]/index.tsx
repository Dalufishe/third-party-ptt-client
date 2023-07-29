import { GetServerSideProps } from "next";
import PTT, { Post } from "../../../../core/PTT";
import { cn } from "../../../../components/@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/@/components/ui/card";
import { NextPageWithLayout } from "../../../../components/layout/NextPageWithLayout";
import DefaultLayout from "../../../../components/layout/DefaultLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { Alert } from "../../../../components/@/components/ui/alert";

type Props = {
  post: Post;
};

const Page: NextPageWithLayout<Props> = (props: Props) => {
  const router = useRouter();
  console.log(props.post.comments);
  return (
    <>
      {/* replaced Navbar */}
      <div
        className={cn(
          "h-[48px] bg-brand",
          "flex justify-between items-center",
          "px-3"
        )}
      >
        <div>
          <AiOutlineArrowLeft
            className={cn("w-5 h-5")}
            onClick={() => {
              router.back();
            }}
          />
        </div>
        <div>
          <h2 className={cn("text-sm text-text3")}>{props.post.title}</h2>
        </div>
        <div></div>
      </div>
      {/* Main Content */}
      <div className="w-screen h-[calc(100vh-96px)]  overflow-y-scroll">
        <Card className={cn("p-3", "rounded-none")}>
          <CardHeader className="p-0">
            <CardDescription className="text-text2">
              @{props.post.author}
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
          <CardContent
            className={cn(
              "overflow-hidden",
              "p-0",
              "whitespace-pre-wrap break-words",
              "text-text3"
            )}
          >
            {props.post.article}
          </CardContent>
        </Card>
        <Card className={cn("p-3", "rounded-none")}>
          <CardContent className={cn("p-0")}>
            <div>{props.post.fromIp}</div>
            <div>{props.post.fromCountry}</div>
          </CardContent>
        </Card>
        <Card className={cn("p-2", "rounded-none")}>
          <CardContent className={cn("p-0")}>
            {props.post.comments.map((c) => (
              <Card
                key={c.content}
                className={cn(
                  "p-0",
                  "rounded-none",
                  "border-x-0 border-t-0",
                  "text-sm"
                )}
              >
                <div className={cn("px-1 py-3")}>
                  <div className="flex gap-2">
                    {" "}
                    <h5
                      className={cn(
                        "text-base",
                        c.tag === "推" ? "text-text1" : "",
                        c.tag === "噓" ? "text-red-400" : "",
                        c.tag === "→ " ? "text-red-400" : ""
                      )}
                    >
                      {c.tag}
                    </h5>
                    <h5 className="text-text3">{c.user}:</h5>
                    <h5 className="text-text3">{c.content}</h5>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <DefaultLayout noNavbar>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = (ctx.query?.id + "/" + ctx.query?.postId) as string;
  const post = await PTT.getPost(page);
  return {
    props: { post },
  };
};

export default Page;
