import { V, Txt } from "@/_ui";
export default function NoneDataResult({ title }: { title: string }) {
  return (
    <V.Column
      align="center"
      padding={{ all: 25 }}
      backgroundColor="#f8f8f8"
      borderRadius={12}
    >
      <Txt size={14} color="#666">
        {title}
      </Txt>
    </V.Column>
  );
}
