import { V, TxtSpan } from "@/_ui";

export default function TheadContainer() {
  return (
    <V.Row>
      {[
        "상호",
        "물류",
        "웨이브포스",
        "머니온",
        "샘플러스",
        "페이코",
        "시크릿오더",
        "한전온",
        "카카오",
      ].map((item, i) => (
        <V.Container
          key={i}
          padding={{ all: 8 }}
          minWidth={160}
          maxWidth={160}
          backgroundColor="#f8f8f8"
          align="center"
        >
          <TxtSpan size={13} color="#888">
            {item}
          </TxtSpan>
        </V.Container>
      ))}
    </V.Row>
  );
}
