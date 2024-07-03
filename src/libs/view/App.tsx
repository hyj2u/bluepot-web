import React, { ReactNode, useEffect } from "react";
import { NextRouter, useRouter } from "next/router";

//atoms
import { useRecoilValue } from "recoil";
import { appUserStatusAtom } from "../atoms/auth-atom";

// Components
import Header from "./Header";
import SEO from "@/seo.config";
import { V } from "@/_ui";
import FixedDrawer from "./FixedDrawer";

// Types
type LayoutProps = {
  children: ReactNode;
};

export default function App({ children }: LayoutProps): JSX.Element {
  const router: NextRouter = useRouter();
  const appStatus = useRecoilValue(appUserStatusAtom);

  const errPath = router.pathname === "/404";

  //
  // 웹뷰, pwa 터치 스와이프 무효화
  useEffect(() => {
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) =>
      (touchStartX = e.touches[0].clientX);

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX < 30) e.preventDefault();
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <SEO />

      <div id="layout">
        {!errPath && <>{appStatus.status === "success" && <Header />}</>}
        <V.Row>
          {appStatus.status === "success" && <FixedDrawer />}
          <main>{children}</main>
        </V.Row>
      </div>
    </>
  );
}
