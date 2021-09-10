const fields = (t) => {
  return [
    { key: 'name', label: t('user.fields.name.title') },
    { key: 'followed', label: t('user.fields.followed.title') },
    { key: 'contacted', label: t('user.fields.contacted.title') },
    { key: 'country', label: t('user.fields.country.title') },
    { key: 'training', label: t('user.fields.training.title') },
    { key: 'second', label: t('user.fields.second.title') },
    {
      key: 'introductionOption',
      label: t('user.fields.introduction.option.title'),
    },
    { key: 'baseAmbit', label: t('user.fields.ambit.entry') },
    { key: 'activities', label: t('user.fields.activities.title') },
    {
      key: 'view',
      label: '',
      _style: { width: '5%' },
      sorter: false,
      filter: false,
    },
  ];
};

export default fields;
