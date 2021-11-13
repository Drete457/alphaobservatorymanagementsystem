const fields = (t) => {
  return [
    {
      key: 'name',
      label: t('user.fields.name.title'),
      _style: { width: '15%' },
    },
    {
      key: 'contacted',
      label: t('user.fields.contacted.title'),
      _style: { width: '15%' },
    },
    {
      key: 'country',
      label: t('user.fields.country.title'),
      _style: { width: '10%' },
    },
    {
      key: 'timezone',
      label: t('user.fields.hour.title'),
    },
    {
      key: 'socialInfo',
      label: t('user.fields.social.title'),
      _style: { width: '10%' },
    },
    {
      key: 'groupAge',
      label: t('user.fields.groupAge.title'),
      _style: { width: '6%' },
    },
    {
      key: 'employment',
      label: t('user.fields.employment.title'),
      _style: { width: '6%' },
    },
    {
      key: 'gender',
      label: t('user.fields.gender.title'),
      _style: { width: '6%' },
    },
    {
      key: 'personality',
      label: t('user.fields.personality.title'),
      _style: { width: '6%' },
    },
    {
      key: 'createDate',
      label: t('user.fields.createDate.title'),
      _style: { width: '6%' },
    },
  ];
};

export default fields;
