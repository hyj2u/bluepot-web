import React, { useEffect } from "react";
import { useRouter } from "next/router";

//libs
import { Button, P, Spacing, T } from "@/_ui";

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

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.store.all, brandCd, activeYn, search],
    queryFn: () => getAllStores({ axiosInstance, brandCd, activeYn, search }),
  });

  // Redirect to /calculate/view on page load
  useEffect(() => {
    router.replace("/calculate/view");
  }, [router]);


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
