import { LoadingSpinner, Spacing, Txt, V } from "@/_ui";
import { Logo } from "@/libs/assets/icon-color";

export default function LoadingInfoBox() {
  return (
    <V.Column
      height="100%"
      padding={{ horizontal: 20, top: 50, bottom: 50 }}
      align="center"
      crossAlign="center"
      borderRadius={16}
    >
      <LoadingSpinner size={30} />

      <Spacing size={16} />

      <Txt as="strong" size={20}>
        잠시만 기다려주세요
      </Txt>

      <Spacing size={8} />

      <Txt size={14} color="#888">
        페이지 로딩까지 시간이 소요될 수 있습니다 ...
      </Txt>

      <Spacing size={30} />

      <V.Column width="auto" css={{ opacity: 0.4 }}>
        <Logo />
      </V.Column>
    </V.Column>
  );
}