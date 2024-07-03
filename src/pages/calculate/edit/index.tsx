import { useRouter } from "next/router";

//libs
import { LoadingSpinner, Spacing } from "@/_ui";

//components
import { DragTable, Title, View } from "@/libs/components/app";
import {
  Filter1,
  Filter2,
  Thead,
  Tbody,
} from "@/libs/components/calculate/edit";

//hooks
import { useMoment, useRouteOnload } from "@/libs/hooks";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getAllEditTables } from "@/_https/calculate/edit";

//atoms
import { useRecoilState } from "recoil";
import {
  checkAddTables,
  choiceCategoryOption,
  columnFiltersAtom,
  editTablesAtom,
} from "@/libs/atoms/calculate/edit";

//
export default function Edit() {
  const router = useRouter();
  const { axiosInstance, queryKeys, useQuery } = useTanstackQuery();
  const [tables, setTables] = useRecoilState(editTablesAtom);
  const [checkTable, setCheckTable] = useRecoilState(checkAddTables);
  const [columns, setColumns] = useRecoilState(columnFiltersAtom);
  const [category, setCategory] = useRecoilState(choiceCategoryOption);

  //
  // 상태초기화
  useRouteOnload(() => {
    setCheckTable([]);
    setCategory("");
  });

  //
  // 데이터
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.edit.table, router.query.search],
    queryFn: () =>
      getAllEditTables({ axiosInstance, search: router.query.search ?? "" }),
    enabled: router.isReady,
    onSuccess: (data) => setTables(data?.data),
  });

  return (
    <View>
      <Title
        as="정산서작성"
        txt={`[대상년월 ${useMoment("").previousMonth("yyyy-mm")}]`}
      />

      <Spacing size={20} />
      <Filter1 />

      <Spacing size={16} />
      <Filter2 />

      <Spacing size={20} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DragTable>
          <Thead />

          {tables?.map((item: any) => <Tbody data={item} />)}
        </DragTable>
      )}
    </View>
  );
}

Edit.auth = true;
