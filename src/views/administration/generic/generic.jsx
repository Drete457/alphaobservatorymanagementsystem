import { useState, useLayoutEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetGeneric } from 'hooks/generic';
import TabsViews from 'components/administration/generic/views';
import ErrorInfo from 'components/error';
import Loading from 'components/loading';
import Tabs from 'components/administration/generic/tabs';

const Generic = () => {
  const [t] = useTranslation();

  const [generic, setGeneric] = useState({});
  const [active, setActive] = useState(0);
  const [isEdit, setIsEdit] = useState({});
  const [wasModified, setWasModified] = useState(false);

  const { isLoading, error, data, execute } = useGetGeneric();

  useLayoutEffect(() => {
    execute();
  }, [execute]);

  useLayoutEffect(() => {
    if (data) {
      const isEditBuild = {};

      for (let key in data) {
        isEditBuild[key] = true;
      }

      setIsEdit(isEditBuild);
      setGeneric(data);
    }
  }, [data]);
  console.log(generic);
  console.log(isEdit);
  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <>
          <Prompt
            when={wasModified}
            message={() => t('pages.user.leaving-the-page')}
          />
          <Tabs active={active} setActive={setActive} />
          {active === 0 && (
            <TabsViews.Activities
              activities={generic?.activitiesType}
              isEdit={isEdit}
              setWasModified={setWasModified}
              options={generic?.options}
            />
          )}
          {active === 1 && <p>1</p>}
          {active === 2 && (
            <TabsViews.Generic
              generic={generic?.ocupation}
              type="ocupation"
              title={t('pages.generic.ocupation.title')}
              inputTitle={t('generic.ocupation.name')}
              inputPlaceHolder={t('generic.ocupation.placeholder')}
              isEdit={isEdit}
              setWasModified={setWasModified}
            />
          )}
          {active === 3 && (
            <TabsViews.Generic
              generic={generic?.personality}
              type="personality"
              title={t('pages.generic.personality.title')}
              inputTitle={t('generic.personality.name')}
              inputPlaceHolder={t('generic.personality.placeholder')}
              isEdit={isEdit}
              setWasModified={setWasModified}
            />
          )}
          {active === 4 && (
            <TabsViews.Generic
              generic={generic?.socialmedia}
              type="socialmedia"
              title={t('pages.generic.social-media.title')}
              inputTitle={t('generic.social-media.name')}
              inputPlaceHolder={t('generic.social-media.placeholder')}
              isEdit={isEdit}
              setWasModified={setWasModified}
            />
          )}
          {active === 5 && (
            <TabsViews.Generic
              generic={generic?.years}
              type="years"
              title={t('pages.generic.years.title')}
              inputTitle={t('generic.years.name')}
              inputPlaceHolder={t('generic.years.placeholder')}
              isEdit={isEdit}
              setWasModified={setWasModified}
            />
          )}
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Generic;
