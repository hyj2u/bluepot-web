import React, { useState } from "react";
import { Interpolation, Theme } from "@emotion/react";

//libs
import Box from "./Box";
import {
  LoadingSpinner,
  P,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtTab,
  V,
} from "@/_ui";
import { colors } from "@/libs/themes";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//atoms|
import { store_files_atom, store_type_atom } from "@/libs/atoms/store-atom";
import { useRecoilState } from "recoil";

//hooks
import { useJenga } from "@/_ui/JengaProvider";
import {
  deleteStoreImage,
  getStoreFileData,
  getStoreImageList,
  uploadStoreFiles,
  uploadStoreImages,
} from "@/_https/store";
import { Image } from "react-image-cached-resizer";

//
export default function Comp2() {
  const [storeType, setStoreType] = useRecoilState(store_type_atom);
  const storeCode = storeType?.storeCode;

  const { addToast } = useJenga();
  const { useQuery, useMutation, queryKeys, axiosInstance, queryClient } =
    useTanstackQuery();

  const [isFiles, setIsFiles] = useRecoilState(store_files_atom);

  //
  //
  const configs = { axiosInstance, storeCode };

  //
  // 공통 핸들러
  const SUCCESS = (data: any, type: "보험증권" | "보고서" | "이미지") => {
    console.log(type + " 업로드성공", data);
    addToast({ title: type + " 업로드를 성공" });

    if (type === "보험증권") {
      queryClient.invalidateQueries([queryKeys.store.detail]);
      queryClient.invalidateQueries([queryKeys.store.create.files1]);
    }

    if (type === "보고서") {
      queryClient.invalidateQueries([queryKeys.store.detail]);
      queryClient.invalidateQueries([queryKeys.store.create.files2]);
    }

    if (type === "이미지")
      queryClient.invalidateQueries([queryKeys.store.create.images]);
  };

  const ERROR = (err: any) => {
    console.error("업로드실패", err);
    addToast({
      status: "failed",
      title: "업로드가 실패되었습니다",
      description: "파일 형식 또는 크기를 확인해주세요",
    });
  };

  //
  // 업로드 > 사업자등록증
  const { mutate: uploadFile1, isLoading: loading_business_file } = useMutation(
    {
      mutationFn: (file: any) =>
        uploadStoreFiles({ ...configs, file, fileType: "business_num" }),
      onSuccess: (data: any) => {
        SUCCESS(data, "보험증권");
        setIsFiles({
          ...isFiles,
          business: { name: data?.fileName, key: data?.pkey },
        });
      },
      onError: (err: any) => ERROR(err),
    }
  );

  //
  // 업로드 > 오픈 완료 보고서
  const { mutate: uploadFile2, isLoading: loading_fin_file } = useMutation({
    mutationFn: (file: any) =>
      uploadStoreFiles({ ...configs, file, fileType: "open_fin" }),
    onSuccess: (data: any) => {
      SUCCESS(data, "보고서");
      setIsFiles({
        ...isFiles,
        fin: { name: data?.fileName, key: data?.pkey },
      });
    },
    onError: (err: any) => ERROR(err),
  });

  //
  // 업로드 > 이미지
  const { mutate: uploadImages, isLoading: loading_img_upload } = useMutation({
    mutationFn: (file: any) => uploadStoreImages({ ...configs, file }),
    onSuccess: (data: any) => SUCCESS(data, "이미지"),
    onError: (err: any) => ERROR(err),
  });

  //
  // 다운로드 > 사업자등록증
  const { mutate: onDownladBusiness, isLoading: business_upload_loading } =
    useMutation({
      mutationFn: () =>
        getStoreFileData({
          axiosInstance,
          storeCode,
          fileType: "business_num",
          filename: isFiles.business.name,
        }),
      onSuccess: (data: any) => console.log("보험증권 다운완료", data),
    });

  //
  // 다운로드 > 보고서
  const { mutate: onDownladFin, isLoading: fin_upload_loading } = useMutation({
    mutationFn: () =>
      getStoreFileData({
        axiosInstance,
        storeCode,
        fileType: "open_fin",
        filename: isFiles.fin.name,
      }),
    onSuccess: (data: any) => console.log("오픈보고서 다운완료", data),
  });

  //
  // 조회 > 이미지
  const { data: images, isLoading: loading_images } = useQuery({
    queryKey: [queryKeys.store.create.images, storeCode],
    queryFn: () => getStoreImageList({ axiosInstance, storeCode }),
    onSuccess: (data: any) => setIsFiles({ ...isFiles, images: data }),
  });

  //
  // 삭제 > 이미지 / 파일
  const { mutate: deleteFile1 } = useMutation({
    mutationFn: (key: string | number) =>
      deleteStoreImage({ axiosInstance, key }),
    onSuccess: (data: any) => {
      console.log("파일 삭제완료", data);
      queryClient.invalidateQueries([queryKeys.store.create.files1]);
      queryClient.invalidateQueries([queryKeys.store.detail]);
      addToast({ title: "파일 삭제완료" });
      setIsFiles({
        ...isFiles,
        business: { name: data?.fileName, key: data?.pkey },
      });
    },
    onError: (err) => {
      console.error("파일 삭제 실패");
      addToast({ status: "failed", title: "파일 삭제를 실패했습니다" });
    },
  });

  const { mutate: deleteFile2 } = useMutation({
    mutationFn: (key: string | number) =>
      deleteStoreImage({ axiosInstance, key }),
    onSuccess: (data: any) => {
      console.log("파일 삭제완료", data);
      queryClient.invalidateQueries([queryKeys.store.create.files2]);
      queryClient.invalidateQueries([queryKeys.store.detail]);
      addToast({ title: "파일 삭제완료" });
      setIsFiles({
        ...isFiles,
        fin: { name: data?.fileName, key: data?.pkey },
      });
    },
    onError: (err) => {
      console.error("파일 삭제 실패");
      addToast({ status: "failed", title: "파일 삭제를 실패했습니다" });
    },
  });

  const { mutate: deleteImage } = useMutation({
    mutationFn: (key: string | number) =>
      deleteStoreImage({ axiosInstance, key }),
    onSuccess: (data: any) => {
      console.log("이미지 삭제완료", data);
      queryClient.invalidateQueries([queryKeys.store.create.images]);
      addToast({ title: "이미지 삭제완료" });
    },
    onError: (err) => {
      console.error("이미지 삭제 실패");
      addToast({ status: "failed", title: "파일 삭제를 실패했습니다" });
    },
  });

  return (
    <Box title="기본정보 (파일 업로드)">
      {/* // 사업자등록증 */}
      <TouchableOpacity css={themes.touO}>
      보험증권 {business_upload_loading ? "다운로드 중 .." : "업로드"}{" "}
        {loading_business_file && "중 .."}{" "}
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          css={themes.file}
          onChange={(e: any) => uploadFile1(e.target.files[0])}
        />
      </TouchableOpacity>

      {!!isFiles.business.name && (
        <V.Row css={themes.fileBox}>
          <Txt
            size={14}
            ellipsis={{ line: 1, ellipsis: true }}
            onClick={() => onDownladBusiness()}
          >
            {isFiles.business.name}
          </Txt>
          <TouchableOpacity onClick={() => deleteFile1(isFiles?.business?.key)}>
            삭제
          </TouchableOpacity>
        </V.Row>
      )}

      <Spacing size={20} />

      {/* // 오픈 완료보고서 */}
      <TouchableOpacity css={themes.touO}>
        오픈 완료 보고서 {fin_upload_loading ? "다운로드 중 .." : "업로드"}{" "}
        {loading_fin_file && "중 .."}{" "}
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          css={themes.file}
          onChange={(e: any) => uploadFile2(e.target.files[0])}
        />
      </TouchableOpacity>

      {!!isFiles.fin.name && (
        <V.Row css={themes.fileBox}>
          <Txt
            size={14}
            ellipsis={{ line: 1, ellipsis: true }}
            onClick={() => onDownladFin()}
          >
            {isFiles.fin.name}
          </Txt>
          <TouchableOpacity onClick={() => deleteFile2(isFiles?.fin.key)}>
            삭제
          </TouchableOpacity>
        </V.Row>
      )}

      <Spacing size={20} />

      {/* // 이미지 업로더 */}
      <TouchableOpacity css={themes.touO}>
        매장 이미지 업로드 {loading_img_upload && "중 .."}
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          css={themes.file}
          onChange={(e: any) => uploadImages(e.target.files[0])}
        />
      </TouchableOpacity>

      {isFiles.images.length > 0 && (
        <>
          <Spacing size={20} />
          {loading_images ? (
            <V.Container align="center">
              <LoadingSpinner />
            </V.Container>
          ) : (
            <V.Row wrap="wrap" gap={8} crossGap={8}>
              {isFiles?.images.map((item: any, i: number) => (
                <V.Container width="auto">
                  <Image
                    zoomUp
                    source={item?.src}
                    alt={item.pkey}
                    size={{
                      maxWidth: 120,
                      minWidth: 120,
                      maxHeight: 120,
                      minHeight: 120,
                    }}
                    borderRadius={12}
                  />

                  <P.Absolute
                    position={{ top: 6, right: 6 }}
                    backgroundColor="rgba(0,0,0,0.5)"
                    padding={{ vertical: 4, horizontal: 8 }}
                    borderRadius={100}
                    onClick={() => deleteImage(item?.pkey)}
                  >
                    <TxtTab size={12} color="#fff">
                      삭제
                    </TxtTab>
                  </P.Absolute>
                </V.Container>
              ))}
            </V.Row>
          )}
        </>
      )}
    </Box>
  );
}

//
// theme
const themes = {
  touO: {
    width: "100%",
    padding: "14px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    border: "1px solid #E7EBF9",
    backgroundColor: "#F5F9FC",
    fontSize: 15,
    color: colors.keyColor,
    fontWeight: 500,
  },

  file: {
    cursor: "pointer",
    opacity: 0,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  } as Interpolation<Theme>,

  fileBox: {
    marginTop: 12,
    columnGap: 25,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    padding: "10px 12px",
  },
};
