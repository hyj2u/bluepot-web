import { V, Txt } from "@/_ui";
import { Logo } from "@/libs/assets/icon-color";
import { MenusIcon } from "@/libs/assets/icon-fill";
import { appDrawerAtom } from "@/libs/atoms/app-atom";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { MQ, colors } from "@/libs/themes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Menus() {
  const router = useRouter();
  const setIsDrawer = useSetRecoilState(appDrawerAtom);
  const appStatus = useRecoilValue(appUserStatusAtom);

  const { pathname } = router;

  const activeTheme = ({ path }: { path: any }) => {
    const defaultTheme = { padding: 10, fontSize: 15 };

    return {
      ...defaultTheme,
      fontWeight: pathname === path ? 500 : 400,
      color: pathname === path ? colors.keyColor : "#666",
    };
  };

  return (
    <V.Container padding={{ all: 10 }}>
      <V.Container
        align="center"
        padding={{ bottom: 40 }}
      >
        <Txt size={20} weight="bold" color="#BF5349">
          점주용정산시스템
        </Txt>
      </V.Container>

      <V.Column gap={10}>
  

        <MenuBox title="정산관리">
          {[
            { name: "정산서 조회", a: "/calculate/view" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.a}
              onClick={() => setIsDrawer(false)}
              css={[activeTheme({ path: item.a })]}
            >
              {item.name}
            </Link>
          ))}
        </MenuBox>
      </V.Column>
    </V.Container>
  );
}

const MenuBox = ({
  title,
  children,
}: {
  title: "매장관리" | "정산관리" | "회원관리";
  children: ReactNode;
}) => {
  return (
    <V.Container
      padding={{ top: 10, left: 10, right: 10, bottom: 16 }}
      backgroundColor="#f8f8f8"
      borderRadius={14}
    >
      <V.Row align="center" gap={16} padding={{ all: 14 }}>
        <MenusIcon as={title} />
        <Txt size={16} weight="bold">
          {title}
        </Txt>
      </V.Row>

      <V.Column padding={{ left: 40 }}>{children}</V.Column>
    </V.Container>
  );
};
