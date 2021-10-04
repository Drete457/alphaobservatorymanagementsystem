const fields = (t) => {
  return [
    { key: 'name', label: t('user.fields.name.title') },
    { key: 'followed', label: t('user.fields.followed.title') },
    {
      key: 'view',
      label: '',
      _style: { width: '5%' },
      sorter: false,
      filter: false,
    },
    { key: 'country', label: t('user.fields.country.title') },
    { key: 'socialInfo', label: t('user.fields.social.title') },
    { key: 'firstActivity', label: t('user.fields.firstActivity.title') },
    { key: 'training', label: t('user.fields.training.title') },
    { key: 'personality', label: t('user.fields.personality.title') },
    { key: 'second', label: t('user.fields.second.title') },
    {
      key: 'introductionOption',
      label: t('user.fields.introduction.option.title'),
    },
    { key: 'cardsInfo', label: t('user.fields.cards.title') },
    { key: 'baseAmbit', label: t('user.fields.ambit.entry') },
    { key: 'contacted', label: t('user.fields.contacted.title') },
    { key: 'gender', label: t('user.fields.gender.title') },
    { key: 'groupAge', label: t('user.fields.groupAge.title') },
    { key: 'employment', label: t('user.fields.employment.title') },
  ];
};

export default fields;
