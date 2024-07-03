import { colors } from "@/libs/themes";
import { Interpolation, Theme } from "@emotion/react";
import { useCurrencyPrice } from "@/libs/hooks";

//
//
const Td = ({
  title,
  대변,
  차변,
  비고,
}: {
  title: string;
  대변?: number;
  차변?: number;
  비고?: any;
}) => {
  if (!!title)
    return (
      <tr css={{ width: "100%" }}>
        <td css={themes.td}>{title}</td>
        <td css={themes.tdVal}> {대변 && useCurrencyPrice(대변 ?? 0)}</td>
        <td css={themes.tdVal}> {차변 && useCurrencyPrice(차변 ?? 0)}</td>
        <td colSpan={4} css={themes.td}>
          {비고 ? 비고 : "-"}
        </td>
      </tr>
    );
  else null;
};

export default Td;

//
//
const themes = {
  td: {
    height: "100%",
    padding: "12px ",
    color: "#696969",
    backgroundColor: "#fff",
    fontSize: 14,
    borderBottom: "1px solid #e2e2e2",
    borderRight: "1px solid #e2e2e2",
    fontWeight: "400",
    whiteSpace: "pre-line",
    textAlign: "left",
  } as Interpolation<Theme>,

  tdVal: {
    height: "100%",
    padding: "12px ",
    color: "#696969",
    backgroundColor: "#fff",
    fontSize: 14,
    borderBottom: "1px solid #e2e2e2",
    borderRight: "1px solid #e2e2e2",
    fontWeight: "400",
    whiteSpace: "pre-line",
    textAlign: "end",
  } as Interpolation<Theme>,
};
