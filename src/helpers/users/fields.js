const fields = (t) => {
  return [
    {
      key: 'view',
      label: '',
      _style: { width: '5%' },
      sorter: false,
      filter: false,
    },
    {
      key: 'name',
      label: t('user.fields.name.title'),
      _style: { width: '10vw' },
    },
    {
      key: 'followed',
      label: t('user.fields.followed.title'),
      _style: { width: '10vw' },
    },
    {
      key: 'country',
      label: t('user.fields.country.title'),
      _style: { width: '10vw' },
    },
    {
      key: 'socialInfo',
      label: t('user.fields.social.title'),
      _style: { width: '10vw' },
    },
    {
      key: 'firstActivity',
      label: t('user.fields.firstActivity.title'),
      _style: { width: '6vw' },
    },
    {
      key: 'training',
      label: t('user.fields.training.title'),
      _style: { width: '6vw' },
    },
    {
      key: 'personality',
      label: t('user.fields.personality.title'),
      _style: { width: '6vw' },
    },
    {
      key: 'second',
      label: t('user.fields.second.title'),
      _style: { width: '6vw' },
    },
    {
      key: 'introductionOption',
      label: t('user.fields.introduction.option.title'),
    },
    {
      key: 'cardsInfo',
      label: t('user.fields.cards.title'),
      _style: { width: '6vw' },
    },
    {
      key: 'baseAmbit',
      label: t('user.fields.ambit.entry'),
      _style: { width: '6vw' },
    },
    {
      key: 'contacted',
      label: t('user.fields.contacted.title'),
      _style: { width: '10vw' },
    },
    {
      key: 'gender',
      label: t('user.fields.gender.title'),
      _style: { width: '6vw' },
    },
    {
      key: 'groupAge',
      label: t('user.fields.groupAge.title'),
      _style: { width: '6vw' },
    },
    {
      key: 'employment',
      label: t('user.fields.employment.title'),
      _style: { width: '6vw' },
    },
  ];
};

export default fields;
