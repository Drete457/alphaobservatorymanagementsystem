import { lazy } from 'react';

const Home = lazy(() => import('views/home'));
const Build = lazy(() => import('views/build'));
const Users = lazy(() => import('views/users'));
const MyProfile = lazy(() => import('views/my-profile'));
const UserRegistration = lazy(() => import('views/user/user-registration'));
const UserEdition = lazy(() => import('views/user/user-edition'));
const UserView = lazy(() => import('views/user/user-view'));
const CardsView = lazy(() => import('views/user/cards'));
const ActivitiesTable = lazy(() => import('views/activities/activities-table'));
const CollaboratorsTable = lazy(() =>
  import('views/activities/collaborators-table'),
);
const NewActivity = lazy(() => import('views/activities/new-activity'));
const ViewActivity = lazy(() => import('views/activities/view-activity'));
const EditActivity = lazy(() => import('views/activities/edit-activity'));
const TableImport = lazy(() => import('views/table-import'));
const Countries = lazy(() => import('views/administration/countries'));
const Generic = lazy(() => import('views/administration/generic'));
const Logs = lazy(() => import('views/logs'));
const ReceptionRegistration = lazy(() =>
  import('views/reception/reception-registration'),
);
const ReceptionEdit = lazy(() => import('views/reception/reception-edit'));
const ReceptionView = lazy(() => import('views/reception/reception-view'));
const ErrorsLogs = lazy(() => import('views/errors'));
const Ambit = lazy(() => import('views/ambit'));

const routes = [
  { path: '/', exact: true, name: 'Alpha', component: Home },
  { path: '/construction', exact: true, name: 'Build', component: Build },
  { path: '/cards/:id', exact: true, name: 'Cards', component: CardsView },
  { path: '/users', exact: true, name: 'Collaborators', component: Users },
  {
    path: '/my-profile',
    exact: true,
    name: 'My Profile',
    component: MyProfile,
  },
  {
    path: '/user/new_user',
    exact: true,
    name: 'Collaborator Registration',
    component: UserRegistration,
  },
  {
    path: '/user/edition/:page/:id',
    exact: true,
    name: 'Collaborator Edit',
    component: UserEdition,
  },
  {
    path: '/user/view/:id',
    exact: true,
    name: 'Collaborator View',
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
    path: '/activities/collaborators_activities_table',
    exact: true,
    name: 'Collaborators Activities Table',
    component: CollaboratorsTable,
  },
  {
    path: '/table_import',
    exact: true,
    name: 'Table Import',
    component: TableImport,
  },
  {
    path: '/collaborators',
    exact: true,
    name: 'View Logs Collaborators',
    component: Logs,
  },
  {
    path: '/entries',
    exact: true,
    name: 'View Logs Entries',
    component: Logs,
  },
  {
    path: '/errors',
    exact: true,
    name: 'View Logs Errors',
    component: ErrorsLogs,
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
    component: ReceptionRegistration,
  },
  {
    path: '/reception/reception_edit/:id',
    exact: true,
    name: 'Edition',
    component: ReceptionEdit,
  },
  {
    path: '/reception/view',
    exact: true,
    name: 'View',
    component: ReceptionView,
  },
  {
    path: '/ambit',
    exact: true,
    name: 'Ambit',
  },
  {
    path: '/ambit/base_ambit',
    exact: true,
    name: 'Base Ambit',
    component: Ambit,
  },
];

export default routes;
