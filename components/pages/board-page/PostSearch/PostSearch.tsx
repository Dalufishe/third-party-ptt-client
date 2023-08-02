import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../@/lib/utils";

const FormSchema = z.object({
  keyword: z.string(),
});

type Props = {
  onSubmit: (data: z.infer<typeof FormSchema>) => any;
  placeholder: string;
};

const PostSearch = (props: Props) => {
  // search
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder={props.placeholder}
                  autoComplete="off"
                  className={cn(
                    "text-text3",
                    "h-[48px]",
                    "rounded-none",
                    "focus-visible:ring-0"
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PostSearch;
