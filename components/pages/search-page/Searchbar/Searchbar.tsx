import React from "react";
import { Input } from "../../../@/components/ui/input";
import { cn } from "../../../@/lib/utils";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const FormSchema = z.object({
  data: z.string(),
});

type Props = {
  onChange: any;
  placeholder: string;
  onSubmit: (data: z.infer<typeof FormSchema>) => any;
  defaultValue?: string;
};

const Searchbar = (props: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className={cn("dark:bg-secondary", "flex items-center gap-2", "px-4")}>
      <div className="text-xl">
        <AiOutlineSearch />
      </div>
      <Form {...form}>
        <form
          className="w-full"
          onSubmit={form.handleSubmit(props.onSubmit)}
          onChange={props.onChange}
        >
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                    autoComplete="off"
                    className={cn(
                      "dark:bg-secondary",
                      "text-text1 text-lg",
                      "h-[48px]",
                      "rounded-none",
                      "focus-visible:ring-0",
                      "focus-visible:ring-offset-0",
                      "border-r-0",
                      "caret-text1"
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Searchbar;
