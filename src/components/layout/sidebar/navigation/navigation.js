const useNavigation = (t, hashPass) => {
  const array = [
    {
      _tag: 'CSidebarNavDropdown',
      name: t('sidebar.home.users.title'),
      route: '/users',
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
      route: '/activities',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: t('sidebar.home.activities.children.table'),
          to: '/activities/activities_table',
          icon: 'cil-chart-pie',
        },
        {
          _tag: 'CSidebarNavItem',
          name: t('sidebar.home.activities.children.user'),
          to: '/activities/collaborators_activities_table',
          icon: 'cil-coffee',
        },
      ],
    },
    //reception
    {
      _tag: 'CSidebarNavDropdown',
      name: t('sidebar.reception.title'),
      route: '/reception',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: t('sidebar.reception.children.view'),
          to: '/reception/view',
          icon: 'cil-view-quilt',
        },
        /*   {
          _tag: 'CSidebarNavItem',
          name: t('sidebar.reception.children.registration'),
          to: '/reception/reception_registration',
          icon: 'cil-voice-over-record',
        }, */
      ],
    },
    /*  {
      _tag: 'CSidebarNavDropdown',
      name: t('sidebar.ambit.title'),
      route: '/ambit',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: t('sidebar.ambit.children.manage'),
          to: '/ambit/base_ambit',
          icon: 'cil-stream',
        },
      ],
    }, */
  ];

  if (hashPass) {
    const obj = {
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
    };

    array.push(obj);
  }

  return array;
};

export default useNavigation;
