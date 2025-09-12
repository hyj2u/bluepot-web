import React, { useState, useEffect } from "react";

// libs
import Box from "./Box";
import { CalenderModal, Input, Select, Spacing, V, Checkbox } from "@/_ui";
import { MQ } from "@/libs/themes";

// atoms
import { useRecoilState } from "recoil";
import { storeValuesAtom } from "@/libs/atoms/store-atom";

// hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getStoreBrandCdKind } from "@/_https/store";
import { useMoment } from "@/libs/hooks";
import { regEx } from "@/libs/utils/regEx";

export default function Comp1() {
  const { useQuery, queryKeys, axiosInstance } = useTanstackQuery();
  const [isValues, setIsValues] = useRecoilState(storeValuesAtom);
  const [calenderOpen, setCalenderOpen] = useState({
    openYmd: false,
    orgContractYmd: false,
    writtenContractYmd: false,
    finalContractYmd: false,
  });

  const { data: brandCd_options } = useQuery({
    queryKey: [queryKeys.store.create.brandCd, isValues.brandCd],
    queryFn: () =>
      getStoreBrandCdKind({ axiosInstance, brandCd: isValues.brandCd }),
    enabled: !!isValues.brandCd,
  });
    //donationYn 상태 확인용 useEffect
    useEffect(() => {
      console.log("💡 현재 donationYn 상태:", isValues.donationYn);
    }, [isValues.donationYn]);

  const handleOnChange = (e: React.ChangeEvent<any>) => {
    const { value, name } = e.target;
    setIsValues((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <>
      <Box title="기본정보">
        <V.Row gap={10} crossGap={20} wrap="wrap">
          <Select
            important
            name="brandCd"
            value={isValues.brandCd}
            onChange={(e) =>
              setIsValues((prev) => ({
                ...prev,
                brandCd: e.target.value,
                settlementCd: "",
              }))
            }
            label="브랜드 (필수)"
            placeholder="브랜드를 선택하세요"
            options={[
              { val: "1", key: "씨앤코" },
              { val: "2", key: "로로컴퍼니" },
              { val: "3", key: "푸드코트" },
              { val: "4", key: "버거" },
              { val: "9", key: "기타" },
            ]}
            renderItem={(item) => (
              <Select.Option value={item.val}>{item.key}</Select.Option>
            )}
          />

          {!!isValues.brandCd && isValues.brandCd !== "9" && (
            <Select
              important
              name="settlementCd"
              value={isValues.settlementCd}
              onChange={handleOnChange}
              label="정산구분 (필수)"
              placeholder="정산구분을 선택하세요"
              options={brandCd_options}
              renderItem={(item) => (
                <Select.Option value={item.code}>{item.value}</Select.Option>
              )}
            />
          )}
        </V.Row>

        <Spacing size={20} />

        <V.Row gap={10} crossGap={20} css={{ [MQ[3]]: { flexWrap: "wrap" } }}>
          <Input label="담당자 (필수)" important>
            <Input.TextField
              placeholder="담당자를 입력하세요"
              name="manager"
              value={isValues.manager}
              onChange={handleOnChange}
            />
          </Input>

          <Input label="계약자">
            <Input.TextField
              placeholder="계약자를 입력하세요"
              name="contractor"
              value={isValues.contractor}
              onChange={handleOnChange}
            />
          </Input>
        </V.Row>

        <Spacing size={20} />

        <Input label="상호명 (필수)" important>
          <Input.TextField
            placeholder="상호명을 입력하세요"
            name="storeName"
            value={isValues.storeName}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <Input label="점주명">
          <Input.TextField
            placeholder="점주명을 입력하세요"
            name="owner"
            value={isValues.owner}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <V.Row gap={10} crossGap={20} css={{ [MQ[3]]: { flexWrap: "wrap" } }}>
          <Input label="오픈일">
            <Input.Dummy
              placeholder="오픈일 선택"
              value={
                isValues.openYmd &&
                useMoment(isValues.openYmd).format("yyyy-mm-dd")
              }
              onClick={() =>
                setCalenderOpen((prev) => ({ ...prev, openYmd: true }))
              }
            />
          </Input>

          <Input label="최초 계약일">
            <Input.Dummy
              placeholder="최초 계약일 선택"
              value={
                isValues.orgContractYmd &&
                useMoment(isValues.orgContractYmd).format("yyyy-mm-dd")
              }
              onClick={() =>
                setCalenderOpen((prev) => ({ ...prev, orgContractYmd: true }))
              }
            />
          </Input>
        </V.Row>

        <Spacing size={20} />

        <V.Row gap={10} crossGap={20} css={{ [MQ[3]]: { flexWrap: "wrap" } }}>
          <Input label="서면 계약일">
            <Input.Dummy
              placeholder="계약일 선택"
              value={
                isValues.writtenContractYmd &&
                useMoment(isValues.writtenContractYmd).format("yyyy-mm-dd")
              }
              onClick={() =>
                setCalenderOpen((prev) => ({
                  ...prev,
                  writtenContractYmd: true,
                }))
              }
            />
          </Input>

          <Input label="최종 재계약">
            <Input.Dummy
              placeholder="계약일 선택"
              value={
                isValues.finalContractYmd &&
                useMoment(isValues.finalContractYmd).format("yyyy-mm-dd")
              }
              onClick={() => {
                if (!isValues.orgContractYmd)
                  alert("최초 계약일을 먼저 선택하세요");
                else
                  setCalenderOpen((prev) => ({
                    ...prev,
                    finalContractYmd: true,
                  }));
              }}
            />
          </Input>
        </V.Row>

        <Spacing size={20} />

        <V.Row gap={10} crossGap={20} css={{ [MQ[3]]: { flexWrap: "wrap" } }}>
          <Input label="은행">
            <Input.TextField
              maxLength={8}
              placeholder="은행명 입력"
              name="bank"
              value={isValues.bank}
              onChange={handleOnChange}
            />
          </Input>

          <Input label="예금주">
            <Input.TextField
              maxLength={4}
              placeholder="예금주 입력"
              name="bankAccount"
              value={isValues.bankAccount}
              onChange={handleOnChange}
            />
          </Input>

          <Input label="계좌번호">
            <Input.TextField
              type="number"
              placeholder="계좌번호 입력"
              name="bankAccountNumber"
              value={isValues.bankAccountNumber}
              onChange={handleOnChange}
            />
          </Input>
        </V.Row>

        <Spacing size={20} />

        <Input label="연락처">
          <Input.TextField
            type="number"
            maxLength={11}
            placeholder="연락처를 입력하세요"
            name="phone"
            value={isValues.phone}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <Input label="이메일">
          <Input.TextField
            type="email"
            placeholder="이메일을 입력하세요"
            name="email"
            value={isValues.email}
            onChange={handleOnChange}
            error={!!isValues.email && !regEx.email.test(isValues.email)}
            errorMessage="이메일 형식으로 입력하세요"
          />
        </Input>

        <Spacing size={20} />

        <Input label="자택 주소">
          <Input.TextField
            placeholder="주소를 전체 입력하세요"
            name="homeAdress"
            value={isValues.homeAdress}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <Input label="사업장 주소">
          <Input.TextField
            placeholder="주소를 전체 입력하세요"
            name="storeAddress"
            value={isValues.storeAddress}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <Select
          name="isp"
          value={isValues.isp}
          onChange={handleOnChange}
          label="인터넷 통신사"
          placeholder="인터넷 통신사를 선택하세요"
          options={["SK브로밴드", "KT", "LG", "기타"]}
          renderItem={(item) => (
            <Select.Option value={item}>{item}</Select.Option>
          )}
        />

        <Spacing size={20} />

        <Input label="비고">
          <Input.Textarea
            autoRaise
            rows={2}
            maxLength={30}
            name="etc"
            placeholder="비고 내용을 입력하세요"
            value={isValues.etc}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <Input label="화재보험증권번호">
          <Input.TextField
            placeholder="화재보험증권번호를 입력하세요"
            name="fireInsurance"
            value={isValues.fireInsurance}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />

        <Input label="재난배상책임보험 증권번호">
          <Input.TextField
            placeholder="재난배상책임보험 증권번호를 입력하세요"
            name="disasterInsurance"
            value={isValues.disasterInsurance}
            onChange={handleOnChange}
          />
        </Input>

        <Spacing size={20} />
        <V.Row align="center" gap={10}>
          <Checkbox
            label={{ title: "기부금 대상 여부" }}
            checked={(isValues.donationYn ?? "N") === "Y"}
            onChange={() =>
              setIsValues((prev) => ({
                ...prev,
                donationYn: (prev.donationYn ?? "N") === "Y" ? "N" : "Y",
              }))
            }
          />
        </V.Row>
      </Box>

      {/* 달력 모달들 */}
      <CalenderModal
        open={calenderOpen.openYmd}
        onCancel={() =>
          setCalenderOpen((prev) => ({ ...prev, openYmd: false }))
        }
        date={isValues.openYmd ? new Date(isValues.openYmd) : ("" as any)}
        onClick={(date) => {
          setIsValues((prev) => ({ ...prev, openYmd: date }));
          setCalenderOpen((prev) => ({ ...prev, openYmd: false }));
        }}
      />

      <CalenderModal
        open={calenderOpen.orgContractYmd}
        onCancel={() =>
          setCalenderOpen((prev) => ({ ...prev, orgContractYmd: false }))
        }
        date={
          isValues.orgContractYmd
            ? new Date(isValues.orgContractYmd)
            : ("" as any)
        }
        onClick={(date) => {
          setIsValues((prev) => ({ ...prev, orgContractYmd: date }));
          setCalenderOpen((prev) => ({ ...prev, orgContractYmd: false }));
        }}
      />

      <CalenderModal
        open={calenderOpen.writtenContractYmd}
        onCancel={() =>
          setCalenderOpen((prev) => ({ ...prev, writtenContractYmd: false }))
        }
        date={
          isValues.writtenContractYmd
            ? new Date(isValues.writtenContractYmd)
            : ("" as any)
        }
        onClick={(date) => {
          setIsValues((prev) => ({ ...prev, writtenContractYmd: date }));
          setCalenderOpen((prev) => ({
            ...prev,
            writtenContractYmd: false,
          }));
        }}
      />

      <CalenderModal
        open={calenderOpen.finalContractYmd}
        onCancel={() =>
          setCalenderOpen((prev) => ({ ...prev, finalContractYmd: false }))
        }
        date={
          isValues.finalContractYmd
            ? new Date(isValues.finalContractYmd)
            : ("" as any)
        }
        minDate={new Date(isValues.orgContractYmd) as any}
        onClick={(date) => {
          setIsValues((prev) => ({ ...prev, finalContractYmd: date }));
          setCalenderOpen((prev) => ({ ...prev, finalContractYmd: false }));
        }}
      />
    </>
  );
}
