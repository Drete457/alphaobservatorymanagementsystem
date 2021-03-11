import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {construtionImg} from "../../assets/images"


const Build = () => {
  const history = useHistory();
  const [t] = useTranslation();

  return (
    <>
      <header>
        <h1 className="title">{t('pages.constrution')}</h1>
      </header>
      <body>
          <img src={construtionImg} alt="Page under constrution" className="center"/>
      </body>
    </>
  );
};

export default Build;
