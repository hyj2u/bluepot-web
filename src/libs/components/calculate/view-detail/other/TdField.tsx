import React, { ChangeEvent, useEffect, useState } from "react";
import { viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useRecoilState } from "recoil";
import { GlobalInputTheme } from "@/_ui/_themes/input";

export default function TdField({
  value,
  type,
  valKey,
  pkey,
  numberType = "float",
}: {
  value: any;
  type?: "note";
  numberType?: "double" | "float";
  valKey: string;
  pkey: string | number;
}) {
  const inputTheme = GlobalInputTheme() as any;
  const [tData, setTData] = useRecoilState(viewDetailAtom);
  const { extraSupplies } = tData;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // 값이 숫자인 경우 통화 형식으로 초기화, 그렇지 않은 경우 일반 텍스트로 초기화
    if (type !== "note") {
      if (numberType === "double") setInputValue(value);
      else setInputValue(useCurrencyPrice(value));
    } else {
      setInputValue(value);
    }
  }, [value, type, numberType]);
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value: newValue, name } = e.target;

    //숫자, 소수점, 음수 기호만 허용하는 정규식
    const regex = /^-?\d*\.?\d*$/;

    if (type !== "note" && regex.test(newValue)) {
      const numericValue = newValue.replace(/[^\d-.]/g, "");
      const formattedValue = numericValue ? parseFloat(numericValue) : 0;
      if (numberType === "double") setInputValue(newValue);
      else setInputValue(useCurrencyPrice(formattedValue));

      const updatedExtraSupplies = tData.extraSupplies.map((item: any) =>
        item.pkey === pkey ? { ...item, [name]: formattedValue } : item
      );

      setTData({ ...tData, extraSupplies: updatedExtraSupplies });
    } else if(type==="note"){
      setInputValue(newValue);

      const updatedExtraSupplies = tData.extraSupplies.map((item: any) =>
        item.pkey === pkey ? { ...item, [name]: newValue } : item
      );

      setTData({ ...tData, extraSupplies: updatedExtraSupplies });
    }
  };

  return (
    <>
      {type === "note" ? (
        <textarea
          rows={2}
          name={valKey}
          value={inputValue}
          onChange={handleOnChange}
          placeholder="-"
          disabled={tData.settlementTotal.closedYn === "Y"}
          maxLength={type === "note" ? 40 : 12}
          css={{
            height: "auto",
            minHeight: 60,
            maxHeight: 60,
            width: "100%",
            padding: 11,
            fontSize: 13,
            color: "#666",
            "&:hover": {
              backgroundColor:
                tData.settlementTotal.closedYn === "N" && "#f6f7fc",
            },
            "@media print": { fontSize: "11px" },
            ...inputTheme,
          }}
        />
      ) : (
        <input
          autoComplete="off"
          name={valKey}
          value={inputValue}
          disabled={tData.settlementTotal.closedYn === "Y"}
          onChange={handleOnChange}
          placeholder="-"
          maxLength={type === "note" ? 40 : 12}
          css={{
            width: "100%",
            minHeight: 60,
            maxHeight: 60,
            height: "100%",
            padding: 11,
            fontSize: 13,
            color: "#666",
            "&:hover": {
              backgroundColor:
                tData.settlementTotal.closedYn === "N" && "#f6f7fc",
            },
            "@media print": { fontSize: "11px" },
            ...inputTheme,
          }}
        />
      )}
    </>
  );
}

function useCurrencyPrice(value: any) {
  if (value === "" || value === 0) return "0";
  const sign = Math.sign(value) === -1 ? "-" : "";
  const absValue = Math.abs(value);
  const formattedValue = new Intl.NumberFormat("ko-KR", {
    style: "decimal",
  }).format(value);
  return sign + formattedValue;
}
