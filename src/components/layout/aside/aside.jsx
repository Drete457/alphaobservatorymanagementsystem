import { memo } from 'react';
import { CSidebar, CSidebarClose } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { asideShow } from 'state/atoms';
import Button from 'components/button';

const Aside = () => {
  const [isAsideShow, setAsideShow] = useRecoilState(asideShow);
  const [t] = useTranslation();
  const history = useHistory();

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
            <hr />
            <Button
              name={t('btn.table-import.button')}
              onClick={() => history.push(`/table_import`)}
              className="button-font-weight"
            />
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
