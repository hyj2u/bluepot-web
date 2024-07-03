import { Interpolation, Theme } from "@emotion/react";

//
export default function Thead() {
  return (
    <thead css={themes.thead}>
      <tr css={themes.tr}>
        <th css={{ ...themes.th, minWidth: 170, maxWidth: 170 }}>구분</th>
        <th css={{ ...themes.th, minWidth: 140, maxWidth: 140 }}>차변</th>
        <th css={{ ...themes.th, minWidth: 140, maxWidth: 140 }}>대변</th>
        <th colSpan={4} css={{ ...themes.th, width: "100%", minWidth: 300 }}>
          비고
        </th>
      </tr>
    </thead>
  );
}

//
const themes = {
  thead: { width: "100%" } as Interpolation<Theme>,
  tr: { width: "100%" } as Interpolation<Theme>,
  th: {
    padding: 8,
    color: "#888",
    backgroundColor: "#f8f8f8",
    fontSize: 13,
    borderBottom: "1px solid #e2e2e2",
    borderRight: "1px solid #e2e2e2",
    fontWeight: "400",
    textAlign: "center",

    "@media print": { fontSize: 12 },
  } as Interpolation<Theme>,
} as Interpolation<Theme> | any;
