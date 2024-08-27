import React, { useState } from "react";
import { useRouter } from "next/router";

//libs
import Box from "./Box";
import {
  Button,
  Divider,
  Input,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtSpan,
  V,
} from "@/_ui";
import { CancelIcon } from "@/libs/assets/icons";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import {
  getStoreDetailBackupNumbers,
  getStoreDetailConect,
  updateStoreDetailBackupNumbers,
} from "@/_https/store";
import { useJenga } from "@/_ui/JengaProvider";

//atoms
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  storeValuesAtom,
  store_connect_atom,
  store_type_atom,
} from "@/libs/atoms/store-atom";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";

//components
import Conect from "./Comp6/Conect";

//
//
export default function Comp6() {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const { addToast } = useJenga();
  const router = useRouter();

  const { axiosInstance, useQuery, queryKeys, useMutation } =
    useTanstackQuery();

  const [isCodeVal, setIsCodeVal] = useState("");
  const [relCodes, setRelCodes] = useState<any | string[]>([]);

  const isValues = useRecoilValue(storeValuesAtom);
  const storeType = useRecoilValue(store_type_atom);
  const setAllConnects = useSetRecoilState(store_connect_atom);
  const { storeCode } = storeType ?? "";

  //
  //  연결정보 > 매장상세
  const { data } = useQuery({
    queryKey: [queryKeys.store.연결정보, storeCode],
    queryFn: () => getStoreDetailConect({ axiosInstance, storeCode }),
    enabled: !!router.query.id,
    onSuccess: (data: any) => {
      const uniqueItems = data.reduce((acc: any, item: any) => {
        const exists = acc.find(
          (accItem: any) =>
            accItem.relCode === item.relCode && accItem.scrapGb === item.scrapGb
        );

        if (!exists) {
          acc.push({
            storeCode: item.storeCode,
            scrapGb: item.scrapGb,
            relCode: item.relCode,
            relName: item.relName,
          });
        }
        return acc;
      }, []);

      setAllConnects(uniqueItems);
    },
  });

  //
  // 백업단말기 > 조회
  const { data: backUpNumber } = useQuery({
    queryKey: [queryKeys.store.백업단말기, storeCode],
    queryFn: () => getStoreDetailBackupNumbers({ axiosInstance, storeCode }),
    onSuccess: (data) => {
      const uniqueItems = data.reduce((acc: any, item: any) => {
        const exists = acc.find((el: any) => el.relCode === item.relCode);

        if (!exists) acc.push(item.relCode);

        return acc;
      }, []);

      setRelCodes(uniqueItems);
    },
    enabled: !!router.query.id,
  });

  //
  // 백업단말기 > 업데이트
  const { mutate: updateBackupNumber, isLoading: updateLoading } = useMutation({
    mutationKey: [queryKeys.store.백업단말기],
    mutationFn: () =>
      updateStoreDetailBackupNumbers({
        axiosInstance,
        storeCode,
        relCode: relCodes,
      }),
    onSuccess: (data) => {
      console.log("단말기 업로드 성공", data);
      addToast({ title: "단말기 업로드 성공" });
    },
    onError: (err) => {
      console.error("단말기 업로드 실패"),
        addToast({ status: "failed", title: "단말기 업로드 실패" });
    },
  });

  return (
    <Box title="연결정보">
      <Txt as="b" size={16}>
        스토어정보 : {isValues.storeName}
      </Txt>

      <Spacing size={20} />

      <V.Column gap={12}>
        <Conect
          name="물류"
          gb="greenlogis"
          value={data?.filter((el: any) => el.scrapGb === "greenlogis")}
        />
        <Conect
          name="웨이브포스"
          gb="wavepos"
          value={data?.filter((el: any) => el.scrapGb === "wavepos")}
        />
        <Conect
          name="머니온"
          gb="moneyon"
          manual={true}
          value={data?.filter((el: any) => el.scrapGb === "moneyon")}
        />
        <Conect
          name="샘플러스"
          gb="semplus"
          value={data?.filter((el: any) => el.scrapGb === "semplus")}
        />
        <Conect
          name="페이코"
          gb="payco"
          value={data?.filter((el: any) => el.scrapGb === "payco")}
        />
        <Conect
          name="시크릿오더"
          gb="blueorder"
          value={data?.filter((el: any) => el.scrapGb === "blueorder")}
        />
        <Conect
          name="한전온"
          gb="kepco"
          manual={true}
          value={data?.filter((el: any) => el.scrapGb === "kepco")}
        />

        <Conect
          name="카카오"
          gb="kakao"
          value={data?.filter((el: any) => el.scrapGb === "kakao")}
        />
      </V.Column>

      <Divider size={10} color="#f5f5f5" spacing={{ vertical: 24 }} />

      {appUserStatus.rule !== "ROLE_USER" && (
        <>
          <Input label="백업단말기">
            <Input.TextField
              type="number"
              maxLength={10}
              placeholder="단말기 번호를 입력하세요"
              value={isCodeVal}
              onChange={(e) => setIsCodeVal(e.target.value)}
              tab={{
                name: "추가",
                disabled: relCodes.some((el: string) => el === isCodeVal),
                onClick: () => {
                  setIsCodeVal("");
                  setRelCodes([...relCodes, isCodeVal.toString()]);
                },
              }}
            />
          </Input>

          {updateLoading && (
            <V.Container align="center" padding={{ vertical: 10 }}>
              <TxtSpan>단말기 업데이트 중...</TxtSpan>
            </V.Container>
          )}
        </>
      )}

      {relCodes?.length > 0 && (
        <V.Row margin={{ top: 14 }} wrap="wrap" gap={6} crossGap={8}>
          {relCodes?.map((item: any) => (
            <V.Row
              align="center"
              width="auto"
              gap={6}
              padding={{ vertical: 6, horizontal: 10 }}
              borderRadius={100}
              backgroundColor="#f8f9fc"
              key={item}
              border={{ solid: 1, position: "all", color: "#eee" }}
            >
              <TxtSpan color="#666" size={14}>
                {item}
              </TxtSpan>

              <TouchableOpacity
                padding={{ top: 2 }}
                onClick={() =>
                  setRelCodes((prev: any) =>
                    prev.filter((el: any) => el !== item)
                  )
                }
              >
                <CancelIcon width="14px" fill="#ccc" />
              </TouchableOpacity>
            </V.Row>
          ))}
        </V.Row>
      )}

      {appUserStatus.rule !== "ROLE_USER" && (
        <Button
          width="100%"
          onClick={() => updateBackupNumber()}
          margin={{ top: 20 }}
        >
          단말기 저장하기
        </Button>
      )}
    </Box>
  );
}
