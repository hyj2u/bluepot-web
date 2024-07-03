import React, { ChangeEvent, useEffect, useState } from "react";

//libs
import {
  Button,
  Checkbox,
  Input,
  LoadingSpinner,
  Modal,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtSpan,
  V,
} from "@/_ui";
import { useJenga } from "@/_ui/JengaProvider";
import { colors } from "@/libs/themes";
import { CancelIcon } from "@/libs/assets/icons";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//atoms
import { useRecoilState, useRecoilValue } from "recoil";
import { store_connect_atom, store_type_atom } from "@/libs/atoms/store-atom";
import { getConectList, updateConectList } from "@/_https/calculate/connect";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useUid } from "@/libs/hooks";

//
type Props = {
  value?: any;
  name?: string;
  gb?: string;
  manual?: boolean;
};

export default function Conect({ value, name, gb, manual }: Props) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const { addToast } = useJenga();
  const { axiosInstance, queryKeys, queryClient, useQuery, useMutation } =
    useTanstackQuery();

  const storeType = useRecoilValue(store_type_atom);
  const [allConnects, setAllConnects] = useRecoilState(store_connect_atom);

  const { storeCode } = storeType ?? "";
  const [openConect, setOpenConect] = useState(false);
  const [menualValue, setMenualValue] = useState("");

  //
  // 연결 내용 추가 > 체크박스
  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: { storeCode: string; storeName: string; gb: string; relName: string }
  ) => {
    const { name, checked } = e.target;
    const { gb } = item;
    const newItem = { storeCode, scrapGb: gb, relCode: name, relName: name };

    if (checked) setAllConnects((el: any) => [...el, newItem]);
    else setAllConnects((el) => el.filter((f) => f.relCode !== name));
  };

  //
  // 연결 옵션
  const { data: options, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.connect.gb, storeCode],
    queryFn: () => getConectList({ axiosInstance, gb }),
    enabled: !manual && openConect,
  });

  //
  // 연결 등록
  const { mutate: onUpdateConect } = useMutation({
    mutationFn: () =>
      updateConectList({
        axiosInstance,
        request: allConnects.filter((el: any) => el.scrapGb === gb),
      }),
    onSuccess: (data) => {
      console.log("연결하기 성공", data);
      queryClient.invalidateQueries([queryKeys.store.연결정보]);
      addToast({ title: "연걸이 완료되었습니다" });
      setOpenConect(false);
    },
  });

  console.log("allConnects", allConnects);

  return (
    <>
      <V.Row align="start" gap={30}>
        <TxtSpan size={14} css={{ minWidth: "70px" }}>
          {name}
        </TxtSpan>

        {value?.length !== 0 && (
          <V.Row wrap="wrap" gap={7} crossGap={6} align="start">
            {value?.map((item: any) => (
              <TxtSpan key={item?.pkey} size={14} color={colors.blue}>
                #{item?.relName ?? "이름이없습니다"}
              </TxtSpan>
            ))}

            {appUserStatus.rool !== "ROLE_USER" && (
              <TouchableOpacity
                txtSize={13}
                txtColor={colors.red}
                css={{ textDecoration: "underline" }}
                onClick={() => setOpenConect(true)}
              >
                수정
              </TouchableOpacity>
            )}
          </V.Row>
        )}

        {value?.length === 0 && (
          <>
            {appUserStatus.rool === "ROLE_USER" ? (
              <TxtSpan size={14}>-</TxtSpan>
            ) : (
              <TouchableOpacity onClick={() => setOpenConect(true)}>
                연결필요 +
              </TouchableOpacity>
            )}
          </>
        )}
      </V.Row>

      {/* 연결하기 팝업 */}
      <Modal open={openConect} onCancel={() => setOpenConect(false)}>
        <Txt weight="bold" size={18}>
          {name} 연결하기{" "}
        </Txt>

        <TxtSpan padding={{ top: 5 }}>(코드명 : {gb})</TxtSpan>

        <Spacing size={20} />

        {manual ? (
          <V.Column gap={20} margin={{ bottom: 20 }}>
            <Input.TextField
              maxLength={20}
              placeholder="직접 입력하세요"
              value={menualValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMenualValue(e.target.value)
              }
              tab={{
                name: "등록",
                disabled: menualValue === "",
                onClick: () => {
                  setMenualValue("");
                  setAllConnects((prevItems: any) => [
                    ...prevItems,
                    {
                      storeCode,
                      scrapGb: gb,
                      relCode: menualValue,
                      relName: menualValue,
                    },
                  ]);
                },
              }}
            />
          </V.Column>
        ) : (
          <>
            {isLoading && <LoadingSpinner />}

            {options?.data?.length === 0 ? (
              <V.Container
                padding={{ all: 24 }}
                margin={{ bottom: 10 }}
                backgroundColor="#f5f5f5"
                borderRadius={20}
                align="center"
              >
                <Txt color="#797979">현재 연결가능한 정보가 없습니다</Txt>
              </V.Container>
            ) : (
              <>
                <V.Container
                  gap={6}
                  maxHeight={300}
                  scroll={{ type: "auto", bar: true }}
                >
                  {options?.data?.map((item: any) => (
                    <Checkbox
                      label={{
                        title: item.storeName + " (" + item?.storeCode + ")",
                      }}
                      id={item.storeCode}
                      name={item.storeCode}
                      checked={allConnects.some(
                        (code) => code.relCode === item.storeCode
                      )}
                      onChange={(e) => handleCheckboxChange(e, item)}
                    />
                  ))}
                </V.Container>

                <Spacing size={20} />
              </>
            )}
          </>
        )}

        <V.Column
          align="start"
          padding={{ all: 16 }}
          backgroundColor="#f8f8f8"
          borderRadius={14}
          margin={{ bottom: 16 }}
        >
          <Txt as="b" size={16}>
            현재 연결된 정보(코드명)
          </Txt>

          <Spacing size={8} />

          <Txt color="#797979" size={14}>
            연결 정보가 존재할 경우 아래에서 확인가능합니다
          </Txt>

          <V.Row
            wrap="wrap"
            gap={7}
            crossGap={6}
            align="start"
            padding={{ top: 14 }}
          >
            {allConnects
              ?.filter((el) => el.scrapGb === gb && el.relCode != null)
              ?.map((item: any) => (
                <V.Row align="center" gap={4} crossGap={4} width="auto">
                  <TxtSpan key={item?.pkey} size={14} color={colors.blue}>
                    #{item?.relName ?? "이름이없습니다"}
                  </TxtSpan>

                  <TouchableOpacity
                    onClick={() =>
                      setAllConnects((prevItems: any) =>
                        prevItems.map((el: any) =>
                          el.relCode === item?.relCode
                            ? { ...el, relCode: null }
                            : el
                        )
                      )
                    }
                  >
                    <CancelIcon width="12px" fill="#ccc" />
                  </TouchableOpacity>
                </V.Row>
              ))}
          </V.Row>
        </V.Column>

        <Button width="100%" onClick={() => onUpdateConect()}>
          연결정보 업데이트
        </Button>
      </Modal>
    </>
  );
}
