import { Txt, V } from "@/_ui";

//atoms
import { choiceCategoryOption } from "@/libs/atoms/calculate/edit";
import { useRecoilState } from "recoil";

//
export const Td = ({ value, category }: { value: any; category: any }) => {
  const [choiceCategory, setChoiceCategory] =
    useRecoilState(choiceCategoryOption);

  return (
    <V.Container
      padding={{ all: 11 }}
      minWidth={106}
      height="100%"
      maxWidth={106}
      border={{ solid: 1, position: "bottom", color: "#e2e2e2" }}
      align="center"
      crossAlign="center"
      backgroundColor={choiceCategory === category ? "#f8f9fc" : "#fff"}
    >
      <Txt size={13} color="#555">
        {value}
      </Txt>
    </V.Container>
  );
};
