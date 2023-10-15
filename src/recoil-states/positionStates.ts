import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "./recoilPersistStorage";

export interface PositionDataType {
  coords: {
    x: number;
    y: number;
  };
  address?: string;
}

const { persistAtom } = recoilPersist({
  key: "currentPostion",
  storage: sessionStorage,
});

export const PositionSate = atom<PositionDataType>({
  key: "position",
  default: {
    coords: {
      x: 0,
      y: 0,
    },
    address: "",
  },
  effects_UNSTABLE: [persistAtom],
});
