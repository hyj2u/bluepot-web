import React, { ChangeEvent, useEffect, useState } from "react";
import { printActiveAtom, viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GlobalInputTheme } from "@/_ui/_themes/input";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";

export default function TdField({
  value,
  type,
  valKey,
}: {
  value: any;
  type?: "note";
  valKey: string;
}) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const inputTheme = GlobalInputTheme() as any;
  const setPrintActive = useSetRecoilState(printActiveAtom);
  const [detailData, setDetailData] = useRecoilState(viewDetailAtom);
  const [inputValue, setInputValue] = useState(
    value || (value === 0 ? "0" : "")
  );

  useEffect(() => {
    // useEffect 내부 로직 수정
    if (type !== "note") {
      setInputValue(value || value === 0 ? useCurrencyPrice(value) : "");
    } else {
      setInputValue(value);
    }
  }, [value, type]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue, name } = e.target;
    setPrintActive(true);

    if (type !== "note") {
      // "-"만 입력된 경우를 처리하기 위한 조건 추가
      if (newValue === "-") {
        setInputValue("-");
        setDetailData({
          ...detailData,
          settlementTotal: {
            ...detailData.settlementTotal,
            [name]: 0, // "-"만 있을 경우 상태 값을 0으로 설정하지만 화면에는 "-"가 표시되도록 함
          },
        });
        return;
      }

      const filteredValue = newValue.replace(/[^\d-]/g, "");
      let formattedValue = filteredValue;

      setInputValue(formattedValue);

      const intValue = formattedValue ? parseInt(formattedValue, 10) : 0;
      if (!isNaN(intValue)) {
        setDetailData({
          ...detailData,
          settlementTotal: {
            ...detailData.settlementTotal,
            [name]: intValue,
          },
        });
      }
    } else {
      setInputValue(newValue);
      setDetailData({
        ...detailData,
        settlementTotal: {
          ...detailData.settlementTotal,
          [name]: newValue,
        },
      });
    }
  };

  return (
    <input
      autoComplete="off"
      name={valKey}
      value={inputValue}
      onChange={handleOnChange}
      disabled={
        detailData.settlementTotal.closedYn === "Y" ||
        appUserStatus.rule === "ROLE_USER"  || appUserStatus.rule === "ROLE_ACCOUNTANT"
      }
      placeholder="-"
      maxLength={type === "note" ? 40 : 12}
      css={{
        width: "100%",
        padding: 11,
        fontSize: 13,
        color: "#666",
        "&:hover": {
          backgroundColor:
            detailData.settlementTotal.closedYn === "N" && "#f6f7fc",
        },
        "@media print": { fontSize: "11px" },
        ...inputTheme,
      }}
    />
  );
}

function useCurrencyPrice(value: any) {
  // 값이 0이거나 ""일 경우 0으로 포매팅
  if (value === "" || value === 0) return "0";
  const sign = Math.sign(value) === -1 ? "-" : "";
  const absValue = Math.abs(value);

  const formattedValue = new Intl.NumberFormat("ko", {
    style: "decimal",
  }).format(absValue);

  return sign + formattedValue;
}
