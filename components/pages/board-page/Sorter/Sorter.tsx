import React, { useState } from "react";
import { cn } from "../../../@/lib/utils";
import { MdOutlineTune } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../@/components/ui/alert-dialog";
import SortItem from "./SortItem/SortItem";

type Props = {
  onConfirm: () => any;
};

const SortTypeValues = ["不限", "公告", "Re:"];
const SortOrderValues = ["關聯性", "最新", "最舊"];
const SortUpdateTimeValues = ["不限時間", "今天", "一周內"];

const Sorter = (props: Props) => {
  const [SortType, setSortType] = useState(SortTypeValues[0]);
  const [SortOrder, setSortOrder] = useState(SortOrderValues[0]);
  const [SortUpdateTime, setSortUpdateTime] = useState(SortUpdateTimeValues[0]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className={cn(
            "w-12 h-12",
            "border border-secondary border-l-0",
            "bg-primary",
            "flex justify-center items-center",
            "text-xl text-text3"
          )}
        >
          <MdOutlineTune />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className={cn("w-[80%]", "flex flex-col gap-5")}>
        <AlertDialogHeader>
          <AlertDialogTitle>看板篩選器</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <SortItem
            title="類型"
            values={SortTypeValues}
            onValueChange={(v) => {
              setSortType(v);
            }}
          />
          <SortItem
            title="排序依據"
            values={SortOrderValues}
            onValueChange={(v) => {
              setSortOrder(v);
            }}
          />
          <SortItem
            title="上傳時間"
            values={SortUpdateTimeValues}
            onValueChange={(v) => {
              setSortUpdateTime(v);
            }}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              props.onConfirm();
            }}
          >
            套用
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Sorter;
