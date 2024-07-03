import { TouchableOpacity, Txt, V } from "@/_ui";
import { viewDetailAtom } from "@/libs/atoms/calculate/view";
import { useRecoilState } from "recoil";

export default function AddTab() {
  const [tData, setTData] = useRecoilState(viewDetailAtom);

  return (
    <V.Container
      align="center"
      padding={{ all: 20 }}
      css={{ "@media print": { display: "none" } }}
    >
      <TouchableOpacity
        crossAlign="center"
        padding={{ vertical: 10, horizontal: 18 }}
        border={{ solid: 1, position: "all", color: "#e2e2e2" }}
        borderRadius={1000}
        onClick={() => {
          if (tData && Array.isArray(tData.extraSupplies)) {
            setTData({
              ...tData,
              extraSupplies: [
                ...tData.extraSupplies,
                {
                  pkey: Math.floor(Math.random() * 100000),
                  item: "",
                  unitPrice: "",
                  quantity: "",
                },
              ],
            });
          } else {
            // Handle case where tData or tData.extraSupplies is not as expected
            setTData({
              ...tData,
              extraSupplies: [
                {
                  pkey: Math.floor(Math.random() * 100000),
                  item: "",
                  unitPrice: "",
                  quantity: "",
                },
              ],
            });
          }
        }}
      >
        <Txt size={14} color="#797979">
          + 비품 추가하기
        </Txt>
      </TouchableOpacity>
    </V.Container>
  );
}
