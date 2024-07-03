import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

//libs
import {
  Checkbox,
  LoadingSpinner,
  Modal,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtSpan,
  TxtTab,
  V,
} from "@/_ui";
import { colors } from "@/libs/themes";
import { GlobalInputTheme } from "@/_ui/_themes/input";
import FlatList from "react-flatlist-ui";

//assets
import { ColumnIcon } from "@/libs/assets/icon-fill";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getColumnFilters } from "@/_https/calculate/edit";

//atoms
import { useRecoilState } from "recoil";
import { columnFiltersAtom } from "@/libs/atoms/calculate/edit";
// import { handleAddColumn } from ".";

//
export default function Filter1() {
  const router = useRouter();
  const inputT = GlobalInputTheme() as any;
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState("");

  useEffect(() => {
    if (!isSearch)
      router.replace("/calculate/edit", undefined, {
        shallow: false,
        scroll: false,
      });
    else return;
  }, [isSearch]);

  const searchRoute = () =>
    router.replace({ query: { search: isSearch } }, undefined, {
      scroll: false,
      shallow: true,
    });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") searchRoute();
  };

  return (
    <>
      <V.ScrollDragHorizontal gap={8}>
        <V.Container
          direction="horizontal"
          maxWidth={240}
          padding={{ vertical: 13, left: 12, right: 8 }}
          border={{ solid: 1, position: "all", color: "#e2e2e2" }}
          borderRadius={12}
        >
          <input
            placeholder="매장명을 입력하세요"
            value={isSearch}
            onChange={(e) => setIsSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            css={{
              ...inputT,
              width: "100%",
              fontSize: 14,
              "::placeholder": { color: colors.chiffon500 },
            }}
          />

          <TxtTab onClick={() => searchRoute()}>검색</TxtTab>
        </V.Container>

        <TouchableOpacity
          backgroundColor={colors.keyColor}
          padding={{ vertical: 13, horizontal: 12 }}
          borderRadius={12}
          gap={8}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ColumnIcon size={15} fill="#fff" />
          <TxtSpan color="#fff" size={14}>
            열 관리
          </TxtSpan>
        </TouchableOpacity>
      </V.ScrollDragHorizontal>

      {/* 필터링 모달 */}
      <Modal open={isOpen} onCancel={() => setIsOpen(false)}>
        <ColumnFilters open={isOpen} />
      </Modal>
    </>
  );
}

//
// 열관리 기능
const ColumnFilters = ({ open }: { open: boolean }) => {
  const { axiosInstance, queryKeys, useQuery } = useTanstackQuery();
  const [filters, setFilters] = useRecoilState(columnFiltersAtom);

  //
  // 열 데이터
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.edit.columnFilter],
    queryFn: () => getColumnFilters({ axiosInstance, defaultYn: "N" }),
    enabled: open,
  });

  //
  // 체크박스 핸들러
  const handleAddColumn = useCallback(
    (e: ChangeEvent<HTMLInputElement>, item: any) => {
      const { checked } = e.target ?? {};
      if (checked) {
        setFilters([
          ...filters,
          {
            code: item.code,
            pkey: item.pkey,
            groupCode: item.groupCode,
            groupName: item.groupName,
            name: item.name,
          },
        ]);
      } else {
        setFilters((el) => el.filter((list) => list.pkey !== item.pkey));
      }
    },
    [data, filters]
  );

  return (
    <>
      <Txt size={20} weight="bold">
        열 추가하기
      </Txt>

      <Spacing size={10} />

      <Txt color="#797979">해당 카테고리를 선택하여 추가 작업이 가능합니다</Txt>

      <Spacing size={20} />

      {isLoading && <LoadingSpinner />}

      <V.Container scroll={{ type: "auto", bar: true }} maxHeight={300}>
        <FlatList
          data={data?.data}
          keyExtractor={(item) => item.pkey}
          itemGap={14}
          renderItem={(item: any) => (
            <Checkbox
              name={item.name}
              themes={{
                label: {
                  titleSize: 15,
                  titleWeight: "bold",
                  txtSize: 14,
                  txtColor: "#797979",
                },
              }}
              label={{
                title: item?.name,
                txt: "#" + item?.groupName,
              }}
              checked={filters.some((el) => el.pkey === item.pkey)}
              onChange={(e) => handleAddColumn(e, item)}
            />
          )}
        />
      </V.Container>
    </>
  );
};
