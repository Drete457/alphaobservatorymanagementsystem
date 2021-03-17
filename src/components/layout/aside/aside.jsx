import { memo, useLayoutEffect } from 'react';
import { CSidebar, CSidebarClose } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { asideShow } from '../../../state/atoms';

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
      {/*aside content*/}
      <div className="nav-underline">
        <div className="nav nav-tabs">
          <div className="nav-item">
            <div className="nav-link">{t('sidebar.aside.title')}</div>
            <div id="google_translate_element"></div>
          </div>
        </div>
      </div>
    </CSidebar>
  );
};

export default memo(Aside);
