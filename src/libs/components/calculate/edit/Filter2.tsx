import React, { ChangeEvent, useCallback } from "react";

//libs
import { Spacing, TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";
import { DownloadIcon, UploadIcon } from "@/libs/assets/icon-fill";

// hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { downloadEditExcel, uploadEditFile } from "@/_https/calculate/edit";
import { useJenga } from "@/_ui/JengaProvider";

//components
import UpdateFilter from "./UpdateFilter";

//atoms
import { useRecoilValue } from "recoil";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";

//
export default function Filter2() {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const { addToast } = useJenga();
  const { axiosInstance, useMutation, queryClient, queryKeys } =
    useTanstackQuery();

  //
  // 정산서 다운로드
  const { mutate: onExcelDownload, isLoading: downloadLoading } = useMutation({
    mutationFn: () => downloadEditExcel({ axiosInstance }),
  });

  //
  // 정산서 업로드
  const { mutate: onUploadKepco, isLoading: uploadLoading } = useMutation({
    mutationFn: (file: any) => uploadEditFile({ axiosInstance, file }),
    onSuccess: (data) => {
      addToast({ title: "정산서 업로드 성공" });
      console.log("정산서업로드 성공", data);
      queryClient.invalidateQueries([queryKeys.calculate.edit.table]);
    },
    onError: (err) => {
      addToast({
        status: "failed",
        title: "파일양식을 확인해주세요",
        description: "파일 양식이 맞지 않는 경우 업로드가 불가합니다",
      });
      console.log("정산서 업로드 실패", err);
    },
  });

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    onUploadKepco(file);
  };

  //
  //
  const 정산서다운로드버튼 = () => {
    return (
      <TouchableOpacity
        height="100%"
        backgroundColor={colors.white}
        padding={{ vertical: 12, horizontal: 16 }}
        gap={8}
        borderRadius={14}
        border={{ solid: 1, position: "all", color: "#e2e2e2" }}
        onClick={() => onExcelDownload()}
      >
        <DownloadIcon size={16} fill="#619EE6" />
        <TxtSpan color="#619EE6" size={14}>
          정산서 다운로드 {downloadLoading && "중 .."}
        </TxtSpan>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {appUserStatus.rule === "ROLE_USER" ? (
        <정산서다운로드버튼 />
      ) : (
        <V.Container
          align="start"
          backgroundColor="#f5f6fc"
          borderRadius={18}
          padding={{ vertical: 18 }}
        >
          <V.ScrollDragHorizontal>
            <V.Column align="start">
              <V.Column align="start" padding={{ horizontal: 18 }}>
                <Txt weight="medium">
                  {
                    "✅ 작성방법 : 매장 선택 > 카테고리 선택 > 금액입력 > 반영하기"
                  }
                </Txt>
              </V.Column>

              <Spacing size={20} />

              <V.Row>
                <Spacing direction="horizontal" size={18} />

                <V.Row align="center">
                  <TxtSpan size={14} color="#555">
                    일괄입력
                  </TxtSpan>

                  <Spacing direction="horizontal" size={14} />

                  <UpdateFilter />

                  <Spacing direction="horizontal" size={16} />

                  {정산서다운로드버튼()}

                  <Spacing direction="horizontal" size={6} />

                  <TouchableOpacity
                    height="100%"
                    backgroundColor={colors.white}
                    padding={{ vertical: 12, horizontal: 16 }}
                    gap={8}
                    borderRadius={14}
                    border={{ solid: 1, position: "all", color: "#e2e2e2" }}
                  >
                    <UploadIcon size={16} fill="#6584D6" />
                    <TxtSpan color="#6584D6" size={14}>
                      정산서 업로드 {uploadLoading && "중 .."}
                    </TxtSpan>

                    <input
                      type="file"
                      accept=".xlsx"
                      onChange={handleFileUpload}
                      disabled={uploadLoading}
                      css={{
                        cursor: "pointer",
                        opacity: 0,
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                      }}
                    />
                  </TouchableOpacity>

                  <Spacing direction="horizontal" size={18} />
                </V.Row>
              </V.Row>
            </V.Column>
          </V.ScrollDragHorizontal>
        </V.Container>
      )}
    </>
  );
}
