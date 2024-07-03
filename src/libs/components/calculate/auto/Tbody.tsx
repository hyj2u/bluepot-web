import { useCurrencyPrice } from "@/libs/hooks";
import { Interpolation, Theme } from "@emotion/react";

export default function Tbody({ data }: { data: any }) {
  return (
    <tr>
      <td headers="storeName" className="매장명" css={titleTheme}>
        {data?.storeName}
      </td>

      <td css={tdTheme} headers="brandName" className="브랜드명">
        {data?.brandName}
      </td>

      <td css={tdTheme} headers="glTaxation" className="물류_과세">
        {useCurrencyPrice(data?.glTaxation)}
      </td>

      <td css={tdTheme} className="물류_면세">
        {useCurrencyPrice(data?.glTaxExemption)}
      </td>

      <td css={tdTheme} className="웰포스_현금">
        {useCurrencyPrice(data?.wpCash)}
      </td>

      <td css={tdTheme} className="머니온_카드">
        {useCurrencyPrice(data?.moCard)}
      </td>

      <td css={tdTheme} className="머니온_카드백업">
        {useCurrencyPrice(data?.moCardBackup)}
      </td>

      <td css={tdTheme} className="머니온_현금">
        {useCurrencyPrice(data?.moCashReceipt)}
      </td>

      <td css={tdTheme} className="머니온_현금백업">
        {useCurrencyPrice(data?.moCashReceiptBackup)}
      </td>

      <td css={tdTheme} className="페이코_총주문금액">
        {useCurrencyPrice(data?.pcTotalAmount)}
      </td>

      <td css={tdTheme} className="페이코_결제금액">
        {useCurrencyPrice(data?.pcPoint)}
      </td>

      <td css={tdTheme} className="페이코_쿠폰">
        {useCurrencyPrice(data?.pcCoupon)}
      </td>

      <td css={tdTheme} className="시크릿오더">
        {useCurrencyPrice(data?.boTotalSales)}
      </td>

      <td css={tdTheme} className="한전">
        {useCurrencyPrice(data?.kcElecCharge)}
      </td>

      <td css={tdTheme} className="샘플러스_카드">
        {useCurrencyPrice(data?.spCard)}
      </td>

      <td css={tdTheme} className="샘플러스_현금영수증">
        {useCurrencyPrice(data?.spCashReceipt)}
      </td>

      <td css={tdTheme} className="카카오">
        {useCurrencyPrice(data?.kaKakaoCard)}
      </td>
    </tr>
  );
}

const titleTheme = {
  padding: "10px 8px",
  minWidth: 140,
  maxWidth: 140,
  backgroundColor: "#fff",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
  fontSize: "0.825rem",
  fontWeight: "normal",
  color: "#555",
  whiteSpace: "pre-line",
} as Interpolation<Theme>;

const tdTheme = {
  padding: "10px 8px",
  minWidth: 105,
  maxWidth: 105,
  backgroundColor: "#fff",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
  fontSize: "0.825rem",
  fontWeight: "normal",
  color: "#555",
  textAlign: "center",
} as Interpolation<Theme>;
