import React from "react";
import { IconTypeProps } from "../type";

export default function ColumnIcon({ size, fill }: IconTypeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_9_2895)">
        <rect y="1.52588e-05" width="4" height="12" fill={fill} />
        <rect x="6" y="1.52588e-05" width="4" height="12" fill={fill} />
        <rect x="12" y="1.52588e-05" width="4" height="12" fill={fill} />
        <rect y="14" width="16" height="2" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_9_2895">
          <rect width="16" height="16" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
}
