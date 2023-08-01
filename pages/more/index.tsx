import MoreItem from "../../components/pages/more-page/MoreItem/MoreItem";
import { AiFillSetting, AiFillBug } from "react-icons/ai";
import { BiSolidHappyAlt, BiCodeAlt } from "react-icons/bi";
import { cn } from "../../components/@/lib/utils";
import WhatsNew from "../../components/pages/more-page/WhatsNew/WhatsNew";
import MoreBox from "../../components/pages/more-page/MoreBox/MoreBox";

const Page = () => {
  return (
    <div
      className={cn(
        "w-screen h-[calc(100vh-96px)] overflow-y-scroll",
        "p-3 pt-6"
      )}
    >
      <WhatsNew />
      <MoreBox title="選項">
        <MoreItem icon={<BiSolidHappyAlt />}>關於</MoreItem>
        <MoreItem icon={<BiCodeAlt />}>開發人員</MoreItem>
        <MoreItem icon={<AiFillBug />}>回報問題</MoreItem>
        <MoreItem icon={<AiFillSetting />}>設置</MoreItem>
      </MoreBox>
    </div>
  );
};

export default Page;
