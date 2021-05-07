import { selector } from 'recoil';
import { globalActivityList } from './atoms';

export const activityList = selector({
  key: 'activityList',
  get: ({ get }) => get(globalActivityList),
  set: ({ set, get }, newActivity) => {
    const array = get(globalActivityList);
    set(globalActivityList, [...array, newActivity]);
  },
});
