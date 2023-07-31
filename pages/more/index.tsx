import { GetStaticProps } from "next";
import MoreItem from "../../components/pages/more-page/MoreItem";
import { AiFillSetting, AiFillBug } from "react-icons/ai";
import { cn } from "../../components/@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/@/components/ui/card";
import { css } from "@emotion/css";
import { tailwind_config } from "../../utils/twconf2js";

const Page = () => {
  return (
    <div
      className={cn(
        "w-screen h-[calc(100vh-96px)] overflow-y-scroll",
        "p-3 pt-4"
      )}
    >
      <Card
        className={cn(
          "dark:bg-secondary",
          css`
            background: linear-gradient(
              to bottom right,
              ${tailwind_config.theme.colors.secondary},
              ${tailwind_config.theme.colors.primary},
              ${tailwind_config.theme.colors.secondary}
            );
            background-size: 100% 300%;
            animation: gradient 7s ease infinite;
          `
        )}
      >
        <CardHeader>
          <CardTitle>新推出</CardTitle>
          <CardDescription>
            <span>Beta 版本 | 2023.7.31</span>
          </CardDescription>
        </CardHeader>
      </Card>
      <div>
        <h2 className={cn("text-sm text-text2", "p-3 pb-2 pt-4")}>選項</h2>
        <Card>
          <MoreItem icon={<AiFillSetting />}>關於</MoreItem>
          <MoreItem icon={<AiFillBug />}>回報問題</MoreItem>
          <MoreItem icon={<AiFillSetting />}>設置</MoreItem>
        </Card>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Page;
