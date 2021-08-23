const useNavigation = (t) => {
  const array = [
    {
      _tag: 'CSidebarNavDropdown',
      name: t('sidebar.home.title'),
      route: '/',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: t('sidebar.home.children.users'),
          to: '/users',
          icon: 'cil-group',
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('sidebar.home.children.activities'),
          to: '/activities_table',
          icon: 'cil-chart-pie',
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
};

export default useNavigation;
