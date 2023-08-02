import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../@/components/ui/select";

type Props = {
  title: string;
  placeholder?: string;
  values: string[];
  onValueChange?: (value: string) => void;
};

const SortItem = (props: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-text3">{props.title}</h3>
      <Select onValueChange={props.onValueChange}>
        <SelectTrigger className="w-[180px] focus:ring-0">
          <SelectValue placeholder={props.placeholder || props.values[0]} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {props.values.map((value) => (
              <SelectItem value={value}>{value}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortItem;
