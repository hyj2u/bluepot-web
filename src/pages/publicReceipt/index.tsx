import { useRouter } from "next/router";
import { useRef } from "react";

//libs
import { Button, Spacing, TouchableOpacity, Txt, V } from "@/_ui";
import { View } from "@/libs/components/app";

//hooks
import { getPublicReceipt } from "@/_https/public";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { useMoment } from "@/libs/hooks";
import { BottomFixed } from "@/_ui/flex/position/BottomFixed";
import ReactToPrint from "react-to-print";
import { Coast, Order, Title } from "@/libs/components/publicReceipt";

//
export default function Index() {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement | null>(null);

  const { useQuery } = useTanstackQuery();

  const { data } = useQuery({
    queryFn: () =>
      getPublicReceipt({
        storeCode: router.query.storeCode ?? "",
        settlementYmd: router.query.settlementYmd ?? "",
      }),
    enabled: !!(router.query.storeCode && router.query.settlementYmd),
  });

  const { settlementTotal, extraSupplies } = data ?? {};

  return (
    <View
      size={1080}
      enabled={!!(router.query.storeCode && router.query.settlementYmd)}
      description="해당 URL을 다시 한번 확인해주세요"
    >
      {settlementTotal?.closedYn === "Y" && (
        <>
          <V.Column
            ref={printRef}
            css={{ "@media print": { padding: "20px 0" } }}
          >
            <Title settlementTotal={settlementTotal} />

            <Spacing size={30} />

            <Coast data={settlementTotal} />
            <Order data={extraSupplies} />
          </V.Column>

          <BottomFixed height={70} padding={{ horizontal: 20 }}>
            <ReactToPrint
              trigger={() => (
                <Button width="100%" maxWidth={160} borderRadius={100}>
                  인쇄하기
                </Button>
              )}
              content={() => printRef.current!}
            />
          </BottomFixed>
        </>
      )}

      {settlementTotal?.closedYn === "N" && (
        <V.Column
          flex={1}
          height="100%"
          align="center"
          crossAlign="center"
          gap={10}
          padding={{ all: 30 }}
          backgroundColor="#f8f8f8"
          borderRadius={10}
        >
          <Txt as="b" txtAlign="center" size={22}>
            {settlementTotal?.settlementTitle ?? "-"} <br />
            {settlementTotal?.storeName}
          </Txt>

          <Txt txtAlign="center" size={17}>
            현재 정산 중입니다...
            <br />
            추후에 다시 확인하세요
          </Txt>

          <TouchableOpacity onClick={() => router.back()} padding={{ all: 8 }}>
            뒤로가기
          </TouchableOpacity>
        </V.Column>
      )}
    </View>
  );
}

Index.auth = false;
