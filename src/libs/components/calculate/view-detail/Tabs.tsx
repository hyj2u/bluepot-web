import { Button, P, TouchableOpacity, Txt, V } from "@/_ui";
import { printActiveAtom, viewDetailAtom } from "@/libs/atoms/calculate/view";
import { colors } from "@/libs/themes";
import { useRouter } from "next/router";
import { ForwardedRef, forwardRef } from "react";
import ReactToPrint from "react-to-print";
import { useRecoilValue } from "recoil";
import { appUserStatusAtom } from "@/libs/atoms/auth-atom";

const Tabs = forwardRef(
  (
    { handleOnUpdate }: { handleOnUpdate: any },
    ref: ForwardedRef<HTMLDivElement> | any
  ) => {
    const router = useRouter();
    const printActive = useRecoilValue(printActiveAtom);
    const detailData = useRecoilValue(viewDetailAtom);
    const appStatus = useRecoilValue(appUserStatusAtom);
    console.log(appStatus.rule);
    return (
      <P.BottomFixed height={80} padding={{ horizontal: 20 }}>
        <V.Row gap={8} maxWidth={440}>
          <TouchableOpacity
            minHeight={56}
            width={
              detailData.settlementTotal.closedYn === "Y" ? "100%" : "auto"
            }
            minWidth={100}
            crossAlign="center"
            padding={{ vertical: 13, horizontal: 16 }}
            backgroundColor={colors.chiffon400}
            txtColor="#797979"
            onClick={() => router.back()}
            txtSize={15}
            borderRadius={16}
          >
            목록으로
          </TouchableOpacity>

          {!printActive && (
            <ReactToPrint
              trigger={() => (
                <TouchableOpacity
                  minHeight={56}
                  minWidth={100}
                  width={
                    detailData.settlementTotal.closedYn === "Y"
                      ? "100%"
                      : "auto"
                  }
                  crossAlign="center"
                  padding={{ vertical: 13, horizontal: 16 }}
                  txtSize={15}
                  backgroundColor="#E1EAF2"
                  borderRadius={16}
                >
                  인쇄
                </TouchableOpacity>
              )}
              content={() => (ref?.current ? ref?.current : undefined)}
            />
          )}

          {(detailData.settlementTotal.closedYn === "N" &&  appStatus.rule!=="ROLE_ACCOUNTANT")&& (
            <Button
              width="100%"
              borderRadius={16}
              onClick={() => handleOnUpdate()}
            >
              정산서 수정
            </Button>
          )}
        </V.Row>
      </P.BottomFixed>
    );
  }
);

export { Tabs };
