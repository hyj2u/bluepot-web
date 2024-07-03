import React, { useRef } from "react";

//libs
import Box from "./Box";
import { Divider, Input, Spacing, TouchableOpacity, TxtSpan, V } from "@/_ui";

//atoms
import { storeValuesAtom } from "@/libs/atoms/store-atom";
import { useRecoilState } from "recoil";

//hooks
import Comp3Array from "./Comp3Array";
import { colors } from "@/libs/themes";

//
//
export default function Comp3() {
  const memoRef = useRef<HTMLTextAreaElement | null>(null);
  const [isValues, setIsValues] = useRecoilState<any>(storeValuesAtom);

  //
  // 인풋 핸들러
  const handleOnChange = (e: React.ChangeEvent<any>) => {
    const { value, name } = e.target;
    setIsValues({ ...isValues, [name]: value });
  };

  return (
    <Box title="매장 및 임대현황">
      <Spacing size={10} />

      {/* // 계약 시작/종료일/임대료 */}
      <V.Column gap={10} align="center">
        {isValues?.contracts?.map((item: any) => <Comp3Array data={item} />)}

        <TouchableOpacity
          padding={{ vertical: 8, horizontal: 12 }}
          borderRadius={100}
          border={{ solid: 1, position: "all", color: colors.blue }}
          margin={{ top: 10 }}
          onClick={() =>
            setIsValues({
              ...isValues,
              contracts: [
                ...isValues.contracts,
                {
                  pkey: Math.floor(Math.random() * 100000) as any,
                  contractStartYmd: "" as any,
                  contractEndYmd: "",
                  rent: 0,
                } as any,
              ],
            })
          }
        >
          <V.Column align="center" width="auto" backgroundColor="#fff">
            <TxtSpan color={colors.blue} size={13}>
              계약 정보 추가하기
            </TxtSpan>
          </V.Column>
        </TouchableOpacity>
      </V.Column>

      <Divider size={4} color="#eee" spacing={{ vertical: 20 }} />

      <Input label="실평수">
        <Input.TextField
          placeholder="실평수를 입력하세요"
          edge={<TxtSpan>m2</TxtSpan>}
          name="storeSize"
          value={isValues.storeSize}
          onChange={handleOnChange}
        />
      </Input>

      <Spacing size={20} />

      <Input label="보증금">
        <Input.TextField
          placeholder="보증금을 입력하세요"
          edge={<TxtSpan>원</TxtSpan>}
          name="deposit"
          value={isValues.deposit}
          onChange={handleOnChange}
        />
      </Input>

      <Spacing size={20} />

      <Input label="부가세">
        <Input.TextField
          placeholder="부가세를 입력하세요"
          edge={<TxtSpan>원</TxtSpan>}
          name="vat"
          value={isValues.vat}
          onChange={handleOnChange}
        />
      </Input>

      <Spacing size={20} />

      <Input label="관리비">
        <Input.TextField
          placeholder="관리비를 입력하세요"
          edge={<TxtSpan>원</TxtSpan>}
          name="maint"
          value={isValues.maint}
          onChange={handleOnChange}
        />
      </Input>

      <Spacing size={20} />

      <Input label="영업보장">
        <Input.TextField
          placeholder="영업보장을 입력하세요"
          name="businessGuarantee"
          value={isValues.businessGuarantee}
          onChange={handleOnChange}
        />
      </Input>

      <Spacing size={20} />

      <Input label="수수료">
        <Input.TextField
          placeholder="수수료를 입력하세요"
          edge={<TxtSpan>원</TxtSpan>}
          name="charge"
          value={isValues.charge}
          onChange={handleOnChange}
        />
      </Input>

      <Spacing size={20} />

      <Input label="주요내용">
        <Input.Textarea
          ref={memoRef}
          placeholder="주요내용을 입력하세요"
          name="opeNote"
          rows={8}
          autoRaise
          value={isValues.opeNote}
          onChange={handleOnChange}
        />
      </Input>
    </Box>
  );
}
