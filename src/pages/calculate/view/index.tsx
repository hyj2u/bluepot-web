import { useRouter } from "next/router";
import { useState, useEffect } from "react";

//libs
import { LoadingSpinner, Spacing, TouchableOpacity, Txt, V } from "@/_ui";

//components
import { DragTable, Title, View } from "@/libs/components/app";
import { Filter, TheadContainer } from "@/libs/components/calculate/view";

//hooks
import { useCurrencyPrice, useMoment } from "@/libs/hooks";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getAllViews, updateViewClosedActive } from "@/_https/calculate/view";
import { colors } from "@/libs/themes";
import { useJenga } from "@/_ui/JengaProvider";

//
export default function Index() {
  const router = useRouter();
  const { addToast } = useJenga();
  const { search } = router.query ?? {};
  const { axiosInstance, useQuery, useMutation, queryKeys, queryClient } =
    useTanstackQuery();

  const [isSearch, setIsSearch] = useState(search ?? "");
  const [tableData, setTableData] = useState([]);

  //
  // 정산서 데이터
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.view.table, router.query.date, isSearch],
    queryFn: () =>
      getAllViews({
        axiosInstance,
        date: router.query.date ?? useMoment("").previousMonth("yyyy-mm"),
        search: isSearch,
      }),
    onSuccess: (data) => setTableData(data?.data),
  });

  //
  // 정산 마감
  const { mutate: onFinish } = useMutation({
    mutationFn: () =>
      updateViewClosedActive({
        axiosInstance,
        date: router.query.date ?? useMoment("").previousMonth("yyyy-mm"),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.calculate.view.table]);
      addToast({
        title:
          (router.query.date ?? useMoment("").previousMonth("yyyy-mm")) +
          " 정산이 마감되었습니다",
      });
    },
    onError: () => {
      addToast({
        status: "failed",
        title: "정산 마감 실패했습니다",
      });
    },
  });

  const handleFinish = () => {
    const confirmDelete = window.confirm(
      `${router.query.date ?? useMoment("").previousMonth("yyyy-mm")} 정산완료 시 취소 불가합니다.\n정산완료 하시겠습니까?`
    );
    if (confirmDelete) onFinish();
  };

  //
  // 검색 핸들러
  useEffect(() => {
    const routeOptions = { scroll: false, shallow: true };

    if (isSearch)
      router.replace(
        { query: { ...router.query, search: isSearch } },
        undefined,
        routeOptions
      );

    if (!!search && !isSearch)
      router.replace(
        { query: { ...router.query, search: undefined } },
        undefined,
        routeOptions
      );
  }, [isSearch]);

  return (
    <View>
      <Title as="정산서조회" />

      <Spacing size={20} />

      <Filter
        search={isSearch}
        setSearch={setIsSearch}
        handleFinish={handleFinish}
      />

      <Spacing size={30} />

      <DragTable>
        <TheadContainer />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {tableData?.map((item: any) => (
              <TouchableOpacity
                key={item?.pkey}
                onClick={() =>
                  router.push({
                    pathname: `/calculate/view/${item?.pkey}`,
                    query: {
                      settlementYmd:
                        router.query.date ??
                        useMoment("").previousMonth("yyyy-mm"),
                    },
                  })
                }
              >
                <TdContainer
                  width={150}
                  td={
                    router.query.date ?? useMoment("").previousMonth("yyyy-mm")
                  }
                />
                <TdContainer width={240} td={item.settlementTitle ?? "-"} />
                <TdContainer width={250} td={item.storeName} />
                <TdContainer width={120} td={item.owner} />
                <TdContainer
                  width={140}
                  td={useCurrencyPrice(item?.depositAmount)}
                />
                <TdContainer
                  width={130}
                  td={useMoment(item.settlementYmd).format("yyyy-mm-dd")}
                />
                <TdContainer
                  width={140}
                  tdColor={colors.keyColor}
                  td={
                    item?.closedYn === "Y"
                      ? "정산완료 (수정불가)"
                      : "미정산 (수정가능)"
                  }
                />
              </TouchableOpacity>
            ))}
          </>
        )}
      </DragTable>
    </View>
  );
}

const TdContainer = ({
  width,
  td,
  tdColor,
  ...props
}: {
  width: number;
  td?: any;
  tdColor?: string;
}) => {
  return (
    <V.Container
      padding={{ all: 11 }}
      minWidth={width}
      maxWidth={width}
      height="100%"
      border={{ solid: 1, position: "bottom", color: "#e2e2e2" }}
      align="center"
      {...(props as any)}
    >
      <Txt
        size={13}
        color={tdColor ?? "#555"}
        weight={!!tdColor ? "medium" : "normal"}
        whiteSpace="pre-line"
        txtAlign="center"
      >
        {td === "" ? "-" : td}
      </Txt>
    </V.Container>
  );
};

Index.auth = true;
