/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, TableHTMLAttributes, forwardRef } from "react";
import { ScrollTheme, ScrollType } from "@/_ui/_themes/scroll";

interface Props extends TableHTMLAttributes<HTMLTableElement>, ScrollType {
  zIndex?: number;
  width?: "auto" | "100%" | "100vw";
  height?: "auto" | "100%" | "100vh";
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  borderRadius?: number | string;
  backgroundColor?: string;
  transitionTime?: number;
}

const Table = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLTableElement>) => {
    const scrollT = ScrollTheme({ scroll: props.scroll });

    const {
      zIndex,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      backgroundColor,
      borderRadius,
      ...rest
    } = props;

    return (
      <table
        ref={ref}
        css={{
          zIndex: zIndex,
          width: width,
          minWidth: minWidth,
          maxWidth: maxWidth,
          height: height,
          minHeight: minHeight,
          maxHeight: maxHeight,

          position: "relative",
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,

          borderStyle: "none",
          borderSpacing: 0,
          borderCollapse: "collapse",

          ...scrollT,
        }}
        {...rest}
      >
        {props.children}
      </table>
    );
  }
);

export { Table };
