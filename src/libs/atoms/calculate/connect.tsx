import { atom } from "recoil";

type Props = {
  open: boolean;
  type: "check" | "write";
  storeCode: string;
  gb?:
    | "greenlogis"
    | "wavepos"
    | "moneyon"
    | "semplus"
    | "payco"
    | "blueorder"
    | "kepco"
    | "kakao";
};

export const initialConnectModalData: Props = {
  open: false,
  type: "check",
  storeCode: "",
  gb: "greenlogis",
};

export const openConnectModalAtom = atom<Props>({
  key: "calculate-connect-modal-atom",
  default: initialConnectModalData as Props,
});
