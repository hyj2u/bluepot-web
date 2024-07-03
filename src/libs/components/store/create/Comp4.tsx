import React, { useState } from "react";

//libs
import Box from "./Box";

//atoms
import { storeValuesAtom } from "@/libs/atoms/store-atom";
import { useRecoilState } from "recoil";

//hooks
import { useMoment } from "@/libs/hooks";
import { CalenderModal, Input, Spacing } from "@/_ui";

//
//
export default function Comp4() {
  const [isValues, setIsValues] = useRecoilState(storeValuesAtom);
  const [openCalender, setOpenCalender] = useState(false);

  //
  // 인풋 핸들러
  const handleOnChange = (e: React.ChangeEvent<any>) => {
    const { value, name } = e.target;
    setIsValues({ ...isValues, [name]: value });
  };

  //
  // 임대종료일 계산

  const finalDate = () => {
    const countMonth = parseInt(isValues.prepaidMonth ?? "0", 10);

    const date = new Date(isValues.rentFromYmd);

    if (!isNaN(date.getTime())) {
      date.setMonth(date.getMonth() + countMonth);
      date.setDate(date.getDate() - 1); // 1일 감소

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const formattedMonth = month >= 10 ? month : `0${month}`;
      const formattedDay = day >= 10 ? day : `0${day}`;

      return `${year}-${formattedMonth}-${formattedDay}`;
    }

    return null;
  };

  return (
    <>
      <Box title="선납정보">
        <Spacing size={10} />

        <Input label="임대료 선납금액">
          <Input.TextField
            edge="원"
            placeholder="임대료 선납금액을 입력하세요"
            name="prepaidRent"
            value={isValues.prepaidRent}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <Input label="선납 개월수">
          <Input.TextField
            type="number"
            edge="개월"
            placeholder="선납 개월수를 입력하세요"
            name="prepaidMonth"
            value={isValues.prepaidMonth ?? 0}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <Input label="임대 시작일">
          <Input.Dummy
            placeholder="임대 시작일을 선택하세요"
            value={
              !!isValues.rentFromYmd &&
              useMoment(isValues.rentFromYmd).format("yyyy-mm-dd")
            }
            onClick={() => setOpenCalender(true)}
          />
        </Input>

        <Spacing size={20} />

        <Input label="임대 종료일">
          <Input.TextField
            disabled
            placeholder="임대 종료일입니다"
            value={
              !!(isValues.rentFromYmd && isValues.prepaidMonth)
                ? (finalDate() as any)
                : ""
            }
            tolTip="✅ 임대 시작일 + 선납 개월수로 자동 계산됩니다"
          />
        </Input>
      </Box>

      <CalenderModal
        open={openCalender}
        onCancel={() => setOpenCalender(false)}
        date={
          isValues.rentFromYmd ? new Date(isValues.rentFromYmd) : ("" as any)
        }
        onClick={(date: any) => {
          setIsValues({ ...isValues, rentFromYmd: date });
          setOpenCalender(false);
        }}
      />
    </>
  );
}
