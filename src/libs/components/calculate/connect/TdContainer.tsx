import React, { ChangeEvent, useCallback, useState } from "react";

//libs
import {
  Button,
  Checkbox,
  V,
  Input,
  Modal,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtSpan,
  TxtTab,
} from "@/_ui";
import { useJenga } from "@/_ui/JengaProvider";
import { LookIcon } from "@/libs/assets/icon-fill";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getConectList, updateConectList } from "@/_https/calculate/connect";

type Props = {
  storeCode: string;
  value: any;
  gb?: any;
  name: string;
  manual?: boolean;
};

//
function TdContainer({ storeCode, value, gb, name, manual }: Props) {
  const { addToast } = useJenga();
  const { axiosInstance, queryKeys, queryClient, useQuery, useMutation } =
    useTanstackQuery();
  const [dataDrop, setDataDrop] = useState(false);
  const [openConect, setOpenConect] = useState(false);

  const [isConnects, setIsConnects] = useState<
    { storeCode: string; scrapGb: string; relCode: string }[]
  >([]);

  const [menualValue, setMenualValue] = useState("");

  const handleConectModal = useCallback(
    (val: boolean) => setOpenConect(val),
    []
  );

  //
  // 연결 옵션
  const { data: options, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.connect.gb],
    queryFn: () => getConectList({ axiosInstance, gb }),
    onSuccess: (data) => {},
    enabled: !manual && openConect,
  });

  //
  // 연결 내용 추가 > 체크박스
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newItem = { storeCode, scrapGb: gb, relCode: name };

    if (checked) setIsConnects((prevItems) => [...prevItems, newItem]);
    else {
      setIsConnects((prevItems) =>
        prevItems.filter((item) => item.relCode !== name)
      );
    }
  };

  //
  // 연결 등록
  const { mutate: onUpdateConect } = useMutation({
    mutationFn: () => updateConectList({ axiosInstance, request: isConnects }),
    onSuccess: (data) => {
      console.log("연결하기 성공", data);
      queryClient.invalidateQueries([queryKeys.calculate.connect.table]);
      addToast({ title: "연걸이 완료되었습니다" });
      setOpenConect(false);
    },
  });

  return (
    <>
      <V.Container
        width="100%"
        minWidth={160}
        maxWidth={160}
        border={{ solid: 1, position: "bottom", color: "#e2e2e2" }}
        backgroundColor={dataDrop ? "#f8f9fc" : "#fff"}
        align="center"
      >
        {value?.length !== 0 ? (
          <V.Container>
            <V.Row
              align="center"
              crossAlign="center"
              padding={{ vertical: 11, horizontal: 8 }}
            >
              <TxtSpan color="#555">
                현재 연결 중 {`(${value?.length ?? 0})`}
              </TxtSpan>
              <TouchableOpacity
                padding={{ horizontal: 6, vertical: 2 }}
                onClick={() => setDataDrop(!dataDrop)}
              >
                <LookIcon />
              </TouchableOpacity>
            </V.Row>

            {dataDrop && (
              <V.Column
                gap={5}
                padding={{ vertical: 6, horizontal: 8 }}
                backgroundColor={dataDrop ? "#f2f3fc" : "#fff"}
              >
                {value?.map((item: any, i: number) => (
                  <V.Row align="start" gap={5}>
                    <V.Container
                      width="auto"
                      minWidth={4}
                      minHeight={4}
                      borderRadius={10}
                      backgroundColor="#797979"
                      margin={{ top: 8 }}
                    />
                    <Txt size={13} color="#47769F">
                      {item[gb + "Name"]}
                    </Txt>
                  </V.Row>
                ))}
              </V.Column>
            )}
          </V.Container>
        ) : (
          <TouchableOpacity
            padding={{ vertical: 11, horizontal: 8 }}
            onClick={() => handleConectModal(true)}
          >
            <TxtTab size={13}>연결필요 +</TxtTab>
          </TouchableOpacity>
        )}
      </V.Container>

      {/* 연결하기 팝업 */}
      <Modal
        open={openConect}
        onCancel={() => {
          handleConectModal(false);
          setIsConnects([]);
        }}
      >
        <Txt weight="bold" size={18}>
          {name} 연결하기
        </Txt>

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
                onClick: () => {
                  setMenualValue("");
                  setIsConnects((prevItems) => [
                    ...prevItems,
                    { storeCode, scrapGb: gb, relCode: menualValue },
                  ]);
                },
              }}
            />

            {isConnects.length > 0 && (
              <V.Container
                gap={10}
                maxHeight={300}
                scroll={{ type: "auto", bar: true }}
                padding={{ all: 14 }}
                backgroundColor="#f6f6f6"
                borderRadius={16}
              >
                {isConnects.map((item) => (
                  <V.Row align="center" crossAlign="space-between">
                    <Txt>{item.relCode}</Txt>

                    <TouchableOpacity
                      as="span"
                      onClick={() =>
                        setIsConnects((prevItems) =>
                          prevItems.filter(
                            (code) => code.relCode !== item.relCode
                          )
                        )
                      }
                      txtColor="#797979"
                    >
                      삭제
                    </TouchableOpacity>
                  </V.Row>
                ))}
              </V.Container>
            )}
          </V.Column>
        ) : (
          <>
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
                  padding={{ all: 14 }}
                  backgroundColor="#f6f6f6"
                  borderRadius={16}
                  maxHeight={300}
                  scroll={{ type: "auto", bar: true }}
                >
                  {options?.data?.map((item: any) => (
                    <Checkbox
                      label={{ title: item.storeName }}
                      id={item.storeCode}
                      name={item.storeCode}
                      checked={isConnects.some(
                        (code) => code.relCode === item.storeCode
                      )}
                      onChange={handleCheckboxChange}
                    />
                  ))}
                </V.Container>

                <Spacing size={20} />
              </>
            )}
          </>
        )}

        <Button
          width="100%"
          disabled={isConnects.length === 0}
          onClick={() => onUpdateConect()}
        >
          연결하기
        </Button>
      </Modal>
    </>
  );
}

export default React.memo(TdContainer);
