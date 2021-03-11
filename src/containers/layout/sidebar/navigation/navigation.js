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
              name: t('sidebar.administration.countries.children.add'),
              to: '/administration/countries/add',
              icon: 'cil-plus',
            },
            {
              _tag: 'CSidebarNavItem',
              name: t('sidebar.administration.countries.children.remove'),
              to: '/administration/countries/remove',
              icon: 'cil-minus',
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
              name: t('sidebar.administration.social.children.add'),
              to: '/administration/social/add',
              icon: 'cil-plus',
            },
            {
              _tag: 'CSidebarNavItem',
              name: t('sidebar.administration.social.children.remove'),
              to: '/administration/social/remove',
              icon: 'cil-minus',
            },
          ],
        },
      ],
    },
  ];

  return array;
};

export default useNavigation;
