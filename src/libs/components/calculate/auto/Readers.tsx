//libs
import { Divider, V, TouchableOpacity, TxtSpan, Dialog } from "@/_ui";
import { ExcelIcon } from "@/libs/assets/icon-color";
import { CopyIcon, UploadIcon } from "@/libs/assets/icon-fill";
import { MQ } from "@/libs/themes";

// hooks
import { useState } from "react";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { updateKepcoSetting, uploadKepcoExcel } from "@/_https/calculate/auto";
import { useJenga } from "@/_ui/JengaProvider";

//atoms
import { useRecoilValue } from "recoil";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";

//
export default function Readers({ onDownloadExcel }: { onDownloadExcel: any }) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);
  const [openDialog, setOpenDialog] = useState(false);

  const { addToast } = useJenga();
  const { axiosInstance, queryKeys, queryClient, useMutation } =
    useTanstackQuery();

  //
  // 한전 업로드
  const { mutate: onUploadKepco, isLoading: kepcoLoading } = useMutation({
    mutationFn: (file: any) => uploadKepcoExcel({ axiosInstance, file }),
    onSuccess: (data) => {
      addToast({ title: "한전업로드 성공" });
      console.log("한전 업로드에 성공했습니다", data);
      queryClient.invalidateQueries([queryKeys.calculate.auto.table]);
    },
    onError: (err) => {
      addToast({
        title: "파일양식을 확인해주세요",
        description: "파일 양식이 맞지 않는 경우 업로드가 불가합니다",
      });
      console.log("한전업로드 실패", err);
    },
  });

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    onUploadKepco(file);
  };

  //
  // 정산서 반영
  const { mutate: onUpdateKepco } = useMutation({
    mutationFn: () => updateKepcoSetting({ axiosInstance }),
    onSuccess: (data) => {
      setOpenDialog(false);
      addToast({ title: "정산서 반영에 성공했습니다" });
      console.log("정산서반영 성공", data);
    },
    onError: (err) => {
      setOpenDialog(false);
      addToast({
        status: "failed",
        title: "정산서 반영에 실패했습니다",
        description: "정산서반영을 재시도 해주세요",
      });
      console.log("정산서반영 실패", err);
    },
  });

  return (
    <>
      <V.Row
        padding={{ horizontal: 10 }}
        borderRadius={10}
        backgroundColor="#f8f9fc"
        border={{ solid: 1, position: "all", color: "#f0f1fa" }}
      >
        <V.ScrollDragHorizontal>
          <V.Row
            align="center"
            crossAlign="center"
            gap={10}
            css={{ [MQ[3]]: { justifyContent: "start" } }}
          >
            {appUserStatus.rule !== "ROLE_USER" && (
              <>
                <TouchableOpacity
                  borderRadius={10}
                  padding={{ all: 12 }}
                  backgroundColor="#f6f6f6"
                  gap={8}
                >
                  <UploadIcon />
                  <TxtSpan color="#EA9E46" size={14}>
                    한전업로드 {kepcoLoading && "중 ..."}
                  </TxtSpan>

                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileUpload}
                    disabled={kepcoLoading}
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

                <Divider
                  direction="vertical"
                  size={1}
                  height={20}
                  color="#e0e0e0"
                />

                <TouchableOpacity
                  borderRadius={10}
                  padding={{ all: 12 }}
                  backgroundColor="#f6f6f6"
                  gap={8}
                  onClick={() => setOpenDialog(true)}
                >
                  <CopyIcon />
                  <TxtSpan color="#5795CF" size={14}>
                    정산서반영
                  </TxtSpan>
                </TouchableOpacity>

                <Divider
                  direction="vertical"
                  size={1}
                  height={20}
                  color="#e0e0e0"
                />
              </>
            )}

            <TouchableOpacity
              borderRadius={10}
              padding={{ all: 12 }}
              backgroundColor="#f6f6f6"
              gap={6}
              onClick={() => onDownloadExcel()}
            >
              <ExcelIcon />
              <TxtSpan color="#2E7D32" size={14}>
                엑셀 다운로드
              </TxtSpan>
            </TouchableOpacity>
          </V.Row>
        </V.ScrollDragHorizontal>
      </V.Row>

      <Dialog
        title="정산서를 반영하시겠습니까?"
        description="데이터 상태에 따라 시간이 소요될 수 있습니다"
        open={openDialog}
        onCancel={() => setOpenDialog(false)}
        tabs={[{ name: "반영하기", onClick: () => onUpdateKepco() }]}
      />
    </>
  );
}
