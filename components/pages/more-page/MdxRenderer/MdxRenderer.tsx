import React from "react";
import { cn } from "../../../@/lib/utils";
import { css } from "@emotion/css";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { tailwind_config } from "../../../../utils/twconf2js";

type Props = {
  mdxSource: MDXRemoteSerializeResult;
};

const MdxRenderer = (props: Props) => {
  return (
    <div
      className={cn(
        "p-4",
        "text-text3",
        css`
          code {
            font-family: monospace;
            margin: 0px 4px;
            padding: 2px;
            background: ${tailwind_config.theme.colors.secondary};
          }
          h1 {
            font-size: 2em;
            font-weight: 700;
          }
          h2 {
            font-size: 1.5em;
            font-weight: 700;
          }
          h3 {
            font-size: 1.17em;
            font-weight: 700;
          }
          h4 {
            font-size: 1em;
            font-weight: 700;
          }
          h5 {
            font-size: 0.83em;
            font-weight: 700;
          }
          h6 {
            font-size: 0.67em;
            font-weight: 700;
          }
          ul {
            display: block;
            list-style-type: disc;
            margin-top: 1em;
            margin-bottom: 1 em;
            margin-left: 0;
            margin-right: 0;
            padding-left: 40px;
          }
          li {
            display: list-item;
          }
        `
      )}
    >
      <MDXRemote {...props.mdxSource} />
    </div>
  );
};

export default MdxRenderer;
