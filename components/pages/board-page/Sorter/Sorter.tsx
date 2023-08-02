import React, { useState } from "react";
import { cn } from "../../../@/lib/utils";
import { MdOutlineTune } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";

type Props = {};

const Sorter = (props: Props) => {
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
          <div className="flex items-center justify-between">
            <h3 className="text-text3">類型</h3>
            <Select>
              <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="不限" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="不限">不限</SelectItem>
                  <SelectItem value="問卦">問卦</SelectItem>
                  <SelectItem value="公告">公告</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-text3">排序依據</h3>
            <Select>
              <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="關聯性" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="關聯性">關聯性</SelectItem>
                  <SelectItem value="最新">最新</SelectItem>
                  <SelectItem value="最舊">最舊</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-text3">上傳時間</h3>
            <Select>
              <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="不限時間" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="不限時間">不限時間</SelectItem>
                  <SelectItem value="過去一小時">過去一小時</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction>套用</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Sorter;
