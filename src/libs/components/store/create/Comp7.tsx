import React, { useState } from "react";
import Box from "./Box";
import {
  LoadingSpinner,
  Select,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtSpan,
  V,
} from "@/_ui";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { store_type_atom } from "@/libs/atoms/store-atom";
import { useRecoilValue } from "recoil";
import { getStoreDetailReceipts } from "@/_https/store";
import { useRouter } from "next/router";
import FlatList from "react-flatlist-ui";
import { useCurrencyPrice, useMoment } from "@/libs/hooks";
import { MQ, colors } from "@/libs/themes";

//
//
export default function Comp7() {
  const router = useRouter();
  const storeType = useRecoilValue(store_type_atom);
  const { storeCode } = storeType ?? "";

  const [year, setYear] = useState("2025");
  const { axiosInstance, useQuery, queryKeys } = useTanstackQuery();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.store.정산정보, year, storeCode],
    queryFn: () => getStoreDetailReceipts({ axiosInstance, year, storeCode }),
    enabled: !!router.query.id,
  });

  return (
    <Box title="정산정보">
      <Select
        options={["2023", "2024", "2025"]}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        renderItem={(item: string) => (
          <Select.Option value={item}>{item}</Select.Option>
        )}
      />

      <Spacing size={20} />

      <FlatList
        data={data}
        loading={isLoading}
        ListLoadingComponent={
          <V.Column align="center">
            <LoadingSpinner />
          </V.Column>
        }
        ListEmptyComponent={
          <V.Column align="center">
            <TxtSpan size={14}>정산정보가 존재하지 않습니다</TxtSpan>
          </V.Column>
        }
        keyExtractor={(item) => item.pkey}
        renderItem={(item: any) => (
          <V.Column backgroundColor="#f8f8f8" borderRadius={14}>
            <V.Column padding={{ vertical: 20, horizontal: 18 }}>
              <Txt weight="bold">
                {useMoment(item?.settlementYmd).format("yyyy-mm")} 정산
              </Txt>

              <Spacing size={20} />

              <V.Row wrap="wrap" gap={50} crossGap={12}>
                {[
                  { key: "상품매출액", val: item?.atotal },
                  { key: "매출원가", val: item?.btotal },
                  { key: "정산금액", val: item?.settlementAmount },
                  { key: "매출이익", val: item?.salesProfit },
                  { key: "정산실입금액", val: item?.depositAmount },
                ].map((item) => (
                  <V.Row
                    maxWidth={180}
                    minWidth={160}
                    gap={20}
                    crossAlign="space-between"
                    css={{ [MQ[3]]: { maxWidth: "100%" } }}
                  >
                    <TxtSpan size={14}>{item.key}</TxtSpan>
                    <TxtSpan size={14} color="#555" weight="medium">
                      {useCurrencyPrice(item?.val)}원
                    </TxtSpan>
                  </V.Row>
                ))}
              </V.Row>
            </V.Column>

            <TouchableOpacity
              width="100%"
              padding={{ all: 12 }}
              backgroundColor="#f0f0f0"
              txtColor={colors.keyColor}
              borderRadius={"0 0 14px 14px" as any}
              crossAlign="center"
              onClick={() => router.push(`/calculate/view/${item?.pkey}`)}
            >
              정산서 조회
            </TouchableOpacity>
          </V.Column>
        )}
      />
    </Box>
  );
}
