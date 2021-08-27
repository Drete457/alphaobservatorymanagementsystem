import { useState, useLayoutEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetGeneric } from 'hooks/generic';
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
      setGeneric(data);
    }
  }, [data]);
  console.log(generic);
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
          {active === 0 && <p>0</p>}
          {active === 1 && <p>1</p>}
          {active === 2 && <p>2</p>}
          {active === 3 && <p>3</p>}
          {active === 4 && <p>4</p>}
          {active === 5 && <p>5</p>}
          {active === 6 && <p>6</p>}
          {active === 7 && <p>7</p>}
          {active === 8 && <p>8</p>}
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Generic;
