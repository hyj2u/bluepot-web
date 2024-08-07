import { Checkbox, Input, TouchableOpacity, V } from "@/_ui";
import { CancelIcon } from "@/libs/assets/icons";
import { colors } from "@/libs/themes";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export default function Filters() {
  const router = useRouter();
  const { brandCd, activeYn, search } = router?.query ?? {};
  const routeOptions = { scroll: false, shallow: true };
  const [isSearch, setIsSearch] = useState(search ?? "");

  const category = (val: "1" | "2" | "3" | undefined | string) => {
    router.replace(
      { query: { ...router.query, brandCd: val } },
      undefined,
      routeOptions
    );
  };


  useEffect(() => {
    if (!activeYn) {
      router.replace(
        { query: { ...router.query, activeYn: "Y" } },
        undefined,
        routeOptions
      );
    }
  }, [activeYn]);

  return (
    <V.Column align="start" gap={10}>
      <V.ScrollDragHorizontal>
        <V.Row gap={8}>
          <TouchableOpacity
            padding={{ vertical: 10, horizontal: 12 }}
            borderRadius={14}
            backgroundColor={!brandCd ? colors.keyColor : colors.chiffon200}
            txtColor={!brandCd ? colors.white : colors.grey100}
            onClick={() => category("")}
          >
            전체
          </TouchableOpacity>

          {[
            { name: "씨앤코", val: "1" },
            { name: "로로컴퍼니", val: "2" },
            { name: "푸드코드", val: "3" },
            { name: "버거", val: "4" },
          ].map((item, i) => (
            <TouchableOpacity
              key={item.name}
              padding={{ vertical: 10, horizontal: 12 }}
              borderRadius={14}
              backgroundColor={
                brandCd === item.val ? colors.keyColor : colors.chiffon200
              }
              txtColor={brandCd === item.val ? colors.white : colors.grey100}
              onClick={() => category(item.val)}
            >
              {item?.name}
            </TouchableOpacity>
          ))}
        </V.Row>
      </V.ScrollDragHorizontal>

      <V.Row gap={20} align="center">
        <V.Container width="auto" minWidth={81}>
          <Checkbox
            label={{ title: "오픈매장" }}
            checked={activeYn === "Y"}
            onChange={() =>
              router.replace(
                {
                  query: {
                    ...router.query,
                    activeYn: activeYn === "Y" ? "N" : "Y",
                  },
                },
                undefined,
                routeOptions
              )
            }
          />
        </V.Container>

        <V.Row width="auto">
          <Input.SearchField
            type="search"
            placeholder="담당자 / 상호 / 점주를 검색"
            value={isSearch}
            onChange={(e) => setIsSearch(e.target.value)}
            tab={{
              name: "검색",
              onClick: () => {
                router.replace(
                  { query: { ...router.query, search: isSearch } },
                  undefined,
                  routeOptions
                );
              },
            }}
            cancelTab={{
              view: !!search,
              onClick: () => {
                setIsSearch("");
                router.replace(
                  { query: { ...router.query, search: "" } },
                  undefined,
                  routeOptions
                );
              },
            }}
          />
        </V.Row>
      </V.Row>
    </V.Column>
  );
}
