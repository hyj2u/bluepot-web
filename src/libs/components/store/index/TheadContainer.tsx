import { Interpolation, Theme } from "@emotion/react";
import { useRouter } from "next/router";

//
export default function TheadContainer() {
  const router = useRouter();
  const { activeYn } = router?.query ?? {};

  return (
    <thead css={themes.thead}>
      <tr css={themes.tr}>
        <th css={{ ...themes.th, minWidth: 100 }}>브랜드</th>
        <th css={{ ...themes.th, minWidth: 200 }}>상호</th>
        <th css={{ ...themes.th, minWidth: 110 }}>계약 종료일</th>
        <th css={{ ...themes.th, minWidth: 140 }}>점주</th>
        {activeYn === "Y" ? (
          <>
            <th css={{ ...themes.th, minWidth: 100 }}>담당자</th>
            <th css={{ ...themes.th, minWidth: 150 }}>연락처</th>
            <th css={{ ...themes.th, minWidth: 240 }}>주소</th>
          </>
        ) : (
          <>
            <th css={{ ...themes.th, minWidth: 150 }}>폐점일</th>
            <th css={{ ...themes.th, minWidth: 300 }}>폐점사유</th>
          </>
        )}
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
