import fields from './fields';
import groupAge from './group-age';
import buildUserList from './build-user-list';
import buildUsersListFilter from './build-users-list-filter';
import exportToExcel from './exportToExcel';

const homeHandler = {
  fields,
  groupAge,
  buildUserList,
  buildUsersListFilter,
  exportToExcel,
};

export { default as buildLogin } from './build-login';
export { default as buildUsersListFilter } from './build-users-list-filter';
export default homeHandler;
