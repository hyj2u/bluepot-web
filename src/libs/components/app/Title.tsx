import { Txt, TxtSpan, V } from "@/_ui";

export default function Title({
  as,
  txt,
  description,
}: {
  as: string;
  txt?: string;
  description?: string;
}) {
  return (
    <V.Column gap={10} align="start">
      <Txt as="h1" size={24}>
        {as}{" "}
        {!!txt && (
          <TxtSpan size={15} color="#797979">
            {txt}
          </TxtSpan>
        )}
      </Txt>

      {!!description && (
        <Txt size={14} color="#797979">
          {description}
        </Txt>
      )}
    </V.Column>
  );
}
