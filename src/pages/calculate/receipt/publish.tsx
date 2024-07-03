import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Interpolation, Theme } from "@emotion/react";

//libs
import { View } from "@/libs/components/app";
import { LoadingSpinner, TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import FlatList from "react-flatlist-ui";

//hooks
import ReactToPrint from "react-to-print";
import { useCurrencyPrice } from "@/libs/hooks";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import {
  downloadTextExcel,
  getReceiptPublish,
} from "@/_https/calculate/receipts";

//
export default function Index() {
  const router = useRouter();
  const { settlementYmd } = router?.query ?? {};
  const printRef = useRef<HTMLDivElement | null | any>(null);
  const { axiosInstance, queryKeys, useQuery, useMutation } =
    useTanstackQuery();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.receipts.publish, settlementYmd],
    queryFn: () => getReceiptPublish({ axiosInstance, settlementYmd }),
    enabled: !!settlementYmd,
  });

  const filename =
    settlementYmd?.slice(0, 4) +
    "년 " +
    settlementYmd?.slice(5, 7) +
    "월" +
    " 세금계산서 발행리스트";

  //
  // 엑셀 다운로드
  const { mutate: onExcelDownload, isLoading: downloadLoading } = useMutation({
    mutationFn: () =>
      downloadTextExcel({
        axiosInstance,
        settlementYmd,
        filename,
      }),
  });

  return (
    <View>
      <V.Container
        ref={printRef}
        maxWidth={700}
        gap={20}
        css={{ "@media print": { padding: "30px 20px 20px" } }}
      >
        <Txt as="b" size={22} css={{ "@media print": { fontSize: 16 } }}>
          {settlementYmd?.slice(0, 4)}년 {settlementYmd?.slice(5, 7)}월
          <br /> 세금계산서 발행리스트
        </Txt>

        <V.Row
          gap={8}
          padding={{ bottom: 10 }}
          css={{ "@media print": { display: "none" } }}
        >
          <TouchableOpacity
            backgroundColor="#E1EAF2"
            txtColor="#7FA7CA"
            css={themes.tab}
            onClick={() => router.back()}
          >
            목록으로
          </TouchableOpacity>

          <TouchableOpacity
            onClick={() => onExcelDownload()}
            backgroundColor="#4A9BFA"
            txtColor="#fff"
            css={themes.tab}
          >
            엑셀 다운로드 {downloadLoading && "중 ..."}
          </TouchableOpacity>
        </V.Row>

        <FlatList
          data={data}
          loading={isLoading}
          ListLoadingComponent={<LoadingSpinner />}
          keyExtractor={(i) => i}
          renderItem={(item) => (
            <V.Column
              gap={12}
              padding={{ all: 18 }}
              borderRadius={16}
              backgroundColor="#f8f8f8"
            >
              <Txt as="b" size={17} css={{ "@media print": { fontSize: 14 } }}>
                {useCurrencyPrice(item.settlementAmount)}원 발행
              </Txt>

              <V.Row gap={6} width="auto" wrap="wrap">
                <TxtSpan
                  color="#666"
                  size={14}
                  css={{ "@media print": { fontSize: 12 } }}
                >
                  {item?.brandName} | {item?.storeName ?? "-"} 지점
                </TxtSpan>
                <TxtSpan size={14}>|</TxtSpan>
                <TxtSpan
                  color="#666"
                  size={14}
                  css={{ "@media print": { fontSize: 12 } }}
                >
                  {item?.owner ?? "-"} 점장
                </TxtSpan>
              </V.Row>
            </V.Column>
          )}
        />
      </V.Container>
    </View>
  );
}

Index.auth = true;

//
const themes = {
  tab: {
    padding: "12px 16px",
    borderRadius: 12,
    fontSize: 14,
  } as Interpolation<Theme>,
} as const;
