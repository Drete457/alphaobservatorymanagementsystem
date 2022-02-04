import { memo } from 'react';
import { CSidebar, CSidebarClose } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { asideShow, users, user } from 'state/atoms';
import { useHistory } from 'react-router-dom';
import Button from 'components/button';
import homeHandler from 'helpers/users';

const Aside = () => {
  const [isAsideShow, setAsideShow] = useRecoilState(asideShow);
  const [t] = useTranslation();
  const history = useHistory();
  let hashCompare = '';

  const { collaborators } = useRecoilValue(users);
  const isUser = useRecoilValue(user);

  if (collaborators) {
    hashCompare = Array.from(collaborators).find(
      (item) => item.hashcode,
    ).hashcode;
  }

  return (
    <CSidebar
      aside
      colorScheme="light"
      size="lg"
      overlaid
      show={isAsideShow}
      onShowChange={(state) => setAsideShow(state)}
    >
      <CSidebarClose onClick={() => setAsideShow(false)} />

      <div className="nav-underline">
        <div className="nav nav-tabs">
          <div className="nav-item">
            <div className="nav-link">{t('sidebar.aside.title')}</div>
            {homeHandler.hashCode(isUser?.email).toString() === hashCompare && (
              <>
                <hr />
                <Button
                  name={t('btn.errors.button')}
                  onClick={() => history.push(`/errors`)}
                  className="button-font-weight"
                />
                <hr />
                <Button
                  name={t('btn.table-import.button')}
                  onClick={() => history.push(`/table_import`)}
                  className="button-font-weight"
                />
              </>
            )}
            <hr />
            <Button
              name={t('btn.logs.collaborators')}
              onClick={() => history.push(`/collaborators`)}
              className="button-font-weight"
            />
            <hr />
            <Button
              name={t('btn.logs.entries')}
              onClick={() => history.push(`/entries`)}
              className="button-font-weight"
            />
            <hr />
          </div>
        </div>
      </div>
    </CSidebar>
  );
};

export default memo(Aside);
