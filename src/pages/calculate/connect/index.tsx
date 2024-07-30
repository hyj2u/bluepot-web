import { V, Spacing, TouchableOpacity, TxtSpan, Txt } from "@/_ui";
//assets
import { ExcelIcon } from "@/libs/assets/icon-color";

//components
import { DragTable, Title, View } from "@/libs/components/app";
import {
  TheadContainer,
  Td,
  TdBox,
  ConnectModal,
} from "@/libs/components/calculate/connect";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { downloadTableExcel, getAllConects } from "@/_https/calculate/connect";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import { useMemo } from "react";

//
export default function Index() {
  const router = useRouter();
  const { page } = router?.query ?? {};
  const { axiosInstance, useQuery, useMutation, queryKeys } =
    useTanstackQuery();

  //
  // 테이블 가져오기
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.connect.table, page],
    queryFn: () =>
      getAllConects({ axiosInstance, page: page ? Number(page) : 1 }),
  });

  //
  // 엑셀 다운로드
  const { mutate: onExcelDownload, isLoading: downloadLoading } = useMutation({
    mutationFn: () => downloadTableExcel({ axiosInstance }),
  });

  const optimizedRelations = useMemo(() => {
    return data?.relations; // 이 부분에 최적화하고자 하는 로직을 추가합니다.
  }, [data?.relations]);

  return (
    <View loading={isLoading}>
      <Title
        as="연결관리"
        txt="(미연결매장)"
        description="좌우 터치를 통해 테이블을 확인할 수 있습니다"
      />
      <Spacing size={20} />

      <TouchableOpacity
        width="100%"
        align="center"
        crossAlign="center"
        borderRadius={10}
        padding={{ all: 12 }}
        backgroundColor="#f8f9fc"
        border={{ solid: 1, position: "all", color: "#f0f1fa" }}
        gap={6}
        onClick={() => onExcelDownload()}
      >
        <ExcelIcon />
        <TxtSpan color="#2E7D32" size={14}>
          엑셀 다운로드 {downloadLoading && "중 ..."}
        </TxtSpan>
      </TouchableOpacity>

      <Spacing size={20} />
      <DragTable>
        <TheadContainer />

        {data?.relations?.length === 0 ? (
          <V.Container align="center" margin={{ top: 30 }}>
            <Txt size={16} color="#888">
              미연결된 매장이 존재하지 않습니다
            </Txt>
          </V.Container>
        ) : (
          <V.Column>
            {optimizedRelations?.map((item: any, i: number) => (
              <V.Row height="100%" key={item.storeCode}>
                <Td
                  onClick={() =>
                    router.push({
                      pathname: "/store/create",
                      query: { id: item?.pkey },
                    })
                  }
                >
                  <Txt size={13} color="#555" weight="medium">
                    {item.storeName}
                  </Txt>
                </Td>

                {[
                  "greenlogis",
                  "wavepos",
                  "moneyon",
                  "semplus",
                  "payco",
                  "blueorder",
                  "kepco",
                  "kakao",
                ].map((el: any) => (
                  <TdBox storeCode={item.storeCode} data={item[el]} gb={el} />
                ))}
              </V.Row>
            ))}
          </V.Column>
        )}
      </DragTable>

      <ConnectModal />

      <V.Container align="center" padding={{top:20}}>
        <Pagination
          activePage={Number(page ?? 1)}
          itemsCountPerPage={10}
          totalItemsCount={data?.page?.totalElements}
          pageRangeDisplayed={3}
          hideFirstLastPages={true}
          hideNavigation={true}
          onChange={(pageNumber: any) =>
            router.push({ query: { page: pageNumber } })
          }
        />
      </V.Container>
    </View>
  );
}

Index.auth = true;
