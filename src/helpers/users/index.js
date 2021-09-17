import fields from './fields';
import groupAge from './group-age';
import buildUserList from './build-user-list';
import buildUsersListFilter from './build-users-list-filter';
import exportToExcel from './exportToExcel';
import sortList from './sort-list';
import mainTableSortList from './main-table-sort-list';

const homeHandler = {
  fields,
  groupAge,
  buildUserList,
  buildUsersListFilter,
  exportToExcel,
  sortList,
  mainTableSortList,
};

export { default as buildLogin } from './build-login';
export { default as buildUsersListFilter } from './build-users-list-filter';
export default homeHandler;
