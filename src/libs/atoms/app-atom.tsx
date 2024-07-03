import { atom } from "recoil";

// 메뉴 드로어
export const appDrawerAtom = atom<boolean>({
  key: "drawer-atom",
  default: false,
});
