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
const ColaboratorsTable = lazy(() =>
  import('views/activities/colaborators-table'),
);
const NewActivity = lazy(() => import('views/activities/new-activity'));
const ViewActivity = lazy(() => import('views/activities/view-activity'));
const EditActivity = lazy(() => import('views/activities/edit-activity'));
const TableImport = lazy(() => import('views/table-import'));
const Countries = lazy(() => import('views/administration/countries'));
const Generic = lazy(() => import('views/administration/generic'));
const Logs = lazy(() => import('views/logs'));
const RepectionRegistration = lazy(() =>
  import('views/reception/reception-registration'),
);
const RepectionEdit = lazy(() => import('views/reception/reception-edit'));
const RepectionView = lazy(() => import('views/reception/reception-view'));

const routes = [
  { path: '/', exact: true, name: 'Alpha', component: Home },
  { path: '/construction', exact: true, name: 'Build', component: Build },
  { path: '/cards/:id', exact: true, name: 'Cards', component: CardsView },
  { path: '/users', exact: true, name: 'Colaborators', component: Users },
  {
    path: '/my-profile',
    exact: true,
    name: 'My Profile',
    component: MyProfile,
  },
  {
    path: '/user/new_user',
    exact: true,
    name: 'Colaborator Registration',
    component: UserRegistraion,
  },
  {
    path: '/user/edition/:page/:id',
    exact: true,
    name: 'Colaborator Edit',
    component: UserEdition,
  },
  {
    path: '/user/view/:id',
    exact: true,
    name: 'Colaborator View',
    component: UserView,
  },
  {
    path: '/activities/activities_table',
    exact: true,
    name: 'Activities Table',
    component: ActivitiesTable,
  },
  {
    path: '/activities/activities_table/new',
    exact: true,
    name: 'New Activity',
    component: NewActivity,
  },
  {
    path: '/activities/activities_table/view/:id',
    exact: true,
    name: 'View Activity',
    component: ViewActivity,
  },
  {
    path: '/activities/activities_table/edit/:id',
    exact: true,
    name: 'Edit Activity',
    component: EditActivity,
  },
  {
    path: '/activities/colaborators_activities_table',
    exact: true,
    name: 'Colaborators Activities Table',
    component: ColaboratorsTable,
  },
  {
    path: '/table_import',
    exact: true,
    name: 'Table Import',
    component: TableImport,
  },
  {
    path: '/logs',
    exact: true,
    name: 'View Logs',
    component: Logs,
  },
  {
    path: '/administration/countries',
    exact: true,
    name: 'Countries',
    component: Countries,
  },
  {
    path: '/administration/generic',
    exact: true,
    name: 'Generic',
    component: Generic,
  },
  {
    path: '/reception',
    exact: true,
    name: 'Reception',
  },
  {
    path: '/reception/reception_registration',
    exact: true,
    name: 'Registration',
    component: RepectionRegistration,
  },
  {
    path: '/reception/reception_edit/:id',
    exact: true,
    name: 'Edition',
    component: RepectionEdit,
  },
  {
    path: '/reception/view',
    exact: true,
    name: 'View',
    component: RepectionView,
  },
];

export default routes;
