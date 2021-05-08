import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/button';

const generateLink = (set, id) => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const url = `${protocol}//${host}/#/cards/${id}`;

  set(url);
};

const GenerateLink = ({ id }) => {
  const [t] = useTranslation();
  const [hasGenerateLink, setHasGenerateLink] = useState(null);
  const [hasCopy, setHasCopy] = useState(false);

  return hasGenerateLink ? (
    <div className="card-input-generate">
      <Button
        name={t('btn.create-edit.generate-link.copy')}
        onClick={() => {
          navigator.clipboard.writeText(hasGenerateLink);
          setHasCopy(true);
        }}
      />
      {hasCopy ? (
        <input
          disabled
          value={t('pages.user.view.cards.hascopy')}
          className="card-input-generate-link"
        />
      ) : (
        <input
          disabled
          value={hasGenerateLink}
          className="card-input-generate-link"
        />
      )}
    </div>
  ) : (
    <div className="card-generate-button">
      <Button
        name={t('btn.create-edit.generate-link.title')}
        isDanger={false}
        onClick={() => generateLink(setHasGenerateLink, id)}
      />
    </div>
  );
};

export default GenerateLink;
