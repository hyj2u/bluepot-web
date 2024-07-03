import { CalenderModal, Input, V, TouchableOpacity, TxtSpan } from "@/_ui";
import CalenderIcon from "@/libs/assets/icon-stroke/calender-icon";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useMoment } from "@/libs/hooks/useMoment";
import { colors } from "@/libs/themes";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Filter(props: {
  search: any;
  setSearch: React.Dispatch<React.SetStateAction<any>>;
  handleFinish: any;
}) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const router = useRouter();
  const { date } = router.query ?? {};
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const [isDate, setIsDate] = useState<any>(date);

  const today = new Date();
  const minDate = new Date(2023, 11, 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  return (
    <>
      <V.ScrollDragHorizontal>
        <V.Row gap={8} maxWidth={480}>
          <TouchableOpacity
            minHeight={50}
            gap={14}
            borderRadius={14}
            border={{ solid: 1, position: "all", color: "#e2e2e2" }}
            padding={{ vertical: 10, left: 14, right: 8 }}
            onClick={() => setIsCalenderOpen(true)}
          >
            <TxtSpan size={15} color="#555" weight="medium">
              {router.query.date ?? useMoment("").previousMonth("yyyy-mm")}
            </TxtSpan>

            <CalenderIcon size={16} fill="#999" />
          </TouchableOpacity>

          <V.Container minWidth={220}>
            <Input.TextField
              type="search"
              placeholder="매장을 입력하세요"
              value={props.search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                props.setSearch(e.target.value)
              }
            />
          </V.Container>

          {appUserStatus.rool !== "ROLE_USER" && (
            <>
              <TouchableOpacity
                minHeight={50}
                backgroundColor={colors.keyColor}
                txtColor="#fff"
                padding={{ vertical: 10, horizontal: 14 }}
                txtSize={15}
                borderRadius={14}
                onClick={() => router.push("/calculate/view/create")}
              >
                정산서 등록
              </TouchableOpacity>

              <TouchableOpacity
                minHeight={50}
                backgroundColor={colors.blueBg}
                txtColor={colors.keyColor}
                padding={{ vertical: 10, horizontal: 14 }}
                txtSize={15}
                borderRadius={14}
                onClick={() => props.handleFinish()}
              >
                정산완료
              </TouchableOpacity>
            </>
          )}
        </V.Row>
      </V.ScrollDragHorizontal>

      <CalenderModal
        format="yyyy-mm"
        open={isCalenderOpen}
        onCancel={() => setIsCalenderOpen(false)}
        date={isDate ? new Date(isDate) : new Date()}
        minDate={minDate as any}
        maxDate={maxDate as any}
        onClick={(date: any) => {
          setIsCalenderOpen(false);
          setIsDate(date);
          router.push({
            query: {
              ...router.query,
              date: useMoment(date).format("yyyy-mm"),
            },
          });
        }}
      />
    </>
  );
}
