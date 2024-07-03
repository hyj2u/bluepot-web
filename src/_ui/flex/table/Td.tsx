/** @jsxImportSource @emotion/react */
import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { SpaceTheme, SpaceType } from "../../_themes/space";
import { FlexTheme, FlexType } from "../../_themes/flex";
import { ViewportTypes } from "../../_themes/viewport";
import { BorderTheme, BorderType } from "../../_themes/border";
import { ShadowTheme, ShadowType } from "../../_themes/boxShadow";
import { CursorTheme, CursorType } from "../../_themes/cursor";

interface Props
  extends Omit<React.HTMLAttributes<HTMLTableCellElement>, "align">,
    ViewportTypes,
    FlexType,
    SpaceType,
    BorderType,
    ShadowType,
    CursorType {
  children?: ReactNode;
  borderRadius?: number | string;
  backgroundColor?: string;
  transitionTime?: number;
  ellipsis?: { ellipsis?: boolean; line?: number; width?: number };
  txtSize?: number;
  txtColor?: string;
  lineHeight?: number;
  txtAlign?: "start" | "end" | "center";
  txtWeight?: "lighter" | "normal" | "medium" | "bold";
  whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line";
  underline?: boolean;
}

const Td = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLTableCellElement>) => {
    const { align, ...restProps } = props;
    const { ellipsis = { ellipsis: false } } = props;

    const [os, setOs] = useState<"window" | "mac">("window");

    useEffect(() => {
      if (/Macintosh|iPhone|iPad|iPod/.test(navigator.userAgent)) setOs("mac");
      else if (/Windows|Android/.test(navigator.userAgent)) setOs("window");
      else setOs("window");
    }, [os]);

    const FlexT = FlexTheme({
      flex: props.flex,
      direction: props.direction ?? "horizontal",
      align: props.align,
      crossAlign: props.crossAlign,
      wrap: props.wrap,
      gap: props.gap,
      crossGap: props.crossGap,
      basis: props.basis,
      grow: props.grow,
      shrink: props.shrink,
    });
    const spaceT = SpaceTheme({ padding: props.padding, margin: props.margin });
    const borderT = BorderTheme({ border: props.border });
    const shadowT = ShadowTheme({ shadow: props.shadow });
    const cursorT = CursorTheme({
      cursor: props.cursor,
      onClick: props.onClick,
    });

    const TYPOGRAPH_WEIGHT = {
      lighter: { fontWeight: os === "window" ? "300" : "400" },
      normal: { fontWeight: 400 },
      medium: { fontWeight: os === "window" ? "500" : "600" },
      bold: { fontWeight: os === "window" ? "600" : "700" },
    } as const;

    const ellipsisT = {
      maxWidth: ellipsis.width ?? "auto",
      display: "-webkit-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: ellipsis.line,
    } as any;

    return (
      <td
        ref={ref}
        css={{
          zIndex: props.zIndex,
          width: props.width,
          minWidth: props.minWidth,
          maxWidth: props.maxWidth,
          height: props.height,
          minHeight: props.minHeight,
          maxHeight: props.maxHeight,

          position: "relative",
          backgroundColor: props.backgroundColor,
          borderRadius: props.borderRadius,
          transition: `${props.transitionTime ?? 0}s ease-in-out`,

          fontWeight: TYPOGRAPH_WEIGHT[props.txtWeight ?? "normal"].fontWeight,
          fontSize: `${(props.txtSize ?? 15) / 16}rem`,
          whiteSpace: ellipsis.ellipsis ? "normal" : props.whiteSpace,
          color: props.txtColor,
          lineHeight: props.lineHeight,
          textAlign: props.txtAlign ?? "start",
          textDecoration: props.underline && "underline",
          ...(!ellipsis.ellipsis && spaceT),
          ...(ellipsis.ellipsis && ellipsisT),

          ...FlexT,
          ...borderT,
          ...shadowT,
          ...cursorT,
        }}
        {...restProps}
      >
        {props.children}
      </td>
    );
  }
);

export { Td };
