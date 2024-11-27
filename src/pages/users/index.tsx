import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

//libs
import {
  Input,
  LoadingSpinner,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtSpan,
  V,
} from "@/_ui";
import { Title, View } from "@/libs/components/app";
import { colors } from "@/libs/themes";
import FlatList from "react-flatlist-ui";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getAllUsers } from "@/_https/users";
import { useAppVerifiy } from "@/libs/hooks";

//
export default function Index() {
  useAppVerifiy();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [excludeOwners, setExcludeOwners] = useState(true); // 점주 제외 체크박스 상태
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태
  const { axiosInstance, queryKeys, useQuery } = useTanstackQuery();

  const queryRoute = { scroll: false, shallow: true };

  // 필터 데이터 처리 함수
  const filterData = (data: any) => {
    if (excludeOwners) {
      return data?.filter((user: any) => user.auth !== "점주") || [];
    }
    return data || [];
  };

  // 데이터 가져오기
  const { data: allData, isLoading } = useQuery({
    queryKey: [queryKeys.users.all, router.query.search],
    queryFn: () => getAllUsers({ axiosInstance, search }),
    staleTime: 5000, // 데이터 캐싱 시간 설정
    onSuccess: (data) => setFilteredData(filterData(data)), // 초기 데이터를 필터링 데이터로 설정
  });

  // 점주 제외 상태 변경 시 필터링
  useEffect(() => {
    setFilteredData(filterData(allData));
  }, [excludeOwners, allData]);

  // 점주 제외 상태 변경 함수
  const toggleExcludeOwners = () => {
    const newExcludeOwners = !excludeOwners;
    setExcludeOwners(newExcludeOwners);
    router.replace(
      { query: { ...router.query, excludeOwners: newExcludeOwners } },
      undefined,
      queryRoute
    );
  };

  return (
    <View loading={isLoading}>
      <Title as="회원관리" />
      <Spacing size={20} />

      <V.Row maxWidth={600} gap={10} align="center">
        <Input.SearchField
          placeholder="이름/이메일/연락처 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          tab={{
            name: "검색",
            onClick: () =>
              router.replace(
                { query: { search } },
                undefined,
                queryRoute
              ),
          }}
          cancelTab={{
            view: !!router.query.search,
            onClick: () => {
              router.replace({ query: { search: "" } }, undefined, queryRoute);
              setSearch("");
            },
          }}
        />

        <TouchableOpacity
          height="100%"
          minHeight={50}
          padding={{ vertical: 10, horizontal: 14 }}
          backgroundColor={colors.keyColor}
          txtColor="#fff"
          borderRadius={14}
          onClick={() => router.push(`/users/create`)}
        >
          회원추가
        </TouchableOpacity>

        {/* 점주 제외하기 체크박스 */}
        <V.Row align="center" gap={8}>
          <input
            type="checkbox"
            checked={excludeOwners}
            onChange={toggleExcludeOwners}
            style={{ cursor: "pointer" }}
          />
          <TxtSpan size={14}>점주 제외하기</TxtSpan>
        </V.Row>
      </V.Row>

      <Spacing size={30} />

      <FlatList
        size={{ maxWidth: 800 }}
        loading={isLoading}
        ListLoadingComponent={<LoadingSpinner />}
        ListEmptyComponent={<NoneView />}
        data={filteredData} // 필터링된 데이터 사용
        keyExtractor={(i) => i}
        renderItem={(item) => (
          <TouchableOpacity
            width="100%"
            onClick={() =>
              router.push({
                pathname: "/users/create",
                query: { id: item?.pkey },
              })
            }
          >
            <V.Column
              align="start"
              gap={8}
              backgroundColor="#f8f8f8"
              padding={{ all: 16 }}
              borderRadius={15}
            >
              <V.Row align="center" gap={6}>
                <Txt as="strong" size={16}>
                  {item?.userName}
                </Txt>
                <TxtSpan size={14}>{"(" + item?.userId + ")"}</TxtSpan>
              </V.Row>

              <V.Row align="center" gap={30} grow={8} wrap="wrap">
                <TxtSpan size={14}>이메일 : {item.email}</TxtSpan>
                <TxtSpan size={14}>연락처 : {item.phone}</TxtSpan>
                <TxtSpan size={14}>권한 : {item.auth}</TxtSpan>
              </V.Row>
            </V.Column>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const NoneView = () => {
  return (
    <V.Container align="center">
      <Txt size={16} color="#888">
        사용자가 존재하지 않습니다
      </Txt>
    </V.Container>
  );
};
Index.auth = true;
