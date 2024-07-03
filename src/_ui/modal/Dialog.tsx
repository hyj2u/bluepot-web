/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useRef, HTMLAttributes } from "react";

import { Button, Txt, IconTab, BlurLayer, V, P } from "../index";
import { colors } from "@/libs/themes";

interface Props extends HTMLAttributes<HTMLElement> {
  theme?: "light" | "dark";
  open: boolean;
  onCancel: () => void;
  dialogSizes?: number;
  title: string;
  description?: string;
  tabSpaceGap?: number;
  tabSpaceTop?: number;
  tabs?:
    | {
        name: string;
        buttonColor?: string;
        txtColor?: string;
        onClick?: () => void;
      }[]
    | undefined;
}

export function Dialog(props: Props) {
  const { theme = "light", dialogSizes = 340, open, onCancel } = props;
  const { title, description, tabs, tabSpaceGap = 5, tabSpaceTop } = props;
  const ref = useRef<HTMLDivElement>(null);

  const THEME_VARIANT = {
    light: {
      bg: "#fff",
      titleColor: "#555",
      txtColor: "#999",
      cancelColor: "#ccc",
    },
    dark: {
      bg: "#222",
      titleColor: "#e2e2e2",
      txtColor: "#999",
      cancelColor: "#555",
    },
  };

  // 외부 모달 닫기
  const clickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(event.target as Node))
        onCancel();
    },
    [open, onCancel]
  );

  useEffect(() => {
    if (open) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";

    document.addEventListener("mousedown", clickModalOutside);
    return () => document.removeEventListener("mousedown", clickModalOutside);
  }, [open]);

  return (
    <>
      {open && <BlurLayer />}

      <P.Fixed
        zIndex={10000}
        align="center"
        crossAlign="center"
        width="100%"
        height="100%"
        padding={{ all: 20 }}
        position={{
          top: open ? 0 : ("120%" as any),
          bottom: 0,
          left: 0,
          right: 0,
        }}
        transitionTime={0.3}
      >
        <V.Container
          maxWidth={dialogSizes}
          minWidth={320}
          padding={{ horizontal: 18, top: 26, bottom: 16 }}
          align="start"
          borderRadius={20}
          backgroundColor={THEME_VARIANT[theme].bg}
          ref={ref}
          {...props}
        >
          <Txt as="b" size={20} color={THEME_VARIANT[theme].titleColor}>
            {title}
          </Txt>

          <Txt
            size={15}
            margin={{ top: 10 }}
            color={THEME_VARIANT[theme].txtColor}
          >
            {description}
          </Txt>

          {tabs?.length !== 0 && !!tabs && (
            <V.Row gap={tabSpaceGap} margin={{ top: tabSpaceTop ?? 18 }}>
              {tabs?.map((item: any) => (
                <Button
                  minHeight={52}
                  width="100%"
                  type="button"
                  onClick={() => item.onClick()}
                  buttonColor={item?.buttonColor ?? colors.keyColor}
                  txtColor={item?.txtColor ?? "#fff"}
                >
                  {item?.name}
                </Button>
              ))}
            </V.Row>
          )}

          <P.Absolute position={{ top: 4, right: 4 }}>
            <IconTab onClick={onCancel}>
              <CancelIcon fill={THEME_VARIANT[theme].cancelColor} />
            </IconTab>
          </P.Absolute>
        </V.Container>
      </P.Fixed>
    </>
  );
}

// ----------------------------------
// -------------- Icon --------------
// ----------------------------------
function CancelIcon({ fill = "#ccc" }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 26 26"
    >
      <path
        id="xIcon"
        d="M26.334,7.95a13,13,0,1,0,0,18.384,13,13,0,0,0,0-18.384M19.761,21.286l-2.619-2.619-2.621,2.621A1.079,1.079,0,0,1,13,19.761l2.621-2.621L13,14.525A1.079,1.079,0,0,1,14.526,13l2.616,2.617L19.758,13a1.076,1.076,0,0,1,1.522,1.522l-2.616,2.616,2.621,2.619-.23.23.23-.23a1.079,1.079,0,0,1-1.526,1.526"
        transform="translate(-4.141 -4.142)"
        fill={fill}
      />
    </svg>
  );
}
