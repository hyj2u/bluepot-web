import { useCurrencyPrice, useMoment } from "@/libs/hooks";
import { colors } from "@/libs/themes";
import { Interpolation, Theme } from "@emotion/react";
import { useRouter } from "next/router";

//
export default function TheadContainer({ data }: { data: any }) {
  const router = useRouter();

  return (
    <tbody css={themes.thead}>
      {data.map((item: any) => (
        <tr css={themes.tr}>
          <td css={{ ...themes.th, minWidth: 100 }}>
            {useMoment(item.settlementYmd).format("yyyy-mm")}
          </td>
          <td css={{ ...themes.th, minWidth: 200 }}>
            {useCurrencyPrice(item.storeCount)}
          </td>

          <td
            css={{ ...themes.th, ...themes.hover, minWidth: 140 }}
            onClick={() =>
              router.push({
                pathname: "/calculate/receipt/list",
                query: {
                  settlementYmd:
                    useMoment(item.settlementYmd).format("yyyy-mm") + "-01",
                },
              })
            }
          >
            {useCurrencyPrice(item.depositAmount)}
          </td>

          <td
            css={{ ...themes.th, ...themes.hover, minWidth: 140 }}
            onClick={() =>
              router.push({
                pathname: "/calculate/receipt/publish",
                query: {
                  settlementYmd:
                    useMoment(item.settlementYmd).format("yyyy-mm") + "-01",
                },
              })
            }
          >
            {useCurrencyPrice(item.settlementAmount)}
          </td>

          <div
            css={{ ...themes.th, ...themes.tab, ...themes.hover }}
            onClick={() =>
              router.push(
                `/calculate/receipt/${useMoment(item.settlementYmd).format("yyyy-mm") + "-01"}`
              )
            }
          >
            조회하기
          </div>
        </tr>
      ))}
    </tbody>
  );
}

//
const themes = {
  thead: { width: "100%" } as Interpolation<Theme>,
  tr: { width: "100%" } as Interpolation<Theme>,
  th: {
    width: "auto",
    maxWidth: "auto",
    padding: "12px 8px",
    height: "100%",
    color: "#666",
    backgroundColor: "#fff",
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
