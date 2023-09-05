import { atom } from 'recoil';

export const tesRecoil = atom<{
  item: string;
}>({
  key: `test`,
  default: { item: '' },
});
