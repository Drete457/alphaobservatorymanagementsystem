const useNavigation = () => {
  const array = [
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Test1',
      route: '/users',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'test1-children',
          to: '/users/allusers',
          icon: '',
        },
      ],
    },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'test2',
      route: '/settings',
      _children: [
        {
          _tag: 'CSidebarNavDropdown',
          name: 'test2-children',
          route: '/settings/users',
          icon: '',
          _children: [
            {
              _tag: 'CSidebarNavItem',
              name: 'test2-children2',
              to: '/settings/users/formula',
              icon: '',
            },
          ],
        },
      ],
    },
  ];

  return array;
};

export default useNavigation;
