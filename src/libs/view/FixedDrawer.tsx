import { V, P, Txt } from "@/_ui";
import React from "react";
import { MQ } from "../themes";
import Menus from "../components/app/Menus";

export default function FixedDrawer() {
  return (
    <V.Container
      minHeight="100vh - 60px"
      minWidth={260}
      maxWidth={260}
      css={{ [MQ[0]]: { display: "none" } }}
    >
      <P.Fixed
        flex={1}
        zIndex={9000}
        width="100%"
        minWidth={260}
        maxWidth={260}
        position={{ top: 0, bottom: 0, left: 0 }}
        border={{ solid: 1, position: "right", color: "#ccc" }}
      >
        <Menus />
      </P.Fixed>
    </V.Container>
  );
}
