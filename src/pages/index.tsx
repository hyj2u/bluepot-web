import React from "react";
import { useRouter } from "next/router";

//libs
import { Button, P, Spacing, T } from "@/_ui";
import NoneDataResult from "@/libs/components/custom/NoneDataResult";

// Assume you are getting user role from appUserStatusAtom or some context/recoil state
import { useRecoilValue } from "recoil";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
//components
import { DragTable, Title, View } from "@/libs/components/app";
import {
  Filters,
  TheadContainer,
  TbodyContainer,
} from "@/libs/components/store/index";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getAllStores } from "@/_https/store";

//
export default function Index() {
  const router = useRouter();
  const { brandCd, activeYn, search } = router?.query ?? {};

  const { queryKeys, useQuery, axiosInstance } = useTanstackQuery();

  const appStatus = useRecoilValue(appUserStatusAtom);

  // Check user role
  if (appStatus.rule === "ROLE_FRANCHISE") {
    return (
      <NoneDataResult title="권한이 없습니다" />
    );
  }


  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.store.all, brandCd, activeYn, search],
    queryFn: () => getAllStores({ axiosInstance, brandCd, activeYn, search }),
  });

  return (
    <View loading={isLoading}>
      <Title as="매장관리" />
      <Spacing size={20} />

      <Filters />

      <Spacing size={26} />

      <DragTable>
        <T.Table maxWidth={640}>
          <TheadContainer />
          <TbodyContainer data={data} />
        </T.Table>
      </DragTable>

      <P.BottomFixed height={80}>
        <Button
          borderRadius={100}
          width="100%"
          maxWidth={300}
          onClick={() => router.push("/store/create")}
        >
          매장 추가하기
        </Button>
      </P.BottomFixed>
    </View>
  );
}

Index.auth = true;
