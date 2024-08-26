import React, { useRef } from "react";
import { useRouter } from "next/router";
import {
  LoadingLayer,
  LoadingSpinner,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtSpan,
  V,
} from "@/_ui";

//components
import { View } from "@/libs/components/app";
import {
  Description,
  Coast,
  Orther,
  Tabs,
} from "@/libs/components/calculate/view-detail";
import {
  addTableFieldsAtom,
  initialSettlementTotal,
  printActiveAtom,
  viewDetailAtom,
} from "@/libs/atoms/calculate/view";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import {
  getDetailView,
  updateClosedYn,
  updateDetailView,
} from "@/_https/calculate/view";
import { useRouteOnload } from "@/libs/hooks";
import { useJenga } from "@/_ui/JengaProvider";

//atoms
import { useRecoilState, useSetRecoilState } from "recoil";
import { colors } from "@/libs/themes";

//
export default function Index() {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement | null>(null);
  const { addToast } = useJenga();
  const { axiosInstance, useQuery, useMutation, queryKeys, queryClient } =
    useTanstackQuery();

  const [detailData, setDetailData] = useRecoilState(viewDetailAtom);
  const setPrintActive = useSetRecoilState(printActiveAtom);
  const setAddTableFields = useSetRecoilState(addTableFieldsAtom);

  //
  // 데이터 호출
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.view.detail],
    queryFn: () => getDetailView({ axiosInstance, id: router.query.id }),
    onSuccess: (data) => setDetailData(data?.data),
    enabled: !!router.query.id,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

  const { closedYn, pkey } = detailData?.settlementTotal ?? {};

  const { settlementTotal, extraSupplies } = data?.data ?? {};

  //
  // 정산서 정산완료/미정산 업데이트
  const { mutate: onUpdateClosedYn } = useMutation({
    mutationFn: () => updateClosedYn({ axiosInstance, closedYn, pkey }),
    onSuccess: (data) => {
      addToast({
        title: "정산서 업데이트 성공",
        description:
          settlementTotal?.settlementTitle + " 업데이트 성공했습니다",
      });
      queryClient.invalidateQueries([queryKeys.calculate.view.detail]);
      console.log("업데이트 성공", data);
    },
    onError: (err) => {
      addToast({
        status: "failed",
        title: "정산서 업데이트 실패",
        description: settlementTotal?.settlementTitle + " 실패 하였습니다",
      });
      console.log("업데이트 실패", err);
    },
  });

  //
  // 수정 업데이트
  const { mutate: onUpdate, isLoading: updateLoading } = useMutation({
    mutationFn: () =>
      updateDetailView({
        axiosInstance,
        id: router.query.id,
        values: detailData,
      }),
    onSuccess: (data) => {
      setPrintActive(false);
      addToast({
        title: "정산서 수정이 완료되었습니다",
        description:
          settlementTotal?.settlementTitle + " 수정 반영이 되었습니다",
      });
      queryClient.invalidateQueries([queryKeys.calculate.view.detail]);
      console.log("업데이트 성공", data);
    },
    onError: (err) => {
      addToast({
        status: "failed",
        title: "정산서 수정을 실패하였습니다",
        description: "입력된 값을 다시 한번 확인해주세요",
      });
      console.log("업데이트 실패", err);
    },
  });

  //
  // 수정 업데이트 > 벨리데이션
  const handleOnUpdate = () => {
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
    else onUpdate();
  };

  //
  // 상태초기화
  useRouteOnload(() => {
    setPrintActive(false);
    setDetailData({
      settlementTotal: initialSettlementTotal,
      extraSupplies: [],
    });
    setAddTableFields([]);
  });

  return (
    <>
      <View>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <V.Column gap={10} crossGap={14} wrap="wrap" align="center">
              <Txt as="h1" size={24}>
                {settlementTotal?.settlementTitle ?? "-"}
              </Txt>
            </V.Column>

            <Description data={settlementTotal} />

            <Spacing size={20} />

            <V.Column
              ref={printRef}
              align="start"
              gap={50}
              css={{ "@media print": { padding: "20px 10px" } }}
            >
              <Coast />
              <Orther />
            </V.Column>

            {/* // 정산서 수정 및 각종 버튼 */}
            <Tabs ref={printRef} handleOnUpdate={handleOnUpdate} />
          </>
        )}
      </View>

      {updateLoading && <LoadingLayer />}
    </>
  );
}

Index.auth = true;