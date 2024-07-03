import { getConectList, updateConectList } from "@/_https/calculate/connect";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Spacing,
  TouchableOpacity,
  Txt,
  V,
} from "@/_ui";
import { useJenga } from "@/_ui/JengaProvider";
import {
  initialConnectModalData,
  openConnectModalAtom,
} from "@/libs/atoms/calculate/connect";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useRecoilState } from "recoil";

export default function ConnectModal() {
  const { addToast } = useJenga();
  const { axiosInstance, queryKeys, queryClient, useQuery, useMutation } =
    useTanstackQuery();
  const [isVal, setIsVal] = useRecoilState(openConnectModalAtom);
  const { open, type, storeCode, gb } = isVal;

  const [isConnects, setIsConnects] = useState<
    { storeCode: string; scrapGb: string; relCode: string }[]
  >([]);

  const [isWrite, setIsWrite] = useState("");

  //
  // 타이틀
  const Name = () => {
    if (gb === "greenlogis") return "물류";
    if (gb === "wavepos") return "웨이브포스";
    if (gb === "moneyon") return "머니온";
    if (gb === "semplus") return "샘플러스";
    if (gb === "payco") return "페이코";
    if (gb === "blueorder") return "시크릿오더";
    if (gb === "kepco") return "한전온";
    if (gb === "kakao") return "카카오";

    return "";
  };

  const onCancelModal = useCallback(() => {
    setIsVal(initialConnectModalData);
    setIsConnects([]);
    setIsWrite("");
  }, []);

  //
  // 연결 옵션
  const { data: options, isLoading } = useQuery({
    queryKey: [queryKeys.calculate.connect.gb],
    queryFn: () => getConectList({ axiosInstance, gb }),
    onSuccess: (data) => {},
    enabled: type === "check" && open,
  });

  //
  // 연결 내용 추가 > 체크박스
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newItem = { storeCode, scrapGb: gb, relCode: name };

    if (checked) setIsConnects((prevItems: any) => [...prevItems, newItem]);
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
      onCancelModal();
    },
  });

  return (
    <Modal open={open} onCancel={() => onCancelModal()}>
      <Txt weight="bold" size={18}>
        {Name()} 연결하기
      </Txt>

      <Spacing size={20} />

      {/* 직접작성 */}
      {type === "write" && (
        <V.Column gap={20} margin={{ bottom: 20 }}>
          <Input.TextField
            maxLength={20}
            placeholder="직접 입력하세요"
            value={isWrite}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIsWrite(e.target.value)
            }
            tab={{
              name: "등록",
              onClick: () => {
                setIsWrite("");
                setIsConnects((prevItems: any) => [
                  ...prevItems,
                  { storeCode, scrapGb: gb, relCode: isWrite },
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
      )}

      {/* 체크리스트 */}
      {type === "check" && (
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
  );
}
