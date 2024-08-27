import { CalenderModal, Input, V, TouchableOpacity, TxtSpan, Txt } from "@/_ui";
import CalenderIcon from "@/libs/assets/icon-stroke/calender-icon";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useMoment } from "@/libs/hooks/useMoment";
import { colors } from "@/libs/themes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

export default function Filter(props: { handleFinish: any }) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const router = useRouter();
  const { date, type, search } = router.query ?? {};

  const [isSearch, setIsSearch] = useState(search ? search : "");
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const [isDate, setIsDate] = useState<any>(date);

  const today = new Date();
  const minDate = new Date(2022, 12, 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  return (
    <>
      <V.ScrollDragHorizontal>
        <V.Row gap={8} maxWidth={480}>
          <V.Row gap={20} padding={{ right: 10 }}>
            <년월버튼
              name="년도"
              checked={type === "yyyy"}
              onClick={() => {
                setIsSearch("");
                router.push({
                  query: {
                    date: today.getFullYear(),
                    type: "yyyy",
                    page: 1,
                  },
                });
              }}
            />

            <년월버튼
              name="년월"
              checked={type ? type === "yyyy-mm" : true}
              onClick={() => {
                setIsSearch("");
                router.push({
                  query: {
                    date: useMoment("").previousMonth("yyyy-mm"),
                    type: "yyyy-mm",
                    page: 1,
                  },
                });
              }}
            />
          </V.Row>

          <TouchableOpacity
            minHeight={50}
            gap={14}
            borderRadius={14}
            border={{ solid: 1, position: "all", color: "#e2e2e2" }}
            padding={{ vertical: 10, left: 14, right: 8 }}
            onClick={() => setIsCalenderOpen(true)}
          >
            <TxtSpan size={15} color="#555" weight="medium">
              {date ?? useMoment("").previousMonth("yyyy-mm")}
            </TxtSpan>

            <CalenderIcon size={16} fill="#999" />
          </TouchableOpacity>

          <V.Row align="center" minWidth={250}>
            <Input.SearchField
              type="search"
              placeholder="매장을 입력하세요"
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
              tab={{
                name: "검색",
                onClick: () =>
                  router.replace({
                    query: { ...router.query, search: isSearch },
                  }),
              }}
              cancelTab={{
                view: !!search,
                onClick: () => {
                  setIsSearch("");
                  router.replace({ query: { ...router.query, search: "" } });
                },
              }}
            />
          </V.Row>

          {appUserStatus.rule !== "ROLE_USER" && (
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

      {type === "yyyy" && (
        <CalenderModal
          format="yyyy"
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
                page: 1,
                date: useMoment(date).format("yyyy"),
              },
            });
          }}
        />
      )}

      {(type === "yyyy-mm" || !type) && (
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
                page: 1,
                date: useMoment(date).format("yyyy-mm"),
              },
            });
          }}
        />
      )}
    </>
  );
}

//
//

const 년월버튼 = ({
  name,
  checked,
  onClick,
}: {
  name: string;
  checked?: boolean;
  onClick: any;
}) => (
  <TouchableOpacity align="center" gap={5} onClick={onClick}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 0C8.82441 0 6.69767 0.645139 4.88873 1.85383C3.07979 3.06253 1.66989 4.78049 0.83733 6.79048C0.00476617 8.80047 -0.213071 11.0122 0.211367 13.146C0.635804 15.2798 1.68345 17.2398 3.22183 18.7782C4.76021 20.3166 6.72022 21.3642 8.85401 21.7886C10.9878 22.2131 13.1995 21.9952 15.2095 21.1627C17.2195 20.3301 18.9375 18.9202 20.1462 17.1113C21.3549 15.3023 22 13.1756 22 11C22 8.08262 20.8411 5.28473 18.7782 3.22183C16.7153 1.15893 13.9174 0 11 0ZM15.72 9.124L10.283 14.563C10.1105 14.7352 9.87674 14.8319 9.63301 14.8319C9.38927 14.8319 9.15549 14.7352 8.983 14.563L6.263 11.844C6.14107 11.7155 6.05889 11.5544 6.02636 11.3803C5.99383 11.2061 6.01233 11.0263 6.07964 10.8624C6.14695 10.6985 6.26019 10.5576 6.40574 10.4565C6.55128 10.3555 6.72293 10.2987 6.9 10.293C7.02079 10.2874 7.14145 10.3064 7.2546 10.3491C7.36774 10.3917 7.47099 10.457 7.558 10.541L9.631 12.614L14.42 7.825C14.5951 7.65775 14.8279 7.56443 15.07 7.56443C15.3121 7.56443 15.5449 7.65775 15.72 7.825C15.8054 7.91034 15.8731 8.01167 15.9193 8.1232C15.9656 8.23473 15.9893 8.35428 15.9893 8.475C15.9893 8.59573 15.9656 8.71527 15.9193 8.8268C15.8731 8.93833 15.8054 9.03966 15.72 9.125"
        fill={checked ? colors.keyColor : "#ccc"}
      />
    </svg>

    <Txt
      size={14}
      color={checked ? colors.keyColor : "#999"}
      whiteSpace="nowrap"
      padding={{ bottom: 2 }}
    >
      {name}
    </Txt>
  </TouchableOpacity>
);
