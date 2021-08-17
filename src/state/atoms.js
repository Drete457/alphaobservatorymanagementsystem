import { atom } from 'recoil';

export const sidebarShow = atom({
  key: 'sidebarShow',
  default: 'responsive',
});

export const asideShow = atom({
  key: 'asideShow',
  default: false,
});

export const user = atom({
  key: 'user',
  default: null,
});

export const countries = atom({
  key: 'countries',
  default: null,
});

export const generic = atom({
  key: 'generic',
  default: null,
});

export const listUsers = atom({
  key: 'listUser',
  default: [],
});
