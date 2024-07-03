import { useRouter } from "next/router";
import { Interpolation, Theme } from "@emotion/react";

//hooks
import { useMoment } from "@/libs/hooks";

//libs
import { colors } from "@/libs/themes";

//
export default function TbodyContainer({ data }: { data: any }) {
  const router = useRouter();
  const { activeYn } = router?.query ?? {};

  return (
    <tbody css={themes.thead}>
      {data?.map((item: any) => (
        <tr
          css={themes.tr}
          onClick={() =>
            router.push({
              pathname: `/store/create`,
              query: { id: item?.pkey },
            })
          }
        >
          <td css={{ ...themes.th, minWidth: 100 }}>
            {(item?.brandCd === "1" && "씨앤코") ||
              (item?.brandCd === "2" && "로로컴퍼니") ||
              (item?.brandCd === "3" && "푸드코트") ||
              (item?.brandCd === "4" && "버거") ||
              (item?.brandCd === "9" && "기타") ||
              item?.brandCd}
          </td>
          <td css={{ ...themes.th, minWidth: 200 }}>
            {item?.storeName ?? "-"}
          </td>

          <td css={{ ...themes.th, minWidth: 110 }}>
            {item?.contractEndYmd
              ? useMoment(item?.contractEndYmd).format("yyyy-mm-dd")
              : "-"}
          </td>

          <td css={{ ...themes.th, minWidth: 140 }}>
            {(item?.owner ?? "-") || (item?.owner === "" && "-")}
          </td>

          {activeYn === "Y" ? (
            <>
              <td css={{ ...themes.th, minWidth: 100 }}>
                {(item?.manager ?? "-") || (item?.manager === "" && "-")}
              </td>

              <td css={{ ...themes.th, minWidth: 150 }}>
                {(item?.phone ?? "-") || (item?.phone === "" && "-")}
              </td>

              <td css={{ ...themes.th, minWidth: 240, padding: "12px" }}>
                {(item?.storeAddress ?? "-") ||
                  (item?.storeAddress === "" && "-")}
              </td>
            </>
          ) : (
            <>
              <td css={{ ...themes.th, minWidth: 150 }}>
                {item?.closingYmd
                  ? useMoment(item?.closingYmd).format("yyyy-mm-dd")
                  : "-"}
              </td>
              <td
                css={{
                  ...themes.th,
                  minWidth: 300,
                  maxWidth: 300,
                  padding: "12px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {(item?.closingDesc ?? "-") ||
                  (item?.closingDesc === "" && "-")}
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
}

//
const themes = {
  thead: { width: "100%" } as Interpolation<Theme>,
  tr: {
    width: "100%",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#f8f9fc",
      cursor: "pointer",
    } as Interpolation<Theme>,
  } as Interpolation<Theme>,
  th: {
    width: "auto",
    maxWidth: "auto",
    padding: "12px 8px",
    color: "#666",
    fontSize: 14,
    borderBottom: "1px solid #e2e2e2",
    fontWeight: "400",
    textAlign: "center",
    whiteSpace: "pre-line",
  } as Interpolation<Theme>,

  tab: {
    minWidth: 100,
    color: colors.blue,
    textDecoration: "underline",
    whiteSpace: "pre-line",
  } as Interpolation<Theme>,

  hover: {
    "&:hover": {
      backgroundColor: "#f8f9fc",
      cursor: "pointer",
    } as Interpolation<Theme>,
  },
} as Interpolation<Theme> | any;
