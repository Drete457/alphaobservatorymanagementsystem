const fields = (t) => {
  return [
    {
      key: 'name',
      label: t('user.fields.name.title'),
    },
    {
      key: 'contacted',
      label: t('user.fields.contacted.title'),
    },
    {
      key: 'country',
      label: t('user.fields.country.title'),
    },
    {
      key: 'timezone',
      label: t('user.fields.hour.title'),
    },
    {
      key: 'socialInfo',
      label: t('user.fields.social.title'),
    },
    {
      key: 'groupAge',
      label: t('user.fields.groupAge.title'),
    },
    {
      key: 'employment',
      label: t('user.fields.employment.title'),
    },
    {
      key: 'gender',
      label: t('user.fields.gender.title'),
    },
    {
      key: 'personality',
      label: t('user.fields.personality.title'),
    },
    {
      key: 'createDate',
      label: t('user.fields.createDate.title'),
    },
  ];
};

export default fields;
