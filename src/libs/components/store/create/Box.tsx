import { Spacing, Txt, V } from "@/_ui";
import { MQ, colors } from "@/libs/themes";
import React, { ReactNode } from "react";

export default function Box({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <V.Column
      align="start"
      backgroundColor="#fff"
      border={{ solid: 1, position: "all", color: "#e2e2e2" }}
      borderRadius={22}
      padding={{ all: 30 }}
      css={{ [MQ[3]]: { padding: "24px 18px" } }}
    >
      {!!title && (
        <V.Row align="center" gap={8} padding={{ bottom: 20 }}>
          <div
            css={{ width: 3, height: 16, backgroundColor: colors.keyColor }}
          />
          <Txt as="b" size={18} color={colors.keyColor}>
            {title}
          </Txt>
        </V.Row>
      )}

      {children}
    </V.Column>
  );
}
