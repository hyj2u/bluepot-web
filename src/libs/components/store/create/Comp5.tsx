import React, { useMemo, useState } from "react";

//libs
import Box from "./Box";
import { CalenderModal, Input, Spacing, TouchableOpacity, Txt, V } from "@/_ui";

//atoms
import {
  storeValuesAtom,
  store_activeYn_values_atom,
  store_type_atom,
} from "@/libs/atoms/store-atom";
import { useRecoilState } from "recoil";
import { useMoment } from "@/libs/hooks";
import { MQ } from "@/libs/themes";

//
//
export default function Comp5() {
  const [storeType, setStoreType] = useRecoilState(store_type_atom);
  const type = storeType?.type ?? null;
  const [isValues, setIsValues] = useRecoilState(store_activeYn_values_atom);
  const [storeValues, setStoreValues] = useRecoilState(storeValuesAtom);
  const [openCalender, setOpenCalender] = useState(false);

  return (
    <>
      <Box>
        <Txt size={14} color="#797979">
          [선택] 폐점 또는 이관 등록 시 아래를 선택하세요
        </Txt>

        <Spacing size={16} />

        <V.Row gap={8} wrap="wrap" crossGap={8}>
          <TouchableOpacity
            css={CheckThemes(type === "폐점")}
            onClick={() => {
              setStoreValues({ ...storeValues, activeYn: "N" });
              setStoreType({ ...storeType, type: "폐점" });
            }}
          >
            ✔ ️폐점 또는 폐점 진행 중
          </TouchableOpacity>

          <TouchableOpacity
            css={CheckThemes(type === "이관")}
            onClick={() => {
              setStoreValues({ ...storeValues, activeYn: "N" });
              setStoreType({ ...storeType, type: "이관" });
            }}
          >
            ✔ ️매장 이관
          </TouchableOpacity>

          {!!type && (
            <TouchableOpacity
              css={noneCheckTheme}
              onClick={() => {
                setStoreType({ ...storeType, type: null });
                setStoreValues({ ...storeValues, activeYn: "Y" });
                setIsValues({ ...isValues, closingDesc: "", closingYmd: "" });
              }}
            >
              취소
            </TouchableOpacity>
          )}
        </V.Row>

        {!!type && (
          <V.Column align="start" margin={{ top: 30 }} gap={20}>
            <Txt as="b">{type}정보를 입력하세요</Txt>

            <Input label={type + "일"}>
              <Input.Dummy
                placeholder={type + "일을 선택하세요"}
                value={
                  !!isValues.closingYmd &&
                  useMoment(isValues.closingYmd).format("yyyy-mm-dd")
                }
                onClick={() => setOpenCalender(true)}
              />
            </Input>

            <Input label={type + "내용"}>
              <Input.Textarea
                rows={5}
                placeholder={type + "내용을 입력하세요"}
                value={isValues.closingDesc}
                onChange={(e) =>
                  setIsValues({ ...isValues, closingDesc: e.target.value })
                }
              />
            </Input>
          </V.Column>
        )}
      </Box>

      {/* // 일자 > 달력 모달 */}
      <CalenderModal
        open={openCalender}
        onCancel={() => setOpenCalender(false)}
        date={isValues.closingYmd ? new Date(isValues.closingYmd) : ("" as any)}
        onClick={(date) => {
          setIsValues({ ...isValues, closingYmd: date });
          setOpenCalender(false);
        }}
      />
    </>
  );
}

//
// theme
const CheckThemes = (type: any) => {
  return {
    width: "100%",
    padding: 14,
    minHeight: "50px",
    backgroundColor: type ? "#F8F9FC" : "#f8f8f8",
    border: type ? "1px solid #93B1CD" : "1px solid #e2e2e2",
    color: type ? "#93b1cd" : "#999",
    justifyContent: "center",
    borderRadius: 14,
  };
};

const noneCheckTheme = {
  padding: 14,
  maxWidth: "50px",
  minHeight: "50px",
  backgroundColor: "#f8f8f8",
  border: "1px solid #e2e2e2",
  color: "#999",
  justifyContent: "center",
  borderRadius: 14,
  [MQ[3]]: { maxWidth: "100%" },
};
