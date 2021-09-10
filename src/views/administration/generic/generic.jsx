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
  const [originalData, setOriginalData] = useState({});
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
        isEditBuild[key] = false;
      }

      setIsEdit(isEditBuild);
      setGeneric(data);
      setOriginalData(data);
    }
  }, [data]);

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
              type="activitiesType"
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setWasModified={setWasModified}
              options={generic?.options}
              genericList={generic}
              setGeneric={setGeneric}
              originalData={originalData}
              setOriginalData={setOriginalData}
            />
          )}
          {active === 1 && (
            <TabsViews.CardType
              cards={generic?.cardTypes}
              type="cardTypes"
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setWasModified={setWasModified}
              genericList={generic}
              setGeneric={setGeneric}
              originalData={originalData}
              setOriginalData={setOriginalData}
            />
          )}
          {active === 2 && (
            <TabsViews.Generic
              generic={generic?.ocupation}
              type="ocupation"
              title={t('pages.generic.ocupation.title')}
              inputTitle={t('generic.ocupation.name')}
              inputPlaceHolder={t('generic.ocupation.placeholder')}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setWasModified={setWasModified}
              genericList={generic}
              setGeneric={setGeneric}
              originalData={originalData}
              setOriginalData={setOriginalData}
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
              setIsEdit={setIsEdit}
              setWasModified={setWasModified}
              genericList={generic}
              setGeneric={setGeneric}
              originalData={originalData}
              setOriginalData={setOriginalData}
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
              setIsEdit={setIsEdit}
              setWasModified={setWasModified}
              genericList={generic}
              setGeneric={setGeneric}
              originalData={originalData}
              setOriginalData={setOriginalData}
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
              setIsEdit={setIsEdit}
              setWasModified={setWasModified}
              genericList={generic}
              setGeneric={setGeneric}
              originalData={originalData}
              setOriginalData={setOriginalData}
            />
          )}
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Generic;
