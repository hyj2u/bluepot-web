import React, { ChangeEvent, useEffect, useState } from "react";
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
  const { axiosInstance, queryKeys, useQuery } = useTanstackQuery();

  useEffect(() => {
    if (!!search)
      router.replace({ query: { search } }, undefined, {
        scroll: false,
        shallow: true,
      });
    else {
      router.replace({ query: null }, undefined, {
        scroll: false,
        shallow: true,
      });
    }
  }, [search]);

  //
  // 데이터
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.users.all, router.query.search],
    queryFn: () => getAllUsers({ axiosInstance, search }),
  });

  return (
    <View>
      <Title as="회원관리" />
      <Spacing size={20} />

      <V.Row maxWidth={440} gap={10}>
        <Input.TextField
          placeholder="이름/이메일/연락처 검색"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
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
      </V.Row>

      <Spacing size={30} />

      <FlatList
        size={{ maxWidth: 800 }}
        loading={isLoading}
        ListLoadingComponent={<LoadingSpinner />}
        ListEmptyComponent={<NoneView />}
        data={data}
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
