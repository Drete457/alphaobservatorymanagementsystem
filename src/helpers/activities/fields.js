const fields = (t) => {
  return [
    { key: 'name', label: t('activities.fields.name.title') },
    { key: 'type', label: t('activities.fields.type.title') },
    { key: 'participants', label: t('activities.fields.participants.title') },
    { key: 'date', label: t('activities.fields.date.title') },
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
