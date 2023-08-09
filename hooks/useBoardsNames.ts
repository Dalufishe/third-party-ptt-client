import { useMemo } from "react";
import { HotBoard } from "../core/PTT";

//* 一個獲取到所有看板名稱的 hook (目前僅支持熱門看板)

const useBoardsNames = () => {
  return useMemo(async () => {
    const url = `/api/getHotBoards`;
    const res = await fetch(url);
    const hotBoards: HotBoard[] = await res.json();
    return hotBoards.map((h) => h.boardName);
  }, []);
};

export default useBoardsNames;
