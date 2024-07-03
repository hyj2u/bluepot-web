/** @jsxImportSource @emotion/react */

import React, { HTMLAttributes, ReactNode } from "react";
import { CursorTheme, CursorType } from "../_themes/cursor";
import { SpaceTheme, SpaceType } from "../_themes/space";
import { ViewportTypes } from "../_themes/viewport";
import { FlexTheme, FlexType } from "../_themes/flex";
import Link from "next/link";
import { BorderTheme, BorderType } from "../_themes/border";

interface Props
  extends Omit<
      HTMLAttributes<
        | HTMLDivElement
        | HTMLLIElement
        | HTMLSpanElement
        | HTMLButtonElement
        | HTMLAnchorElement
      >,
      "color"
    >,
    ViewportTypes,
    FlexType,
    BorderType,
    SpaceType,
    CursorType {
  as?: "div" | "li" | "span" | "button" | "a";
  children: ReactNode;
  txtSize?: number;
  txtColor?: string;
  disabledColor?: string;
  touchOpacity?: number;
  backgroundColor?: string;
  borderRadius?: number;
  href?: any;
  opacity?: number;
}

export function TouchableOpacity(props: Props) {
  const {
    as = "div",
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    flex,
    direction = "horizontal",
    align = "center",
    crossAlign,
    wrap,
    gap,
    crossGap,
    border,
    opacity,
    cursor,
    txtColor = "#4788f4",
    txtSize = 14,
    disabledColor,
    touchOpacity,
    backgroundColor,
    borderRadius,
    padding,
    margin,
    ...rest
  } = props;

  const spaceT = SpaceTheme({ padding, margin }) as any;
  const borderT = BorderTheme({ border });
  const cursorT = CursorTheme({ cursor, onClick: props.onClick }) as any;
  const viewT = { width, height, minWidth, maxWidth, minHeight, maxHeight };
  const FlexT = FlexTheme({
    flex,
    direction,
    align,
    crossAlign,
    wrap,
    gap,
    crossGap,
  });

  return (
    <>
      {as === "div" && (
        <div
          css={{
            position: "relative",
            whiteSpace: "nowrap",
            fontSize: txtSize ? `${txtSize / 16}rem` : "0.938rem",
            color: txtColor,
            transition: "0.1s ease-in-out",
            backgroundColor,
            borderRadius: borderRadius,
            opacity,
            ...viewT,
            ...FlexT,
            ...spaceT,
            ...borderT,
            ...cursorT,

            "&:disabled": { color: disabledColor ?? "#ccc", cursor: "default" },
            "&:active": { opacity: touchOpacity ?? 0.7 },
          }}
          {...rest}
        >
          {props.children}
        </div>
      )}

      {as === "li" && (
        <li
          css={{
            position: "relative",
            whiteSpace: "nowrap",
            fontSize: txtSize ? `${txtSize / 16}rem` : "0.938rem",
            color: txtColor,
            transition: "0.1s ease-in-out",
            backgroundColor,
            borderRadius: borderRadius,
            opacity,
            ...viewT,
            ...FlexT,
            ...spaceT,
            ...borderT,
            ...cursorT,

            "&:disabled": { color: disabledColor ?? "#ccc", cursor: "default" },
            "&:active": { opacity: touchOpacity ?? 0.7 },
          }}
          {...rest}
        >
          {props.children}
        </li>
      )}

      {as === "span" && (
        <span
          css={{
            position: "relative",
            whiteSpace: "nowrap",
            fontSize: txtSize ? `${txtSize / 16}rem` : "0.938rem",
            color: txtColor,
            transition: "0.1s ease-in-out",
            backgroundColor,
            borderRadius: borderRadius,
            opacity,
            ...viewT,
            ...FlexT,
            ...spaceT,
            ...borderT,
            ...cursorT,

            "&:disabled": { color: disabledColor ?? "#ccc", cursor: "default" },
            "&:active": { opacity: touchOpacity ?? 0.7 },
          }}
          {...rest}
        >
          {props.children}
        </span>
      )}

      {as === "button" && (
        <button
          css={{
            position: "relative",
            whiteSpace: "nowrap",
            fontSize: txtSize ? `${txtSize / 16}rem` : "0.938rem",
            color: txtColor,
            transition: "0.1s ease-in-out",
            backgroundColor,
            borderRadius: borderRadius,
            opacity,
            ...viewT,
            ...FlexT,
            ...spaceT,
            ...borderT,
            ...cursorT,

            "&:disabled": { color: disabledColor ?? "#ccc", cursor: "default" },
            "&:active": { opacity: touchOpacity ?? 0.7 },
          }}
          {...rest}
        >
          {props.children}
        </button>
      )}

      {as === "a" && (
        <Link
          href={props.href}
          css={{
            position: "relative",
            whiteSpace: "nowrap",
            fontSize: txtSize ? `${txtSize / 16}rem` : "0.938rem",
            color: txtColor,
            transition: "0.1s ease-in-out",
            backgroundColor,
            borderRadius: borderRadius,
            opacity,
            ...viewT,
            ...FlexT,
            ...spaceT,
            ...borderT,
            ...cursorT,

            "&:disabled": { color: disabledColor ?? "#ccc", cursor: "default" },
            "&:active": { opacity: touchOpacity ?? 0.7 },
          }}
          {...rest}
        >
          {props.children}
        </Link>
      )}
    </>
  );
}
