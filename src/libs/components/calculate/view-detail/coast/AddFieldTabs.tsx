import { TouchableOpacity, Txt, V } from "@/_ui";
import {
  addTableFieldsAtom,
  viewDetailAtom,
} from "@/libs/atoms/calculate/view";
import { colors } from "@/libs/themes";
import { useRecoilState } from "recoil";

type Props = {
  name: string;
  category: "a1" | "b1" | "b3" | "b4" | "c1" | "c2" | "d1" | "d2" | "d3";
};

export default function AddFieldTab({ name, category }: Props) {
  const [tData, setTData] = useRecoilState(viewDetailAtom);
  const { settlementTotal } = tData ?? {};
  const [addFields, setAddFields] = useRecoilState(addTableFieldsAtom);

  const onCreateAddField = () => {
    if (category === "a1") {
      if (!addFields?.includes("a1extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("a1extra1")) return prevFields;
          return [...prevFields, "a1extra1"];
        });
      } else if (!addFields?.includes("a1extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("a1extra2")) return prevFields;
          return [...prevFields, "a1extra2"];
        });
      } else if (!addFields?.includes("a1extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("a1extra3")) return prevFields;
          return [...prevFields, "a1extra3"];
        });
      } else if (!addFields?.includes("a1extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("a1extra4")) return prevFields;
          return [...prevFields, "a1extra4"];
        });
      } else if (!addFields?.includes("a1extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("a1extra5")) return prevFields;
          return [...prevFields, "a1extra5"];
        });
      } else return;
    }

    if (category === "b1") {
      if (!addFields?.includes("b1extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b1extra1")) return prevFields;
          return [...prevFields, "b1extra1"];
        });
      } else if (!addFields?.includes("b1extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b1extra2")) return prevFields;
          return [...prevFields, "b1extra2"];
        });
      } else if (!addFields?.includes("b1extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b1extra3")) return prevFields;
          return [...prevFields, "b1extra3"];
        });
      } else if (!addFields?.includes("b1extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b1extra4")) return prevFields;
          return [...prevFields, "b1extra4"];
        });
      } else if (!addFields?.includes("b1extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b1extra5")) return prevFields;
          return [...prevFields, "b1extra5"];
        });
      } else return;
    }

    if (category === "b3") {
      if (!addFields?.includes("b3extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b3extra1")) return prevFields;
          return [...prevFields, "b3extra1"];
        });
      } else if (!addFields?.includes("b3extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b3extra2")) return prevFields;
          return [...prevFields, "b3extra2"];
        });
      } else if (!addFields?.includes("b3extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b3extra3")) return prevFields;
          return [...prevFields, "b3extra3"];
        });
      } else if (!addFields?.includes("b3extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b3extra4")) return prevFields;
          return [...prevFields, "b3extra4"];
        });
      } else if (!addFields?.includes("b3extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b3extra5")) return prevFields;
          return [...prevFields, "b3extra5"];
        });
      } else return;
    }

    if (category === "b4") {
      if (!addFields?.includes("b4extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b4extra1")) return prevFields;
          return [...prevFields, "b4extra1"];
        });
      } else if (!addFields?.includes("b4extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b4extra2")) return prevFields;
          return [...prevFields, "b4extra2"];
        });
      } else if (!addFields?.includes("b4extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b4extra3")) return prevFields;
          return [...prevFields, "b4extra3"];
        });
      } else if (!addFields?.includes("b4extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b4extra4")) return prevFields;
          return [...prevFields, "b4extra4"];
        });
      } else if (!addFields?.includes("b4extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("b4extra5")) return prevFields;
          return [...prevFields, "b4extra5"];
        });
      } else return;
    }

    if (category === "c1") {
      if (!addFields?.includes("c1extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c1extra1")) return prevFields;
          return [...prevFields, "c1extra1"];
        });
      } else if (!addFields?.includes("c1extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c1extra2")) return prevFields;
          return [...prevFields, "c1extra2"];
        });
      } else if (!addFields?.includes("c1extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c1extra3")) return prevFields;
          return [...prevFields, "c1extra3"];
        });
      } else if (!addFields?.includes("c1extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c1extra4")) return prevFields;
          return [...prevFields, "c1extra4"];
        });
      } else if (!addFields?.includes("c1extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c1extra5")) return prevFields;
          return [...prevFields, "c1extra5"];
        });
      } else return;
    }

    if (category === "c2") {
      if (!addFields?.includes("c2extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c2extra1")) return prevFields;
          return [...prevFields, "c2extra1"];
        });
      } else if (!addFields?.includes("c2extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c2extra2")) return prevFields;
          return [...prevFields, "c2extra2"];
        });
      } else if (!addFields?.includes("c2extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c2extra3")) return prevFields;
          return [...prevFields, "c2extra3"];
        });
      } else if (!addFields?.includes("c2extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c2extra4")) return prevFields;
          return [...prevFields, "c2extra4"];
        });
      } else if (!addFields?.includes("c2extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("c2extra5")) return prevFields;
          return [...prevFields, "c2extra5"];
        });
      } else return;
    }

    if (category === "d1") {
      if (!addFields?.includes("d1extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d1extra1")) return prevFields;
          return [...prevFields, "d1extra1"];
        });
      } else if (!addFields?.includes("d1extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d1extra2")) return prevFields;
          return [...prevFields, "d1extra2"];
        });
      } else if (!addFields?.includes("d1extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d1extra3")) return prevFields;
          return [...prevFields, "d1extra3"];
        });
      } else if (!addFields?.includes("d1extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d1extra4")) return prevFields;
          return [...prevFields, "d1extra4"];
        });
      } else if (!addFields?.includes("d1extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d1extra5")) return prevFields;
          return [...prevFields, "d1extra5"];
        });
      } else return;
    }

    if (category === "d2") {
      if (!addFields?.includes("d2extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d2extra1")) return prevFields;
          return [...prevFields, "d2extra1"];
        });
      } else if (!addFields?.includes("d2extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d2extra2")) return prevFields;
          return [...prevFields, "d2extra2"];
        });
      } else if (!addFields?.includes("d2extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d2extra3")) return prevFields;
          return [...prevFields, "d2extra3"];
        });
      } else if (!addFields?.includes("d2extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d2extra4")) return prevFields;
          return [...prevFields, "d2extra4"];
        });
      } else if (!addFields?.includes("d2extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d2extra5")) return prevFields;
          return [...prevFields, "d2extra5"];
        });
      } else return;
    }

    if (category === "d3") {
      if (!addFields?.includes("d3extra1")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d3extra1")) return prevFields;
          return [...prevFields, "d3extra1"];
        });
      } else if (!addFields?.includes("d3extra2")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d3extra2")) return prevFields;
          return [...prevFields, "d3extra2"];
        });
      } else if (!addFields?.includes("d3extra3")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d3extra3")) return prevFields;
          return [...prevFields, "d3extra3"];
        });
      } else if (!addFields?.includes("d3extra4")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d3extra4")) return prevFields;
          return [...prevFields, "d3extra4"];
        });
      } else if (!addFields?.includes("d3extra5")) {
        setAddFields((prevFields) => {
          if (prevFields.includes("d3extra5")) return prevFields;
          return [...prevFields, "d3extra5"];
        });
      } else return;
    }
  };

  return (
    <V.Container
      align="center"
      padding={{ all: 10 }}
      backgroundColor="#fff"
      css={{
        borderBottom: "1px solid #e2e2e2",
        "@media print": { display: "none" },
      }}
    >
      <TouchableOpacity
        crossAlign="center"
        backgroundColor="#f7f7f7"
        padding={{ vertical: 11, horizontal: 20 }}
        borderRadius={100}
        onClick={() => onCreateAddField()}
      >
        <Txt size={14} color="#797979">
          + {name} 추가
        </Txt>
      </TouchableOpacity>
    </V.Container>
  );
}
