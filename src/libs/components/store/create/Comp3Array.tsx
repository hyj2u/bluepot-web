import { CalenderModal, Input, P, TouchableOpacity, TxtSpan, V } from "@/_ui";
import { CancelIcon } from "@/libs/assets/icons";
import { storeValuesAtom } from "@/libs/atoms/store-atom";
import { useMoment } from "@/libs/hooks";
import React, { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";

export default function Comp3Array({ data }: { data: any }) {
  const [isValues, setIsValues] = useState({
    contractStartYmd: data?.contractStartYmd ?? "",
    contractEndYmd: data?.contractEndYmd ?? "",
    rent: data?.rent ?? 0,
  });

  const [isStoreValues, setIsStoreValues] = useRecoilState(storeValuesAtom);

  const [calenderOpen, setCalenderOpen] = useState({
    contractStartYmd: false,
    contractEndYmd: false,
  });

  //
  // 핸들러
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value: newValue, name } = e.target;

    // isValues 상태 업데이트
    setIsValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));

    // isStoreValues의 contracts 배열 내 특정 객체 업데이트
    const updatedContracts = isStoreValues.contracts.map((contract: any) =>
      contract.pkey === data?.pkey
        ? { ...contract, [name]: newValue }
        : contract
    );

    // Recoil 상태 업데이트
    setIsStoreValues((prevValues: any) => ({
      ...prevValues,
      contracts: updatedContracts,
    }));
  };

  const handleOnCalender = ({
    date,
    name,
  }: {
    date: Date;
    name: "contractStartYmd" | "contractEndYmd";
  }) => {
    const updatedContracts = isStoreValues.contracts.map((contract: any) =>
      contract.pkey === data?.pkey
        ? { ...contract, [name]: useMoment(date).format("yyyy-mm-dd") }
        : contract
    );

    setIsStoreValues((prevValues: any) => ({
      ...prevValues,
      contracts: updatedContracts,
    }));
  };

  //
  // 제거
  const onRemove = () => {
    setIsStoreValues((current: any) => {
      const filteredExtraSupplies =
        current?.contracts?.filter((el: any) => el.pkey !== data?.pkey) || [];

      return {
        ...current,
        contracts: filteredExtraSupplies,
      };
    });
  };

  return (
    <>
      <V.Column
        gap={20}
        align="start"
        backgroundColor="#f8f8f8"
        padding={{ all: 16 }}
        borderRadius={12}
      >
        <Input label="계약 시작일">
          <Input.Dummy
            placeholder="계약 시작일을 선택하세요"
            value={
              isValues.contractStartYmd &&
              useMoment(isValues.contractStartYmd).format("yyyy-mm-dd")
            }
            onClick={() =>
              setCalenderOpen({ ...calenderOpen, contractStartYmd: true })
            }
          />
        </Input>

        <Input label="계약 종료일">
          <Input.Dummy
            placeholder="계약 종료일을 선택하세요"
            value={
              isValues.contractEndYmd &&
              useMoment(isValues.contractEndYmd).format("yyyy-mm-dd")
            }
            onClick={() => {
              if (!isValues.contractStartYmd)
                alert("계약 시작일을 먼저 선택하세요");
              else setCalenderOpen({ ...calenderOpen, contractEndYmd: true });
            }}
          />
        </Input>

        <Input label="임대료">
          <Input.TextField
            type="number"
            placeholder="임대료를 입력하세요"
            edge={<TxtSpan>원</TxtSpan>}
            name="rent"
            value={isValues.rent}
            onChange={handleOnChange}
          />
        </Input>

        <P.Absolute position={{ top: 8, right: 8 }}>
          <TouchableOpacity onClick={() => onRemove()}>
            <CancelIcon width="18px" fill="#aaa" />
          </TouchableOpacity>
        </P.Absolute>
      </V.Column>

      {/* // 계약 시작일 > 달력 모달 */}
      <CalenderModal
        open={calenderOpen.contractStartYmd}
        onCancel={() =>
          setCalenderOpen({ ...calenderOpen, contractStartYmd: false })
        }
        date={
          isValues.contractStartYmd
            ? new Date(isValues.contractStartYmd)
            : ("" as any)
        }
        onClick={(date) => {
          setIsValues({
            ...isValues,
            contractStartYmd: date,
            contractEndYmd: "",
          });
          handleOnCalender({ name: "contractStartYmd", date });

          setCalenderOpen({ ...calenderOpen, contractStartYmd: false });
        }}
      />

      {/* // 계약 종료일 > 달력 모달 */}
      <CalenderModal
        open={calenderOpen.contractEndYmd}
        onCancel={() =>
          setCalenderOpen({ ...calenderOpen, contractEndYmd: false })
        }
        date={
          isValues.contractEndYmd
            ? new Date(isValues.contractEndYmd)
            : ("" as any)
        }
        minDate={new Date(isValues.contractStartYmd) as any}
        onClick={(date) => {
          setIsValues({ ...isValues, contractEndYmd: date });
          handleOnCalender({ name: "contractEndYmd", date });
          setCalenderOpen({ ...calenderOpen, contractEndYmd: false });
        }}
      />
    </>
  );
}
