/** @jsxImportSource @emotion/react */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  HTMLAttributes,
} from "react";
import { BlurLayer } from "../display/BlurLayer";
import { IconTab } from "../tab/IconTab";
import { P } from "../flex/P";
import { V } from "../flex/V";
import { MQ } from "@/libs/themes";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  theme?: "light" | "dark";
  open: boolean;
  onCancel: () => void;
  modalSize?: number;
  outSideCloseActive?: boolean;
}

export const Modal = (props: Props) => {
  const {
    theme = "light",
    modalSize = 560,
    open,
    onCancel,
    outSideCloseActive = true,
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  const THEME_VARIANT = {
    light: { bg: "#fff", cancelColor: "#ccc" },
    dark: { bg: "#222", cancelColor: "#555" },
  };

  // 외부 모달 닫기
  const clickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (outSideCloseActive)
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
        zIndex={9999}
        width="100%"
        height="100%"
        position={{
          right: 0,
          left: 0,
          top: open ? 0 : ("150%" as any),
        }}
        padding={{ all: 20 }}
        align="center"
        crossAlign="center"
        transitionTime={0.3}
        css={{ [MQ[2]]: { padding: "40px 0 0", justifyContent: "start" } }}
      >
        <V.Container
          maxWidth={modalSize}
          minWidth={320}
          padding={{ horizontal: 18, top: 26, bottom: 16 }}
          borderRadius={26}
          backgroundColor={THEME_VARIANT[theme].bg}
          ref={ref}
          scroll={{ type: "auto" }}
          css={{ [MQ[2]]: { height: "100%", borderRadius: "30px 30px 0 0" } }}
          {...props}
        >
          {props.children}

          <P.Absolute position={{ top: 6, right: 6 }}>
            <IconTab onClick={onCancel}>
              <CancelIcon fill={THEME_VARIANT[theme].cancelColor} />
            </IconTab>
          </P.Absolute>
        </V.Container>
      </P.Fixed>
    </>
  );
};

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
