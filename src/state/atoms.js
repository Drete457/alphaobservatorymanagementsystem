import { atom } from 'recoil';

export const sidebarShow = atom({
  key: 'sidebarShow',
  default: 'responsive',
});

export const asideShow = atom({
  key: 'asideShow',
  default: false,
});

export const token = atom({
  key: 'token',
  default: '',
});

export const user = atom({
  key: 'user',
  default: {},
});
