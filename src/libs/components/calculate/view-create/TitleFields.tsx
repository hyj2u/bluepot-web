//libs
import { Input, Select, V } from "@/_ui";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getViewStoreOptions } from "@/_https/calculate/view";

//atoms
import { useRecoilState } from "recoil";
import { viewDetailOpions } from "@/libs/atoms/calculate/view";
import { ChangeEvent } from "react";
import { useMoment } from "@/libs/hooks";
import { MQ } from "@/libs/themes";

//
export default function TitleFields() {
  const { queryKeys, useQuery, axiosInstance } = useTanstackQuery();
  const [optionValue, setOptionValue] = useRecoilState(viewDetailOpions);

  // 매장 선택 정보
  const { data: options } = useQuery({
    queryKey: [queryKeys.calculate.view.storeOptions],
    queryFn: () => getViewStoreOptions({ axiosInstance }),
  });

  // console.log(optionValue);

  return (
    <V.Row
      maxWidth={800}
      gap={20}
      crossGap={20}
      align="start"
      css={{ [MQ[2]]: { flexDirection: "column" } }}
    >
      <Input label="제목">
        <Input.TextField
          placeholder="제목을 입력하세요"
          value={
            optionValue?.storeName +
            " " +
            useMoment("").previousMonth("yyyy년mm월") +
            " 정산서"
          }
          tolTip="제목은 자동으로 생성됩니다"
          disabled
        />
      </Input>

      <Select
        label="매장선택"
        options={[
          { storeName: "매장을 선택하세요", storeCode: "" },
          ...(options ?? []),
        ]}
        renderItem={(item: any) => (
          <Select.Option value={item?.storeCode}>
            {item?.storeName}
          </Select.Option>
        )}
        tolTip="✅  매장은 반드시 선택하세요"
        important
        value={optionValue.storeCode}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          const optionValues = options.find(
            (op: any) => op.storeCode === e.target.value
          );
          setOptionValue({
            storeCode: optionValues?.storeCode,
            storeName: optionValues?.storeName,
          });
        }}
      />
    </V.Row>
  );
}
