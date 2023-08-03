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
import _ from "lodash";

export type CurrentSortData = {
  name: string;
  data: string;
}[];

type Props = {
  sortData: { name: string; data: string[] }[];
  defaultSortData: CurrentSortData;
  onConfirm: (data: CurrentSortData) => any;
};

const Sorter = (props: Props) => {
  const [currentSortData, setCurrentSortData] = useState(
    props.sortData.map((item) => {
      return {
        name: item.name,
        data: item.data[0],
      };
    })
  );

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
          {currentSortData.map((item) => (
            <SortItem
              key={item.name}
              title={item.name}
              values={
                props.sortData.filter((f) => f.name === item.name)[0].data
              }
              placeholder={
                props.defaultSortData.filter((f) => f.name === item.name)[0]
                  .data
              }
              onValueChange={(v) => {
                setCurrentSortData(
                  currentSortData.map((data) => {
                    if (data.name === item.name) {
                      return { name: item.name, data: v };
                    } else {
                      return data;
                    }
                  })
                );
              }}
            />
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              props.onConfirm(currentSortData);
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
