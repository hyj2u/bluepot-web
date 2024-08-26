import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";

//libs
import {
  Button,
  Input,
  Spacing,
  TouchableOpacity,
  Txt,
  TxtSpan,
  V,
} from "@/_ui";
import { regEx } from "@/libs/utils/regEx";

//hooks
import { STATUS, TOKEN } from "@/libs/utils/enum";
import { useCookie } from "@/libs/hooks/useCookie";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";

//atoms
import {
  appUserStatusAtom,
  initialAppUserStatus,
} from "@/libs/atoms/auth-atom";
import { useRecoilState } from "recoil";
import { getUserDetail, updateUser } from "@/_https/users";
import { useJenga } from "@/_ui/JengaProvider";
import LoadingInfoBox from "@/libs/components/custom/LoadingInfoBox";

//
export default function Index() {
  const router = useRouter();
  const [appStatus, setAppStatus] = useRecoilState(appUserStatusAtom);
  const { axiosInstance, queryKeys, useQuery, useMutation, queryClient } =
    useTanstackQuery();
  const { addToast } = useJenga();

  const [isValues, setIsValues] = useState({
    userId: "",
    userPw: "",
    userName: "",
    email: "",
    phone: "",
  });

  const { userId, userPw, userName, email, phone } = isValues;

  //
  // 로그아웃
  const onLogout = () => {
    useCookie.remove(TOKEN.ACCESS);
    useCookie.remove(TOKEN.REFRESH);
    setAppStatus(initialAppUserStatus);
    queryClient.clear();
    router.push("/login");
  };

  //
  // 내정보
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.users.mypage],
    queryFn: () => getUserDetail({ axiosInstance, id: appStatus?.pkey }),
    onSuccess: (data: any) => {
      setIsValues({
        ...isValues,
        userId: data?.userId,
        email: data?.email,
        userName: data?.userName,
        phone: data?.phone.replace(/-/g, ""),
      });
    },
  });

  //
  // 정보수정
  const { mutate: onUpdate } = useMutation({
    mutationKey: [queryKeys.users.mypage],
    mutationFn: () =>
      updateUser({
        axiosInstance,
        pkey: appStatus.pkey,
        userPw: !!userPw ? userPw : null,
        userName,
        email,
        phone,
      }),
    onSuccess: (data) => {
      console.log("수정 성공", data);
      addToast({ title: "정보를 수정 완료했습니다" });
    },
    onError: (err: any) => {
      console.error("수정 실패", err);
      addToast({
        status: "failed",
        title: "수정을 실패했습니다",
        description: "다시 한번 확인해주세요",
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate();
  };

  if (isLoading) return <LoadingInfoBox />;

  return (
    <V.Section>
      <V.Container
        align="start"
        maxWidth={600}
        padding={{ vertical: 30, horizontal: 20 }}
      >
        <Txt as="b" size={24}>
          마이페이지
        </Txt>

        <Spacing size={20} />

        <V.Container
          align="start"
          gap={10}
          padding={{ all: 20 }}
          borderRadius={16}
          backgroundColor="#f8f8f8"
        >
          <Txt as="b" size={18}>
            {data?.userName}님 안녕하세요
          </Txt>

          <TouchableOpacity onClick={onLogout}>
            <TxtSpan underline color="#888">
              로그아웃
            </TxtSpan>
          </TouchableOpacity>
        </V.Container>

        <V.Form
          align="start"
          padding={{ vertical: 30 }}
          gap={24}
          onSubmit={onSubmit}
        >
          <Input label="아이디">
            <Input.TextField
              placeholder="아이디를 입력하세요"
              disabled
              value={isValues.userId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, userId: e.target.value })
              }
            />
          </Input>

          <Input label="비밀번호 (선택)">
            <Input.TextField
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={isValues.userPw}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, userPw: e.target.value })
              }
            />
          </Input>

          <Input label="이름">
            <Input.TextField
              placeholder="이름을 입력하세요"
              value={isValues.userName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, userName: e.target.value })
              }
            />
          </Input>

          <Input label="이메일">
            <Input.TextField
              placeholder="이메일을 입력하세요"
              value={isValues.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, email: e.target.value })
              }
              error={!!isValues.email && !regEx.email.test(isValues.email)}
              errorMessage="이메일 형식으로 입력하세요"
            />
          </Input>

          <Input label="연락처">
            <Input.PhoneNumberField
              placeholder="연락처를 입력하세요"
              disabled
              value={isValues.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, phone: e.target.value })
              }
            />
          </Input>

          <Button
            type="submit"
            width="100%"
            margin={{ top: 10 }}
            disabled={
              !regEx.email.test(email) ||
              (userId && userName && email && phone) === ""
            }
          >
            내정보 수정하기
          </Button>
        </V.Form>
      </V.Container>
    </V.Section>
  );
}

Index.auth = true;
