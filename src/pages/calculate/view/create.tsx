import { useRouter } from "next/router";

//libs
import { Button, LoadingLayer, P, Spacing, V } from "@/_ui";

//components
import { Title, View } from "@/libs/components/app";
import TitleFields from "@/libs/components/calculate/view-create/TitleFields";

//hooks
import { useMoment } from "@/libs/hooks";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { Coast, Orther } from "@/libs/components/calculate/view-detail";
import { createDetailView } from "@/_https/calculate/view";
import { useJenga } from "@/_ui/JengaProvider";

//atoms
import { viewDetailAtom, viewDetailOpions } from "@/libs/atoms/calculate/view";
import { useRecoilValue } from "recoil";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useEffect } from "react";

//
export default function Create() {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  useEffect(() => {
    if (appUserStatus.rool === "ROLE_USER") router.back();
    else return;
  }, [appUserStatus.rool]);

  const router = useRouter();
  const { addToast } = useJenga();
  const { queryKeys, useMutation, axiosInstance } = useTanstackQuery();
  const optionValue = useRecoilValue(viewDetailOpions);
  const detailData = useRecoilValue(viewDetailAtom);

  // console.log(optionValue);

  // const payloadValue = (val: any) => {
  //   if (!!isValues?.[val as keyof typeof isValues]) {
  //     return isValues?.[val as keyof typeof isValues];
  //   } else return null;
  // };

  type SettlementTotalType = any;

  const processSettlementTotal = (
    settlementTotal: SettlementTotalType
  ): SettlementTotalType => {
    return Object.entries(settlementTotal).reduce(
      (acc: SettlementTotalType, [key, value]) => {
        acc[key as keyof SettlementTotalType] = !!value ? value : null;
        return acc;
      },
      {} as SettlementTotalType
    );
  };

  const { mutate: onCreate, isLoading: updateLoading } = useMutation({
    mutationFn: () =>
      createDetailView({
        axiosInstance,
        values: {
          settlementTotal: {
            settlementYmd:
              useMoment("").previousMonth("yyyy-mm") + "-01T00:00:00.000+00:00",
            ...optionValue,
            ...processSettlementTotal(detailData.settlementTotal),
          },
          extraSupplies: detailData.extraSupplies,
        },
      }),
    onSuccess: (data) => {
      addToast({
        title: "정산서가 추가되었습니다",
      });
      router.back();
      console.log("정산서 추가완료", data);
    },
    onError: (err) => {
      addToast({
        status: "failed",
        title: "정산서 추가를 실패하였습니다",
        description: "입력된 값을 다시 한번 확인해주세요",
      });
      console.log("정산서 추가 실패", err);
    },
  });

  const handleOnCreate = () => {
    const shouldDisableButton = detailData.extraSupplies.some((supply: any) => {
      return (
        supply.item === "" ||
        supply.item === null ||
        supply.unitPrice === "" ||
        supply.quantity === "" ||
        supply.unitPrice === 0 ||
        supply.quantity === 0
      );
    });

    if (shouldDisableButton)
      addToast({
        status: "failed",
        title: "기타비품을 확인하세요",
        description:
          "품목을 입력하지 않았거나,\n단가 또는 수량이 0은 아닌지 확인해주세요",
      });
    else onCreate();
  };

  return (
    <>
      <View>
        <Title as={useMoment("").previousMonth("yyyy년mm월") + " 신규등록"} />

        <Spacing size={30} />

        <TitleFields />

        <Spacing size={60} />

        <V.ScrollDragHorizontal>
          <V.Column
            align="start"
            gap={50}
            css={{ "@media print": { padding: "20px 10px" } }}
          >
            <Coast />
            <Orther />
          </V.Column>
        </V.ScrollDragHorizontal>

        {/* // 정산서 수정 */}
        <P.BottomFixed height={80} padding={{ horizontal: 20 }}>
          <V.Container align="center">
            <Button
              width="100%"
              maxWidth={400}
              borderRadius={100}
              disabled={(optionValue.storeCode && optionValue.storeName) === ""}
              onClick={handleOnCreate}
            >
              정산서 등록
            </Button>
          </V.Container>
        </P.BottomFixed>
      </View>

      {updateLoading && <LoadingLayer />}
    </>
  );
}

Create.auth = true;
