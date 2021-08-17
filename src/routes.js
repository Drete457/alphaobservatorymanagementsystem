import { lazy } from 'react';

const Home = lazy(() => import('views/home'));
const Build = lazy(() => import('views/build'));
const Users = lazy(() => import('views/users'));
const MyProfile = lazy(() => import('views/my-profile'));
const UserRegistraion = lazy(() => import('views/user/user-registration'));
const UserEdition = lazy(() => import('views/user/user-edition'));
const UserView = lazy(() => import('views/user/user-view'));
const ActivitiesTable = lazy(() => import('views/activities/activities-table'));
const NewActivity = lazy(() => import('views/activities/new-activity'));
const ViewActivity = lazy(() => import('views/activities/view-activity'));
const CardsView = lazy(() => import('views/user/cards'));
const TableImport = lazy(() => import('views/table-import'));

const routes = [
  { path: '/', exact: true, name: 'Alpha', component: Home },
  { path: '/construction', exact: true, name: 'Build', component: Build },
  { path: '/cards/:id', exact: true, name: 'Cards', component: CardsView },
  { path: '/users', exact: true, name: 'Users', component: Users },
  {
    path: '/my-profile',
    exact: true,
    name: 'My Profile',
    component: MyProfile,
  },
  {
    path: '/user/new_user',
    exact: true,
    name: 'User Registration',
    component: UserRegistraion,
  },
  {
    path: '/user/edition/:id',
    exact: true,
    name: 'User Edit',
    component: UserEdition,
  },
  {
    path: '/user/view/:id',
    exact: true,
    name: 'User View',
    component: UserView,
  },
  {
    path: '/activities_table',
    exact: true,
    name: 'Activities Table',
    component: ActivitiesTable,
  },
  {
    path: '/activities_table/new_activity',
    exact: true,
    name: 'New Activity',
    component: NewActivity,
  },
  {
    path: '/activities_table/viw_activity',
    exact: true,
    name: 'View Activity',
    component: ViewActivity,
  },
  {
    path: '/table_import',
    exact: true,
    name: 'Table Import',
    component: TableImport,
  },
];

export default routes;
