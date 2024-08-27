/** @jsxImportSource @emotion/react */
import Link from "next/link";
import { useRouter } from "next/router";

//components
import { DrawerMenus } from "./Drawer";

//libs
import { AppBar, IconTab, V, TouchableOpacity, Txt } from "@/_ui";
import { MQ } from "@/libs/themes";

//assets
import { ToastIcon } from "@/libs/assets/icons";
import { Logo } from "../assets/icon-color";
import { ProfileIcon } from "../assets/icon-stroke";

//atoms
import { useRecoilState } from "recoil";
import { appDrawerAtom } from "../atoms/app-atom";

//
export default function Header() {
  const router = useRouter();
  const [isDrawer, setIsDrawer] = useRecoilState(appDrawerAtom);

  return (
    <>
      <AppBar serviceName="점주용정산시스템">
        <V.Row
          align="center"
          height="100%"
          crossAlign="space-between"
          padding={{ horizontal: 20 }}
          css={{ transition: "0s" }}
        >
          <V.Row width="auto">
            <Link
              href="/"
            >
            </Link>
          </V.Row>

          <V.Row width="auto" gap={10}>
            <TouchableOpacity onClick={() => router.push("/mypage")}>
              <IconTab>
                <ProfileIcon />
              </IconTab>

              <Txt
                color="#999"
                size={14}
                css={{ display: "flex", [MQ[0]]: { display: "none" } }}
              >
                마이페이지
              </Txt>
            </TouchableOpacity>

            <IconTab
              onClick={() => setIsDrawer(!isDrawer)}
              css={{ display: "none", [MQ[0]]: { display: "flex" } }}
            >
              <ToastIcon fill="#666666" width="24px" height="24px" />
            </IconTab>
          </V.Row>
        </V.Row>
      </AppBar>

      {/* 드로어 메뉴 */}
      <DrawerMenus />
    </>
  );
}
