import React from "react";
import { NextRouter, useRouter } from "next/router";

import SEO from "@/seo.config";
import { Button, V, Spacing, Txt } from "@/_ui";
import { MQ, colors, fontSize } from "@/libs/themes";

//
export default function Error() {
  const router: NextRouter = useRouter();

  return (
    <>
      <SEO title="페이지를 찾을 수 없습니다" />
      <V.Section flex={1} height="100%">
        <V.Container
          flex={1}
          minHeight="100vh"
          height="100%"
          padding={{ all: 26 }}
          crossAlign="center"
          align="center"
        >
          <Txt as="h4" css={{ [MQ[3]]: { fontSize: fontSize.s26 } }}>
            페이지를 찾을 수 없습니다
          </Txt>
          <Spacing size={12} />
          <Txt as="p" css={{ color: colors.grey500 }}>
            아래 버튼을 통해 이전페이지로 이동하세요
          </Txt>

          <Spacing size={24} />
          <Button
            buttonColor={colors.keyColor}
            txtColor={colors.white}
            borderRadius={14}
            onClick={() => router.back()}
          >
            뒤로가기
          </Button>
        </V.Container>
      </V.Section>
    </>
  );
}
