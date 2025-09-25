import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Button, V, Input, Spacing, Txt } from "@/_ui";

//assets
import { Logo } from "@/libs/assets/icon-color";
import { MQ } from "@/libs/themes";
import { Image } from "react-image-cached-resizer";

//atoms
import { useRecoilState } from "recoil";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";

//hooks
import { useTanstackQuery } from "@/libs/hooks/useTanstackQuery";
import { createSignIn } from "@/_https/auth";
import { useCookie } from "../../libs/hooks/useCookie";
import { TOKEN, getTokenCookieOptions } from "@/libs/utils/enum";

//
export default function Login() {
  const router = useRouter();
  const { useMutation } = useTanstackQuery();
  const [isValue, setIsValue] = useState({ id: "", pw: "" });
  const [isErr, setIsErr] = useState("");
  const [appStatus, setAppStatus] = useRecoilState(appUserStatusAtom);
  const accessToken = useCookie.get(TOKEN.ACCESS);

  const { mutate: onLogin } = useMutation({
    mutationFn: () => createSignIn({ userId: isValue.id, userPw: isValue.pw }),
    onSuccess: (data) => {
      setAppStatus({ ...appStatus, status: "success" });
      console.log("Saving tokens:", data?.accessToken, data?.refreshToken);
      console.log("NEXT_PUBLIC_ENV:", process.env.NEXT_PUBLIC_ENV);
      console.log("Cookie options:", getTokenCookieOptions());
      useCookie.set(TOKEN.ACCESS, data?.accessToken, getTokenCookieOptions());
      useCookie.set(TOKEN.REFRESH, data?.refreshToken, getTokenCookieOptions());
      console.log("Token after save:", useCookie.get(TOKEN.ACCESS));
      router.push("/");
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.msg), setIsErr(err?.response?.data?.msg);
    },
  });

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin();
  };

 // useEffect(() => {
 //  if (appStatus.status === "success" && !!accessToken) router.back();
//}, [appStatus.status]);

useEffect(() => {
  if (appStatus.status === "success" || !!accessToken)
    router.push("/");
}, [appStatus.status, accessToken]);



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
              통합정산시스템에 오신 것을 환영합니다
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
                disabled={(isValue.id && isValue.pw) === ""}
              >
                로그인
              </Button>


                  
            </V.Form>
          </V.Column>
        </V.Container>
      </V.Container>
    </V.Section>
    
  );
}
