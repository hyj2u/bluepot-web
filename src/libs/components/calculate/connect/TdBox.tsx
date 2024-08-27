import { TouchableOpacity, Txt, TxtSpan, V } from "@/_ui";
import { colors } from "@/libs/themes";

//components
import Td from "./Td";

//atoms
import { useRecoilValue } from "recoil";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";
import { useRecoilState } from "recoil";
import { openConnectModalAtom } from "@/libs/atoms/calculate/connect";

type Props = {
  data: any;
  storeCode: string;
  gb:
    | "greenlogis"
    | "wavepos"
    | "moneyon"
    | "semplus"
    | "payco"
    | "blueorder"
    | "kepco"
    | "kakao";
};

//
export default function TdBox({ data, storeCode, gb }: Props) {
  const appUserStatus = useRecoilValue(appUserStatusAtom);

  const [isConnectModal, setIsConnectModal] =
    useRecoilState(openConnectModalAtom);

  const boxType: any = () => {
    if (gb === "greenlogis") return "check";
    if (gb === "wavepos") return "check";
    if (gb === "moneyon") return "write";
    if (gb === "semplus") return "check";
    if (gb === "payco") return "check";
    if (gb === "blueorder") return "check";
    if (gb === "kepco") return "write";
    if (gb === "kakao") return "check";
    return "check";
  };

  return (
    <Td>
      {data?.length > 0 && (
        <V.Column gap={6}>
          {data?.map((item: any, i: number) => (
            <V.Row align="start" gap={5}>
              <Dot />

              <Txt size={13} color="#797979">
                {item[gb + "Name"]}
              </Txt>
            </V.Row>
          ))}
        </V.Column>
      )}

      {data?.length == 0 && (
        <>
          {appUserStatus.rule === "ROLE_USER" ? (
            <V.Column height="100%">
              <TxtSpan color="#aaa">- 연결없음</TxtSpan>
            </V.Column>
          ) : (
            <V.Column
              align="center"
              height="100%"
              backgroundColor="#f4f3fc"
              borderRadius={10}
            >
              <TouchableOpacity
                width="100%"
                crossAlign="center"
                padding={{ vertical: 11, horizontal: 8 }}
                onClick={() =>
                  setIsConnectModal({
                    open: true,
                    gb,
                    storeCode,
                    type: boxType(),
                  })
                }
              >
                <Txt color={colors.keyColor} size={13}>
                  연결필요 +
                </Txt>
              </TouchableOpacity>
            </V.Column>
          )}
        </>
      )}
    </Td>
  );
}

const Dot = () => (
  <V.Container
    width="auto"
    minWidth={3}
    minHeight={3}
    borderRadius={10}
    backgroundColor="#aaa"
    margin={{ top: 8 }}
  />
);
