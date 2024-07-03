/** @jsxImportSource @emotion/react */
import React, { memo } from "react";

import { MQ } from "../themes";
import { V, Drawer } from "@/_ui";

//atoms
import { appDrawerAtom } from "../atoms/app-atom";
import { useRecoilState } from "recoil";

//components
import Menus from "../components/app/Menus";

//
export const DrawerMenus = memo(function DrawerMenus() {
  const [isDrawer, setIsDrawer] = useRecoilState(appDrawerAtom);

  return (
    <V.Container css={{ display: "none", [MQ[0]]: { display: "flex" } }}>
      <Drawer open={isDrawer} onCancel={() => setIsDrawer(false)}>
        <Menus />
      </Drawer>
    </V.Container>
  );
});
