import React, { memo } from 'react';
import { CSidebar, CSidebarClose } from '@coreui/react';
import { useRecoilState } from 'recoil';
import { asideShow } from '../../../state/atoms';

const Aside = () => {
  const [isAsideShow, setAsideShow] = useRecoilState(asideShow);

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
            <div className="nav-link">Aside</div>
          </div>
        </div>
      </div>
    </CSidebar>
  );
};

export default memo(Aside);
