import React, { useEffect } from "react";
import { useRouter } from "next/router";

//atoms
import { useRecoilState } from "recoil";
import {
  storeValuesAtom,
  store_activeYn_values_atom,
  store_files_atom,
  store_type_atom,
  initialStoreValues,
  initialStoreType,
  initialStoreFiles,
  initialStoreActiveYnValues,
} from "@/libs/atoms/store-atom";

//hooks
import { useUid } from "@/libs/hooks/useUid";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { getStoreDetail } from "@/_https/store";
import { useRouteOnload } from "@/libs/hooks";

//
export default function Logic() {
  const router = useRouter();
  const pkey = router.query.id ?? "";
  const { axiosInstance, useQuery, queryKeys } = useTanstackQuery();

  const [storeType, setStoreType] = useRecoilState(store_type_atom);
  const [isValues, setIsValues] = useRecoilState(storeValuesAtom);
  const [isFiles, setIsFiles] = useRecoilState(store_files_atom);
  const [activeYnValues, setActiveValues] = useRecoilState(
    store_activeYn_values_atom
  );

  useEffect(() => {
    const uid = useUid();
    if (!router.query.id) setStoreType({ ...storeType, storeCode: uid });
    else return;
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.store.detail, pkey],
    queryFn: () => getStoreDetail({ axiosInstance, pkey }),
    enabled: !!pkey,
    refetchOnWindowFocus: false,
    refetchOnMount: "always", // 이는 다른 페이지를 방문한 후 해당 페이지로 다시 탐색할 때 발생
    refetchOnReconnect: true,

    onSuccess: (data: any) => {
      const { store } = data ?? {};

      setIsValues({
        ...isValues,
        activeYn: store?.activeYn ?? "", // 폐점,이관 유무
        brandCd: store?.brandCd ?? "", // 브랜드
        settlementCd: store?.settlementCd ?? "", // 정산구분
        manager: store?.manager ?? "", // 담당자
        contractor: store?.contractor ?? "", // 계약자
        storeName: store?.storeName ?? "", // 상호면
        owner: store?.owner ?? "", // 점주명
        openYmd: store?.openYmd ?? "", // 오픈일
        orgContractYmd: store?.orgContractYmd ?? "", // 최초 계약일
        writtenContractYmd: store?.writtenContractYmd ?? "", // 서면 계약일
        finalContractYmd: store?.finalContractYmd ?? "", // 최종 재계약
        bank: store?.bank ?? "", // 은행
        bankAccount: store?.bankAccount ?? "", // 예금주
        bankAccountNumber: store?.bankAccountNumber ?? "", // 계좌번호
        phone: store?.phone ?? "", // 연락처
        email: store?.email ?? "", // 이메일
        homeAdress: store?.homeAdress ?? "", // 자택주소
        storeAddress: store?.storeAddress ?? "", // 사업장주소
        isp: store?.isp ?? "", // 인터넷통신사
        etc: store?.etc ?? "", // 비고
        fireInsurance: store?.fireInsurance ?? "", // 화재보험증권번호
        disasterInsurance: store?.disasterInsurance ?? "", // 재난배상책임보험
        storeSize: store?.storeSize ?? "", // 실평수
        deposit: store?.deposit ?? "", // 보증금
        vat: store?.vat ?? "", // 부가세

        maint: store?.maint ?? "", // 관리비
        businessGuarantee: store?.businessGuarantee ?? "", // 영업보장
        charge: store?.charge ?? "", // 수수료
        opeNote: store?.opeNote ?? "", // 주요내용
        prepaidRent: store?.prepaidRent ?? "", // 임대로 선납금
        prepaidMonth: store?.prepaidMonth ?? "", // 선납개월수
        rentFromYmd: store?.rentFromYmd ?? "", // 임대 시작일

        contracts: data?.contracts ?? [], // 계약 시작일/종료일/임대료
      });

      setStoreType({
        ...storeType,
        pkey: store?.pkey,
        storeCode: store?.storeCode,
        type: store?.activeYn === "N" ? "폐점" : null,
      });

      setIsFiles({
        ...isFiles,
        business: {
          name: data?.businessNumFileName,
          key: data?.businessNumFileId,
        },
        fin: {
          name: data?.openFinFileName,
          key: data?.openFileFileId,
        },
      });

      setActiveValues({
        ...activeYnValues,
        closingDesc: store?.closingDesc,
        closingYmd: store?.closingYmd,
      });
    },
  });

  useRouteOnload(() => {
    setStoreType({ ...storeType, ...initialStoreType });
    setIsValues({ ...isValues, ...initialStoreValues });
    setIsFiles({ ...isFiles, ...initialStoreFiles });
    setActiveValues({ ...activeYnValues, ...initialStoreActiveYnValues });
  });

  return { storeStatus: data?.store?.activeYn, loading: isLoading };
}
