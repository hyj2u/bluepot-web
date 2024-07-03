import { V } from "@/_ui";
import { css } from "@emotion/react";
import React, { ReactNode } from "react";

export default function DragTable({ children }: { children: ReactNode }) {
  return (
    <V.ScrollDragHorizontal
      scrollBarActive
      css={css`
        ::-webkit-scrollbar {
          height: 6px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 0px;
        }
      `}
    >
      <V.Column>{children}</V.Column>
    </V.ScrollDragHorizontal>
  );
}
