import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { cn } from "../../../@/lib/utils";
import { tailwind_config } from "../../../../utils/twconf2js";
import { css } from "@emotion/css";

const WhatsNew = () => {
  return (
    <Card
      className={cn(
        "dark:bg-secondary",
        css`
          background: linear-gradient(
            to bottom right,
            ${tailwind_config.theme.colors.text2},
            ${tailwind_config.theme.colors.primary},
            ${tailwind_config.theme.colors.secondary}
          );
          background-size: 100% 200%;
          animation: gradient 21s ease infinite;
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
  );
};

export default WhatsNew;
