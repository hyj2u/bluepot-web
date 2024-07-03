import { Interpolation, Theme } from "@emotion/react";

export default function Thead() {
  return (
    <thead css={{ width: "100%" }}>
      <tr>
        <th rowSpan={2} css={titleTheme} id="storeName">
          매장명
        </th>

        <th rowSpan={2} css={titleTheme} id="storeName">
          브랜드명
        </th>

        <th colSpan={2} css={thTheme}>
          물류
        </th>
        <th colSpan={1} css={thTheme}>
          웨이브포스
        </th>
        <th colSpan={4} css={thTheme}>
          머니온
        </th>
        <th colSpan={3} css={thTheme}>
          페이코
        </th>

        <th rowSpan={2} css={tdTheme}>
          시크릿오더
        </th>

        <th rowSpan={2} css={tdTheme}>
          한전
        </th>

        <th colSpan={2} css={tdTheme}>
          샘플러스
        </th>

        <th rowSpan={2} css={tdTheme}>
          카카오
        </th>
      </tr>

      <tr>
        {/* 믈류 */}
        <td css={tdTheme} id="glTaxation">
          과세
        </td>
        <td css={tdTheme}>면세</td>

        {/* 웰포스 */}
        <td css={tdTheme}>현금</td>

        {/* 머니온 */}
        <td css={tdTheme}>카드</td>
        <td css={tdTheme}>카드(백업)</td>
        <td css={tdTheme}>현금</td>
        <td css={tdTheme}>현금(백업)</td>

        {/* 페이코 */}
        <td css={tdTheme}>총주문금액</td>
        <td css={tdTheme}>결제금액</td>
        <td css={tdTheme}>페이코쿠폰</td>

        {/* 샘플러스 */}
        <td css={tdTheme}>카드</td>
        <td css={tdTheme}>현금영수증</td>
      </tr>
    </thead>
  );
}

// theme
const titleTheme = {
  padding: 8,
  minWidth: 140,
  maxWidth: 140,
  backgroundColor: "#f8f8f8",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
  fontSize: "0.825rem",
  fontWeight: "normal",
  color: "#666",
  whiteSpace: "pre-line",
} as Interpolation<Theme>;

const thTheme = {
  padding: 8,
  backgroundColor: "#f8f8f8",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
  fontSize: "0.825rem",
  fontWeight: "normal",
  color: "#666",
} as Interpolation<Theme>;

const tdTheme = {
  padding: 8,
  minWidth: 105,
  maxWidth: 105,
  backgroundColor: "#f8f8f8",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
  fontSize: "0.825rem",
  fontWeight: "normal",
  color: "#666",
  textAlign: "center",
} as Interpolation<Theme>;
