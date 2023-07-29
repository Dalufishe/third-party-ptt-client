import React, { useCallback } from "react";
import { cn } from "../../@/lib/utils";
import Block from "../../global/Block/Block";
import { Button } from "../../@/components/ui/button";

const Need18Up = ({ onIs18Click = () => {}, onIsNot18Click = () => {} }) => {
  return (
    <div
      className={cn(
        "w-screen h-[calc(100vh-96px)]",
        "flex flex-col items-center justify-center"
      )}
    >
      <div className="font-bold text-2xl">本網站已依網站內容分級規定處理</div>
      <h1 className={cn("text-xl text-text2 text-center", "p-2")}>
        您即將進入之看板內容需滿十八歲方可瀏覽。若您尚未年滿十八歲，請點選離開。若您已滿十八歲，亦不可將本區之內容派發、傳閱、出售、出租、交給或借予年齡未滿18歲的人士瀏覽，或將本網站內容向該人士出示、播放或放映。
      </h1>
      <Block value={2} />
      <div className="flex gap-3">
        <Button variant="secondary" size="sm" onClick={onIs18Click}>
          我已滿18歲
        </Button>
        <Button variant="secondary" size="sm" onClick={onIsNot18Click}>
          我未滿18歲
        </Button>
      </div>
    </div>
  );
};

export default Need18Up;
