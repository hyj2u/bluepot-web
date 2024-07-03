import React, {
  Children,
  ReactElement,
  TableHTMLAttributes,
  cloneElement,
} from "react";

import { Table } from "./table/Table";

interface Props extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactElement;
}

export const T = (props: Props) => {
  const child = Children.only(props.children);

  return <>{cloneElement(child, { ...child.props })}</>;
};

T.Table = Table;
