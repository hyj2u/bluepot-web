import React from "react";
import { TouchableOpacity } from "../tab/TouchableOpacity";

type Props = {
  value: any;
  onClick?: () => void;
  placeholder: string;
};

export default function Dummy({ placeholder, value, onClick }: Props) {
  return (
    <TouchableOpacity
      width="100%"
      minHeight={50}
      maxHeight={50}
      padding={{ all: 13 }}
      borderRadius={14}
      border={{ solid: 1, position: "all", color: "#e2e2e2" }}
      onClick={onClick}
      backgroundColor="#fff"
      txtColor={value ? "#555" : "#c2c2c2"}
      txtSize={15}
    >
      {value ? value : placeholder}
    </TouchableOpacity>
  );
}
