//TODO: Delete the moment security is done
const securityIsDone = process.env.REACT_APP_IS_SECURITY_DONE === 'true';

const useNavigation = (t) => {
  if (securityIsDone) {
    const array = [
      {
        _tag: 'CSidebarNavDropdown',
        name: t('sidebar.home.users.title'),
        route: '/',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: t('sidebar.home.users.children.table'),
            to: '/users',
            icon: 'cil-group',
          },
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: t('sidebar.home.activities.title'),
        route: '/',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: t('sidebar.home.activities.children.table'),
            to: '/activities_table',
            icon: 'cil-chart-pie',
          },
          {
            _tag: 'CSidebarNavItem',
            name: t('sidebar.home.activities.children.user'),
            to: '/colaborators_activities_table',
            icon: 'cil-coffee',
          },
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: t('sidebar.administration.title'),
        route: '/administration',
        _children: [
          {
            _tag: 'CSidebarNavDropdown',
            name: t('sidebar.administration.countries.title'),
            route: '/administration/countries',
            icon: 'cil-satelite',
            _children: [
              {
                _tag: 'CSidebarNavItem',
                name: t('sidebar.administration.countries.children.manage'),
                to: '/administration/countries',
                icon: 'cil-sitemap',
              },
            ],
          },
          {
            _tag: 'CSidebarNavDropdown',
            name: t('sidebar.administration.generic.title'),
            route: '/administration/generic',
            icon: 'cil-chat-bubble',
            _children: [
              {
                _tag: 'CSidebarNavItem',
                name: t('sidebar.administration.generic.children.manage'),
                to: '/administration/generic',
                icon: 'cil-sitemap',
              },
            ],
          },
        ],
      },
    ];

    return array;
  } else {
    const array = [
      {
        _tag: 'CSidebarNavDropdown',
        name: t('sidebar.home.users.title'),
        route: '/',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: t('sidebar.home.users.children.table'),
            to: '/users',
            icon: 'cil-group',
          },
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: t('sidebar.home.activities.title'),
        route: '/',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: t('sidebar.home.activities.children.table'),
            to: '/activities_table',
            icon: 'cil-chart-pie',
          },
          {
            _tag: 'CSidebarNavItem',
            name: t('sidebar.home.activities.children.user'),
            to: '/colaborators_activities_table',
            icon: 'cil-coffee',
          },
        ],
      },
    ];

    return array;
  }
};

export default useNavigation;
