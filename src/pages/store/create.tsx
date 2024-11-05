import { useRouter } from "next/router";

//libs
import { Button, LoadingSpinner, Spacing, Txt, V } from "@/_ui";
import {
  Comp1,
  Comp2,
  Comp3,
  Comp4,
  Comp5,
  Comp6,
  Comp7,
  Logic,
} from "@/libs/components/store/create";
import { MQ, colors } from "@/libs/themes";

//atoms
import { useRecoilState } from "recoil";
import {
  storeValuesAtom,
  store_activeYn_values_atom,
  store_type_atom,
} from "@/libs/atoms/store-atom";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { updateStore } from "@/_https/store";
import { FormEvent, useState } from "react";
import { useMoment } from "@/libs/hooks";
import { useJenga } from "@/_ui/JengaProvider";
import { useUid } from "@/libs/hooks/useUid";
import { BottomFixed } from "@/_ui/flex/position/BottomFixed";

//
export default function Create() {
  const { addToast } = useJenga();
  const { storeStatus, loading } = Logic();

  const router = useRouter();
  const { id } = router.query ?? {};

  const { useMutation, axiosInstance } = useTanstackQuery();

  const [isValues, setIsValues] = useRecoilState(storeValuesAtom);
  const [isActiveYnValues, setIsActiveYnValues] = useRecoilState(
    store_activeYn_values_atom
  );
  const [storeType, setStoreType] = useRecoilState(store_type_atom);
  const { storeCode } = storeType ?? {};

  //
  const payloadMoment = (val: any) => {
    let valEl = isValues?.[val as keyof typeof isValues];
    if (!!valEl) return useMoment(valEl as string).format("yyyy-mm-dd");
    else return null;
  };

  const payloadValue = (val: any) => {
    if (!!isValues?.[val as keyof typeof isValues]) {
      return isValues?.[val as keyof typeof isValues];
    } else return null;
  };

  //
  //  Contracts 핸들러
  const { contracts, ...restOfIsValues } = isValues;
  const extractedContracts = isValues.contracts.map(
    ({ contractStartYmd, contractEndYmd, rent }) => ({
      contractStartYmd: contractStartYmd
        ? useMoment(contractStartYmd).format("yyyy-mm-dd")
        : "",
      contractEndYmd: contractEndYmd
        ? useMoment(contractEndYmd).format("yyyy-mm-dd")
        : "",
      rent: !!rent ? Number(rent) : 0,
    })
  );

  //
  // 등록하기
  const { mutate: onUpdate } = useMutation({
    mutationFn: () =>
      updateStore({
        axiosInstance,
        values: {
          store: {
            storeCode,
            pkey: storeType.pkey ? storeType.pkey : null,
            ...restOfIsValues,
            ...isActiveYnValues,
            settlementCd: payloadValue("settlementCd"),
            contractor: payloadValue("contractor"),
            storeName: payloadValue("storeName"),
            owner: payloadValue("owner"),

            openYmd: payloadMoment("openYmd"),
            orgContractYmd: payloadMoment("orgContractYmd"),
            writtenContractYmd: payloadMoment("writtenContractYmd"),
            finalContractYmd: payloadMoment("finalContractYmd"),

            bank: payloadValue("bank"),
            bankAccount: payloadValue("bankAccount"),
            bankAccountNumber: payloadValue("bankAccountNumber"),
            phone: payloadValue("phone"),
            email: payloadValue("email"),
            homeAdress: payloadValue("homeAdress"),
            storeAddress: payloadValue("storeAddress"),
            isp: payloadValue("isp"), // 인터넷통신사
            etc: payloadValue("etc"), // 비고
            fireInsurance: payloadValue("fireInsurance"), // 화재보험증권번호
            disasterInsurance: payloadValue("disasterInsurance"), // 재난배상책임보험
            storeSize: payloadValue("storeSize"), // 실평수
            deposit: payloadValue("deposit"), // 보증금
            vat: payloadValue("vat"), // 부가세

            maint: payloadValue("maint"), // 관리비
            businessGuarantee: payloadValue("businessGuarantee"), // 영업보장
            charge: payloadValue("charge"), // 수수료
            openNote: payloadValue("openNote"), // 주요내용
            prepaidRent: payloadValue("prepaidRent"), // 임대로 선납금
            prepaidMonth: payloadValue("prepaidMonth"), // 선납개월수

            rentFromYmd: payloadMoment("rentFromYmd"), // 임대 시작일

            closingDesc: isActiveYnValues.closingDesc
              ? isActiveYnValues.closingDesc
              : null, // 폐점내용
            closingYmd: isActiveYnValues?.closingYmd
              ? useMoment(isActiveYnValues?.closingYmd).format("yyyy-mm-dd")
              : null,
          },
          contracts:
            extractedContracts.length === 0 ? null : extractedContracts,
        },
      }),
    onSuccess: (data) => {
      console.log("업로드 성공", data);

      if (storeType.type === null) {
        router.back();

        addToast({
          title: router.query.id
            ? "매장이 등록되었습니다"
            : "정보를 업데이트 하였습니다",
        });
      }

      if (storeType.type === "이관") {
        setStoreType({
          ...storeType,
          pkey: null,
          storeCode: useUid(),
          type: null,
        });
        setIsValues({ ...isValues, activeYn: "Y" });
        setIsActiveYnValues({
          ...isActiveYnValues,
          closingYmd: "",
          closingDesc: "",
        });

        addToast({
          title: "매장 이관을 완료했습니다",
          description: "새롭게 매장정보를 입력하세요",
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      if (storeType.type === "폐점") {
        router.back();

        addToast({ title: "해당 매장을 폐점완료했습니다" });
      }
    },
    onError: (error) => {
      console.error("업로드 에러", error);
      addToast({
        status: "failed",
        title: "해당 업데이트를 실패하였습니다",
        description: "입력한 내용을 확인해주세요",
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isDisabled =
      extractedContracts?.length > 0 &&
      extractedContracts.some(
        (contract) =>
          contract.contractStartYmd === "" || contract.contractEndYmd === ""
      );

    if (isDisabled)
      addToast({
        status: "failed",
        title: "입력 값들을 확인하세요",
        description: "계약정보는 여백으로 등록할 수 없습니다",
      });
    else onUpdate();
  };

  const disableTab =
    (isValues.storeName &&
      isValues.manager &&
      isValues.activeYn &&
      isValues.brandCd &&
      isValues.settlementCd) === "" && isValues.brandCd !== "9";

  console.error(() => {});

  // if (loading)
  //   return (
  //     <V.Section
  //       height="100%"
  //       flex={1}
  //       align="center"
  //       crossAlign="center"
  //       backgroundColor="#f8f9fc"
  //     >
  //       <V.Column
  //         gap={8}
  //         align="center"
  //         padding={{ vertical: 50, horizontal: 20 }}
  //       >
  //         <LoadingSpinner />
  //         <Txt>데이터 로딩 중 ...</Txt>
  //       </V.Column>
  //     </V.Section>
  //   );

  return (
    <V.Section height="100%" flex={1} backgroundColor="#f8f9fc">
      <V.Form
        onSubmit={onSubmit}
        flex={1}
        maxWidth={600}
        align="start"
        padding={{ top: 30, bottom: 40, horizontal: 15 }}
      >
        {storeStatus !== "N" ? (
          <Txt as="h1" size={24}>
            {(storeType.type === null && id && "매장수정") ||
              (storeType.type === null && "매장추가") ||
              (storeType.type === "폐점" && "폐점등록") ||
              (storeType.type === "이관" && "이관등록") ||
              (storeType.type === "로딩" && "데이터 가져오는 중 ...") ||
              "매장추가"}
          </Txt>
        ) : (
          <Txt as="h1" size={24}>
            해당 매장은 <br />
            폐점된 매장입니다
          </Txt>
        )}

        <Spacing size={24} />

        <V.Column align="start" gap={20}>
          <Comp1 />
          <Comp2 />
          <Comp3 />
          <Comp4 />
          {!!router.query.id && (
            <>
              <Comp5 />
              <Comp6 />
              <Comp7 />
            </>
          )}
        </V.Column>

        <Spacing size={20} />

        <BottomFixed height={80}>
          <V.Column
            align="center"
            padding={{ left: 260 }}
            css={{ [MQ[0]]: { padding: 0 } }}
          >
            <V.Row gap={10} maxWidth={600} padding={{ horizontal: 15 }}>
              <Button
                type="button"
                width="100%"
                buttonColor="#e2e2e2"
                txtColor="#999"
                onClick={() => router.back()}
              >
                목록으로
              </Button>

              {storeStatus === "N" && storeType.type === null && (
                <Button
                  type="submit"
                  width="100%"
                  buttonColor={colors.keyColor}
                  disabled={disableTab as any}
                >
                  매장 수정하기
                </Button>
              )}

              {storeStatus !== "N" && (
                <Button
                  type="submit"
                  width="100%"
                  buttonColor={
                    storeType.type === "폐점" ? colors.red : colors.keyColor
                  }
                  disabled={disableTab as any}
                >
                  {storeType.type === "이관" && "이관하기"}
                  {storeType.type === "폐점" && "폐점완료"}
                  {storeType.type === null && !storeType.pkey && "등록하기"}
                  {storeType.type === null && !!storeType.pkey && "수정하기"}
                </Button>
              )}
            </V.Row>
          </V.Column>
        </BottomFixed>
      </V.Form>
    </V.Section>
  );
}

Create.auth = true;
