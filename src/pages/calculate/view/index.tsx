import { useRouter } from "next/router";
import { useState, useEffect } from "react";

//libs
import { Pagination, Spacing, TouchableOpacity, Txt, V } from "@/_ui";

//components
import { DragTable, Title, View } from "@/libs/components/app";
import { Filter, TheadContainer } from "@/libs/components/calculate/view";

//hooks
import { useCurrencyPrice, useMoment } from "@/libs/hooks";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getAllViews, updateViewClosedActive } from "@/_https/calculate/view";
import { colors } from "@/libs/themes";
import { useJenga } from "@/_ui/JengaProvider";
import NoneDataResult from "@/libs/components/custom/NoneDataResult";
// Atoms
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useRecoilValue } from "recoil";
//
export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const { addToast } = useJenga();
  const { date, type, search, page } = {
    date: router.query.date || useMoment("").previousMonth("yyyy-mm"),
    type: router.query.type || "yyyy-mm",
    search: router.query.search || "",
    page: router.query.page || 1,
  
  };
  const activeYn: string = (router.query.activeYn as string) || "Y";

  // Router 준비 상태 확인
  //useEffect(() => {
  // if (router.isReady) {
  //  setIsReady(true);
  // }
  //}, [router.isReady]);
  //if (!isReady) return null; // Router 준비 전에는 아무것도 렌더링하지 않음
  const { axiosInstance, useQuery, useMutation, queryKeys, queryClient } =
    useTanstackQuery();

  const [tableData, setTableData] = useState([]);
  // Get user role from Recoil state
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  // Check if user has ROLE_FRANCHISE
  const isFranchiseUser = appUserStatus.rule === "ROLE_FRANCHISE";
  //
  // 정산서 데이터
  const { data, isLoading } = useQuery({
    queryKey: [{ ...router.query }, page],
    queryFn: () =>
      getAllViews({
        axiosInstance,
        date: date
          ? date + (type === "yyyy-mm" ? "-01" : "")
          : useMoment("").previousMonth("yyyy-mm") + "-01",
        search: search,
        page: router.query.page ?? 1,
        activeYn: activeYn,
      }),
    onSuccess: (data) => setTableData(data?.data?.settlements),
    refetchOnWindowFocus: true,
  });

  const totalElements = data?.data?.page?.totalElements;

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

  return (
    <View loading={isLoading}>
      <Title as="정산서조회" />

      <Spacing size={20} />

      {/* Show "권한이 없습니다" message if user is ROLE_FRANCHISE */}
      {isFranchiseUser ? (
        <V.Column align="center">
          <Txt size={16} color="red">
            권한이 없습니다.
          </Txt>
        </V.Column>
      ) : (
        <>
          <Filter handleFinish={handleFinish} />

          <Spacing size={30} />

          {totalElements === 0 ? (
            <NoneDataResult title="⛔ 정산서 정보가 존재하지 않습니다" />
          ) : (
            <DragTable>
              <TheadContainer />

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
                      router.query.date ??
                      useMoment("").previousMonth("yyyy-mm")
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
            </DragTable>
          )}

          <V.Column align="center" padding={{ top: 30 }}>
            <Pagination
              activePage={router?.query?.page ? Number(router?.query?.page) : 1}
              itemsCountPerPage={10}
              totalItemsCount={totalElements}
              pageRangeDisplayed={5}
              onChange={(pageNumber: any) =>
                router.push({ query: { ...router?.query, page: pageNumber } })
              }
            />
          </V.Column>
        </>
      )}
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
