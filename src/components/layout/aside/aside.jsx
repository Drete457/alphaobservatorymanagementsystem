import { memo, useLayoutEffect } from 'react';
import { CSidebar, CSidebarClose } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { asideShow } from 'state/atoms';
import Button from 'components/button';

const googleTranslateElementInit = () => {
  /* eslint-disable no-new */
  new window.google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
    },
    'google_translate_element',
  );
};

const Aside = () => {
  const [isAsideShow, setAsideShow] = useRecoilState(asideShow);
  const [t] = useTranslation();
  const history = useHistory();

  useLayoutEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit();
  }, []);

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
            <div id="google_translate_element"></div>
            <hr />
            {/*             <Button
              name={t('btn.table-import.button')}
              onClick={() => history.push(`/table_import`)}
              className="button-font-weight"
            /> */}
          </div>
        </div>
      </div>
    </CSidebar>
  );
};

export default memo(Aside);
