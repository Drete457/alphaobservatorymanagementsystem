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
              to: '/administration/countries/manage',
              icon: 'cil-sitemap',
            },
          ],
        },
        {
          _tag: 'CSidebarNavDropdown',
          name: t('sidebar.administration.social.title'),
          route: '/administration/social',
          icon: 'cil-chat-bubble',
          _children: [
            {
              _tag: 'CSidebarNavItem',
              name: t('sidebar.administration.social.children.manage'),
              to: '/administration/social/manage',
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
