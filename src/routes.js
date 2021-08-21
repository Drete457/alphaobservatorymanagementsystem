import { lazy } from 'react';

const Home = lazy(() => import('views/home'));
const Build = lazy(() => import('views/build'));
const Users = lazy(() => import('views/users'));
const MyProfile = lazy(() => import('views/my-profile'));
const UserRegistraion = lazy(() => import('views/user/user-registration'));
const UserEdition = lazy(() => import('views/user/user-edition'));
const UserView = lazy(() => import('views/user/user-view'));
const CardsView = lazy(() => import('views/user/cards'));
const ActivitiesTable = lazy(() => import('views/activities/activities-table'));
const NewActivity = lazy(() => import('views/activities/new-activity'));
const ViewActivity = lazy(() => import('views/activities/view-activity'));
const EditActivity = lazy(() => import('views/activities/edit-activity'));
const TableImport = lazy(() => import('views/table-import'));
const Countries = lazy(() => import('views/administration/countries'));

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
    path: '/activities_table/new',
    exact: true,
    name: 'New Activity',
    component: NewActivity,
  },
  {
    path: '/activities_table/view/:id',
    exact: true,
    name: 'View Activity',
    component: ViewActivity,
  },
  {
    path: '/activities_table/edit/:id',
    exact: true,
    name: 'Edit Activity',
    component: EditActivity,
  },
  {
    path: '/table_import',
    exact: true,
    name: 'Table Import',
    component: TableImport,
  },
  {
    path: '/administration/countries',
    exact: true,
    name: 'Countries',
    component: Countries,
  },
];

export default routes;
