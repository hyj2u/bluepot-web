import React, { ChangeEvent, useCallback, useState } from "react";

//libs
import { Checkbox, Input, Select, Spacing, V } from "@/_ui";

//atoms
import { useRecoilState, useRecoilValue } from "recoil";
import {
  checkAddTables,
  choiceCategoryOption,
  editTablesAtom,
} from "@/libs/atoms/calculate/edit";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getCategories, updateEditTable } from "@/_https/calculate/edit";
import { useJenga } from "@/_ui/JengaProvider";

//
export default function UpdateFilter() {
  const { axiosInstance, useMutation, useQuery, queryClient, queryKeys } =
    useTanstackQuery();
  const { addToast } = useJenga();

  const tables = useRecoilValue(editTablesAtom);
  const [choiceCy, setChoiceCy] = useRecoilState(choiceCategoryOption);
  const [checkTable, setCheckTable] = useRecoilState(checkAddTables);
  const [inputValue, setInputValue] = useState("");
  const [choiceCyName, setChoiceCyName] = useState("");

  console.log("checkTable", checkTable);
  console.log("choiceCy", choiceCy);

  //
  // 일괄입력 > 옵션
  const { data: option } = useQuery({
    queryKey: [queryKeys.calculate.edit.category],
    queryFn: () => getCategories({ axiosInstance }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  //
  // 일괄선택 핸들러
  const handleChoiceCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setChoiceCy(e.target.value);
      console.log("e.target", e.target.className);
    },

    [choiceCy]
  );

  //
  // 입괄입력 > 업데이트
  const { mutate: onUpdateTable, isLoading } = useMutation({
    mutationFn: (val: any) => updateEditTable({ axiosInstance, values: val }),
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.calculate.edit.table]);
      addToast({ title: "선택된 매장에 반영 성공했습니다" });
    },
    onError: (err) =>
      addToast({
        status: "failed",
        title: "선택된 매장에 반영에 실패했습니다",
        description: "정상적으로 입력했는지 확인하세요",
      }),
  });

  //
  // 일괄입력 > 반영
  const updateCheckTableValues = () => {
    const updatedCheckTable = checkTable.map((item) => {
      if (item[choiceCy] !== undefined) {
        // return { ...item, [choiceCy]: Number(inputValue) };
        return {
          pkey: item.pkey,
          code: choiceCy,
          value: Number(inputValue),
        };
      }
      return item;
    });

    onUpdateTable(updatedCheckTable);

    setInputValue("");
  };

  return (
    <>
      {!!choiceCy && !isLoading && (
        <V.Row width="auto" minWidth={90}>
          <Checkbox
            label={{ title: "전체반영" }}
            checked={checkTable.length === tables.length}
            onChange={() => {
              if (checkTable.length === tables.length) setCheckTable([]);
              else setCheckTable(tables);
            }}
          />
        </V.Row>
      )}

      <V.Container maxWidth={150} minWidth={150}>
        <Select
          value={choiceCy}
          onChange={handleChoiceCategory}
          options={[{ pkey: "", name: "전체" }, ...(option?.data ?? [])]}
          renderItem={(item: any) => (
            <Select.Option key={item.name} value={item.code}>
              {item.name}
            </Select.Option>
          )}
        />
      </V.Container>

      <Spacing direction="horizontal" size={6} />

      <V.Container maxWidth={240} minWidth={240}>
        <Input.TextField
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          placeholder="금액을 입력하세요"
          disabled={!choiceCy || checkTable.length === 0}
          tab={{
            name: isLoading ? "반영 중.." : "반영",
            disabled: !inputValue || isLoading,
            onClick: () => updateCheckTableValues(),
          }}
        />
      </V.Container>
    </>
  );
}
