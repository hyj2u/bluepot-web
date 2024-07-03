import { Interpolation, Theme } from "@emotion/react";

//
export default function TheadContainer() {
  return (
    <thead css={themes.thead}>
      <tr css={themes.tr}>
        <th css={{ ...themes.th, minWidth: 100 }}>년월</th>
        <th css={{ ...themes.th, minWidth: 110 }}>매장수</th>
        <th css={{ ...themes.th, minWidth: 140 }}>입금리스트</th>
        <th css={{ ...themes.th, minWidth: 140 }}>세금계산서</th>

        <div css={{ ...themes.th, minWidth: 100 }}>총괄표</div>
      </tr>
    </thead>
  );
}

//
const themes = {
  thead: { width: "100%" } as Interpolation<Theme>,
  tr: { width: "100%" } as Interpolation<Theme>,
  th: {
    width: "auto",
    maxWidth: "auto",
    padding: 8,
    color: "#888",
    backgroundColor: "#f8f8f8",
    fontSize: 13,
    borderBottom: "1px solid #e2e2e2",
    bottomRight: "1px solid #e2e2e2",
    fontWeight: "400",
    textAlign: "center",
  } as Interpolation<Theme>,
} as Interpolation<Theme> | any;
