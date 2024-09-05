// components/Login.tsx
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, V, Input, Spacing, Txt } from "@/_ui";
import { Image } from "react-image-cached-resizer";
import { MQ } from "@/libs/themes";
import { useRecoilState } from "recoil";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { createSignIn } from "@/_https/auth";
import { useCookie } from "../../libs/hooks/useCookie";
import { TOKEN } from "@/libs/utils/enum";
import PasswordChangeModal from "@/libs/components/login/PasswordChangeModal";

const Login: React.FC = () => {
  const router = useRouter();
  const { useMutation } = useTanstackQuery();
  const [isValue, setIsValue] = useState({ id: "", pw: "" });
  const [isErr, setIsErr] = useState("");
  const [appStatus, setAppStatus] = useRecoilState(appUserStatusAtom);
  const accessToken = useCookie.get(TOKEN.ACCESS);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false); // 비밀번호 변경 완료 여부

  const { mutate: onLogin } = useMutation({
    mutationFn: () => createSignIn({ userId: isValue.id, userPw: isValue.pw }),
    onSuccess: (data) => {
      useCookie.set(TOKEN.ACCESS, data?.accessToken);
      useCookie.set(TOKEN.REFRESH, data?.refreshToken);

      // 비밀번호 변경이 필요하면 모달을 열고 리다이렉트하지 않음
      if (data?.requiresPasswordChange) {
        setIsPasswordChangeOpen(true);
      } else {
        setPasswordChanged(true); // 비밀번호 변경이 필요하지 않으면 바로 완료 상태로
        setAppStatus({ ...appStatus, status: "success" });
        router.push("/calculate/view"); // 비밀번호 변경이 필요 없을 때만 리다이렉트
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.msg ||
        "An unexpected error occurred. Please try again.";
      console.log(errorMessage);
      setIsErr(errorMessage);
    },
  });

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  useEffect(() => {
    // 비밀번호가 변경되지 않았으면 리다이렉트 안 함
    if (isPasswordChangeOpen || !passwordChanged) return;

    // 상태가 성공적이거나 토큰이 존재하는 경우에만 리다이렉트
    if (appStatus.status === "success" || !!accessToken) {
      router.push("/calculate/view");
    }
  }, [appStatus.status, accessToken, isPasswordChangeOpen, passwordChanged, router]);

  return (
    <V.Section>
      <V.Container direction="horizontal">
        <V.Container
          flex={1}
          height="100%"
          minHeight="100vh"
          css={{ [MQ[1]]: { display: "none" } }}
        >
          <Image
            source="/assets/images/login/login.png"
            alt="블로포트"
            objectFit="cover"
            size={{ height: "100%", minHeight: "100vh" }}
          />
        </V.Container>

        <V.Container
          flex={1}
          height="100%"
          minHeight="100vh"
          align="center"
          crossAlign="center"
          padding={{ all: 25 }}
        >
          <V.Column maxWidth={500} align="start">
            <Txt as="h1" size={24}>
              점주용정산시스템 오신 것을 환영합니다
            </Txt>

            <V.Form margin={{ top: 30 }} onSubmit={handleOnSubmit}>
              <Input label="아이디">
                <Input.TextField
                  placeholder="아이디를 입력하세요"
                  value={isValue.id}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setIsValue({ ...isValue, id: e.target.value })
                  }
                />
              </Input>

              <Spacing size={20} />

              <Input label="비밀번호">
                <Input.TextField
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={isValue.pw}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setIsValue({ ...isValue, pw: e.target.value })
                  }
                />
              </Input>

              {!!isErr && (
                <V.Container align="center" margin={{ top: 16 }}>
                  <Txt size={14} color="#888">
                    ⚠️ {isErr}
                  </Txt>
                </V.Container>
              )}

              <Spacing size={30} />

              <Button
                type="submit"
                width="100%"
                disabled={!isValue.id || !isValue.pw}
              >
                로그인
              </Button>
            </V.Form>
          </V.Column>
        </V.Container>
      </V.Container>

      <PasswordChangeModal
        isOpen={isPasswordChangeOpen}
        onClose={() => {
          setIsPasswordChangeOpen(false);
          setPasswordChanged(false); // 비밀번호 변경이 완료되지 않았으므로 false로 설정
        }}
      />
    </V.Section>
  );
};

export default Login;
