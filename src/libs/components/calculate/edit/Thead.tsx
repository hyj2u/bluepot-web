import { V } from "@/_ui";
import { Interpolation, Theme } from "@emotion/react";
import { findTh } from ".";

//
export default function Thead() {
  return (
    <V.Row>
      <V.Container css={titleTheme}>매장명</V.Container>

      {/* 상품 매출액 */}
      <V.Column width="auto">
        <V.Container maxWidth={318} css={categoryTheme}>
          상품매출액
        </V.Container>
        <V.Row>
          <V.Container css={thTheme}>현금</V.Container>
          <V.Container css={thTheme}>세금계산서</V.Container>
          <V.Container css={thTheme}>신용(체크카드)</V.Container>
        </V.Row>
      </V.Column>

      {/* 매출원가 */}
      <V.Column width="auto">
        <V.Container maxWidth={954} css={categoryTheme}>
          매출원가
        </V.Container>
        <V.Row>
          {findTh("b1rent") && <V.Container css={thTheme}>임대료</V.Container>}
          {findTh("b1maint") && <V.Container css={thTheme}>관리비</V.Container>}
          {findTh("b1electricity") && (
            <V.Container css={thTheme}>전기요금</V.Container>
          )}
          {findTh("b1gas") && <V.Container css={thTheme}>도시가스</V.Container>}
          {findTh("b1internet") && (
            <V.Container css={thTheme}>인터넷</V.Container>
          )}
          {findTh("b1etcExpense") && (
            <V.Container css={thTheme}>기타경비</V.Container>
          )}
          {findTh("b2charge") && (
            <V.Container css={thTheme}>수수료</V.Container>
          )}
          {findTh("b3etc") && <V.Container css={thTheme}>기타비품</V.Container>}
          {findTh("b4initProduct") && (
            <V.Container css={thTheme}>초도물품대</V.Container>
          )}
          {findTh("b4donation") && (
            <V.Container css={thTheme}>기부금</V.Container>
          )}
          <V.Container css={thTheme}>원부자재(과세)</V.Container>
        </V.Row>
      </V.Column>

      {/* 기타제경비 */}
      <V.Column width="auto">
        <V.Container maxWidth={954} css={categoryTheme}>
          기타제경비
        </V.Container>
        <V.Row>
          <V.Container css={thTheme}>카드수수료</V.Container>
          <V.Container css={thTheme}>전기요금</V.Container>
          {findTh("c1rent") && <V.Container css={thTheme}>관리비</V.Container>}
          {findTh("c1water") && (
            <V.Container css={thTheme}>수도요금</V.Container>
          )}
          {findTh("c1gas") && <V.Container css={thTheme}>도시가스</V.Container>}
          {findTh("c1insurance") && (
            <V.Container css={thTheme}>배상책임보험</V.Container>
          )}
          {findTh("c1etcExpense") && (
            <V.Container css={thTheme}>기타경비</V.Container>
          )}
          {findTh("c2interestCost") && (
            <V.Container css={thTheme}>이자비용</V.Container>
          )}
        </V.Row>
      </V.Column>

      {/* 매출이익 */}
      <V.Column width="auto">
        <V.Container maxWidth={954} css={categoryTheme}>
          미지급/선수금
        </V.Container>
        <V.Row>
          <V.Container css={thTheme}>원부자재(면세)</V.Container>
          {findTh("d1storeMaint") && (
            <V.Container css={thTheme}>매장관리비</V.Container>
          )}
          {findTh("d1carryover") && (
            <V.Container css={thTheme}>전월이월금</V.Container>
          )}
          {findTh("d2cash") && (
            <V.Container css={thTheme}>현금매출</V.Container>
          )}
          {findTh("d3rent") && <V.Container css={thTheme}>임대료</V.Container>}
          {findTh("d3initProduct") && (
            <V.Container css={thTheme}>초도물품대</V.Container>
          )}
          {findTh("d4donation") && (
            <V.Container css={thTheme}>기부금</V.Container>
          )}
        </V.Row>
      </V.Column>
    </V.Row>
  );
}

//
// themes
const titleTheme = {
  maxWidth: 180,
  minWidth: 180,
  minHeight: 72,
  maxHeight: 72,
  padding: 8,
  backgroundColor: "#f8f8f8",
  alignItems: "center",
  justifyContent: "center",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
  fontSize: "0.813rem",
  color: "#666",
} as Interpolation<Theme>;

const categoryTheme = {
  minHeight: 36,
  maxHeight: 36,
  padding: 8,
  backgroundColor: "#f8f8f8",
  alignItems: "center",
  justifyContent: "center",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
  fontSize: "0.813rem",
  color: "#666",
};

const thTheme = {
  maxWidth: 106,
  minWidth: 106,
  minHeight: 36,
  maxHeight: 36,
  padding: 8,
  backgroundColor: "#f8f8f8",
  alignItems: "center",
  justifyContent: "center",
  borderRight: "1px solid #e2e2e2",
  borderBottom: "1px solid #e2e2e2",
  fontSize: "0.813rem",
  color: "#666",
};
