import { Txt, V } from "@/_ui";
import React, { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Td({ children, ...props }: Props) {
  return (
    <V.Column
      width="100%"
      height="100%"
      minWidth={160}
      maxWidth={160}
      backgroundColor="#fff"
      border={{ solid: 1, position: "bottom", color: "#e2e2e2" }}
      padding={{ horizontal: 10, vertical: 12 }}
      {...props}
    >
      {children}
    </V.Column>
  );
}

const Dot = () => (
  <V.Container
    width="auto"
    minWidth={4}
    minHeight={4}
    borderRadius={10}
    backgroundColor="#797979"
    margin={{ top: 8 }}
  />
);
