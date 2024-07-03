import { V, Txt } from "@/_ui";

export default function TheadContainer() {
  return (
    <V.Row>
      <ThContainer width={150} th="년도/월" />
      <ThContainer width={240} th="제목" />
      <ThContainer width={250} th="매장명" />
      <ThContainer width={120} th="점주명" />
      <ThContainer width={140} th="정산금" />
      <ThContainer width={130} th="등록일" />
      <ThContainer width={140} th="정산상태" />
    </V.Row>
  );
}

const ThContainer = (props: { width: number; th: string }) => (
  <V.Container
    padding={{ all: 8 }}
    minWidth={props.width}
    maxWidth={props.width}
    backgroundColor="#f8f8f8"
    align="center"
    {...(props as any)}
  >
    <Txt size={13} color="#888" ellipsis={{ ellipsis: true, line: 1 }}>
      {props.th}
    </Txt>
  </V.Container>
);
