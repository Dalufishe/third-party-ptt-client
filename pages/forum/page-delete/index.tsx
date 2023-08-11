import { cn } from "../../../components/@/lib/utils";
import Block from "../../../components/global/Block/Block";
import { Button } from "../../../components/@/components/ui/button";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "w-screen h-[calc(100vh-96px)]",
        "flex flex-col items-center justify-center"
      )}
    >
      <div className="font-bold text-2xl">404</div>
      <h1 className="text-xl text-text2">本文章已被刪除</h1>
      <Block value={2} />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          router.back();
        }}
      >
        回上一頁
      </Button>
    </div>
  );
};

export default Page;
