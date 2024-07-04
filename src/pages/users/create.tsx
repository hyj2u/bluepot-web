import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";

//libs
import { Button, Input, TouchableOpacity, Txt, TxtSpan, V, Select } from "@/_ui";
import { regEx } from "@/libs/utils/regEx";
import { PathIcon } from "@/libs/assets/icons";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { createUser, getUserDetail, updateUser } from "@/_https/users";
import { useJenga } from "@/_ui/JengaProvider";
import { useAppVerifiy } from "@/libs/hooks";

//
export default function Index() {
  useAppVerifiy();
  const { addToast } = useJenga();
  const router = useRouter();
  const { queryKeys, useQuery, useMutation, axiosInstance } =
    useTanstackQuery();

  const [isValues, setIsValues] = useState({
    userId: "",
    userPw: "",
    userName: "",
    email: "",
    phone: "",
    activeYn: "Y",
    auth: "",
  });

  const { userId, userPw, userName, email, phone, activeYn, auth } = isValues;

  //
  // 사용자 상세
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.users.detail],
    queryFn: () => getUserDetail({ axiosInstance, id: router.query.id }),
    onSuccess: (data) => {
      setIsValues({
        ...isValues,
        userId: data?.userId,
        userName: data?.userName,
        email: data?.email,
        phone: data?.phone,
        auth: data?.auth,
      });
    },
    enabled: !!router?.query?.id,
  });

  //
  // 사용자 등록
  const { mutate: onCreate } = useMutation({
    mutationFn: () =>
      createUser({
        axiosInstance,
        userId,
        userPw,
        userName,
        email,
        phone,
        activeYn,
        auth,
      }),
    onSuccess: (data) => {
      console.log("회원 등록 성공", data);
      addToast({ title: "회원 등록을 완료했습니다" });
      setIsValues({
        userId: "",
        userPw: "",
        userName: "",
        email: "",
        phone: "",
        activeYn: "Y",
        auth: "",
      });
    },
    onError: (err: any) => {
      const errMsg = err?.response?.data?.msg;
      console.error(errMsg);
      addToast({
        status: "failed",
        title: errMsg,
        description: "다른 아이디를 입력하세요",
      });
    },
  });

  //
  // 사용자 수정
  const { mutate: onUpdate } = useMutation({
    mutationKey: [queryKeys.users.detail],
    mutationFn: () =>
      updateUser({
        axiosInstance,
        pkey: router.query.id,
        userPw,
        userName,
        email,
        phone,
        auth,
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!!router.query.id) onUpdate();
    else onCreate();
  };

  //
  // 사용자 삭제
  const { mutate: onUserDelete } = useMutation({
    mutationKey: [queryKeys.users.detail, queryKeys.users.all],
    mutationFn: () =>
      updateUser({
        axiosInstance,
        pkey: router.query.id,
        userPw,
        userName,
        email,
        phone,
        activeYn: "N",
        auth,
      }),
    onSuccess: (data) => {
      console.log("사용자 삭제 성공", data);
      addToast({ title: "해당 회원을 삭제하였습니다" });
      router.push("/users");
    },
    onError: (err: any) => {
      console.error("삭제 실패", err);
      addToast({
        status: "failed",
        title: "삭제를 실패했습니다",
        description: "다시 한번 확인해주세요",
      });
    },
  });

  const onRemove = () => {
    const confirmDelete = window.confirm(
      "삭제하면 복구가 불가합니다.\n삭제하시겠습니까?"
    );
    if (confirmDelete) onUserDelete();
  };

  return (
    <V.Section>
      <V.Container
        align="start"
        maxWidth={600}
        padding={{ vertical: 30, horizontal: 20 }}
      >
        <Txt as="b" size={24}>
          {!!router.query.id ? "회원수정" : "회원등록"}
        </Txt>

        <V.Form
          align="start"
          padding={{ vertical: 30 }}
          gap={24}
          onSubmit={onSubmit}
        >
          <Input label="아이디">
            <Input.TextField
              id="id"
              maxLength={10}
              placeholder="아이디를 입력하세요"
              disabled={!!router.query.id}
              value={isValues.userId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, userId: e.target.value })
              }
              tolTip={!!router.query.id && "아이디는 수정이 불가능합니다"}
            />
          </Input>

          <Input
            label={!!router.query.id ? "비밀번호 변경 (선택)" : "비밀번호"}
          >
            <Input.TextField
              id="password"
              type="password"
              placeholder={
                !!router.query.id
                  ? "변경할 비밀번호 입력하세요"
                  : "비밀번호를 입력하세요"
              }
              value={isValues.userPw}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, userPw: e.target.value })
              }
              tolTip={
                !!router.query.id && "⚠️ 비밀번호 변경 필요 시 입력하세요"
              }
              error={!!isValues.userPw && isValues.userPw.length < 8}
              errorMessage="비밀번호를 8자 이상 입력하세요"
            />
          </Input>

          <Input label="이름">
            <Input.TextField
              id="name"
              maxLength={6}
              placeholder="이름을 입력하세요"
              value={isValues.userName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, userName: e.target.value })
              }
            />
          </Input>
          <Select label="권한"
          options={["일반사용자", "정산관리자", "전체관리자"]}
          value={isValues.auth}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setIsValues({ ...isValues, auth: e.target.value } 
            )
          }
          renderItem={(item: any) => (
            <Select.Option value={item} key={item}>
              {item}
            </Select.Option>
          )}
        />

          <Input label="이메일">
            <Input.TextField
              id="email"
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
            <Input.TextField
              type="number"
              id="phone"
              maxLength={11}
              placeholder="연락처를 입력하세요"
              value={isValues.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIsValues({ ...isValues, phone: e.target.value })
              }
            />
          </Input>

          {!!router?.query?.id && (
            <V.Row crossAlign="end">
              <TouchableOpacity gap={8} onClick={() => onRemove()}>
                <TxtSpan size={14}>해당 회원 삭제하기</TxtSpan>
                <PathIcon fill="#aaa" />
              </TouchableOpacity>
            </V.Row>
          )}

          <V.Row gap={10}>
            <Button
              width="100%"
              buttonColor="#999"
              txtColor="#e2e2e2"
              onClick={() => router.back()}
            >
              목록으로
            </Button>
            <Button
              type="submit"
              width="100%"
              disabled={
                !regEx.email.test(email) ||
                (userId && userName && email && phone) === ""
              }
            >
              {!!router.query.id ? "회원수정" : "회원등록"}
            </Button>
          </V.Row>
        </V.Form>
      </V.Container>
    </V.Section>
  );
}

Index.auth = true;
