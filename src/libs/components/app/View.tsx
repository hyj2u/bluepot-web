import { Txt, V } from "@/_ui";
import React, { ReactNode } from "react";
import LoadingInfoBox from "../custom/LoadingInfoBox";

export default function View({
  children,
  size = 1440,
  enabled = true,
  description,
  loading,
}: {
  children: ReactNode;
  size?: number;
  enabled?: boolean;
  description?: string;
  loading?: boolean;
}) {
  if (loading) return <LoadingInfoBox />;

  if (enabled)
    return (
      <V.Section>
        <V.Container
          align="start"
          maxWidth={size}
          padding={{ vertical: 30, horizontal: 20 }}
        >
          {children}
        </V.Container>
      </V.Section>
    );

  if (!enabled)
    return (
      <V.Container
        align="center"
        crossAlign="center"
        height="100%"
        minHeight="100vh"
        flex={1}
        maxWidth={size}
        padding={{ vertical: 30, horizontal: 20 }}
        gap={10}
      >
        <Txt size={20} weight="bold">
          정보를 불러올 수 없습니다
        </Txt>
        <Txt size={16} color="#797979">
          {description}
        </Txt>
      </V.Container>
    );

  return (
    <V.Section>
      <V.Container
        align="start"
        maxWidth={size}
        padding={{ vertical: 30, horizontal: 20 }}
      >
        {children}
      </V.Container>
    </V.Section>
  );
}