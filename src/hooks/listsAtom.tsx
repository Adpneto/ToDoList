// src/recoil/listsAtom.ts
import { List } from '@/interfaces/ListData';
import { atom } from 'recoil';

export const listsAtom = atom<List[]>({
  key: 'listsAtom',
  default: [], // O valor padrão pode ser um array vazio
});
