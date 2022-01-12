import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContextMenu } from 'hooks/context-menu';
import useNavigation from 'components/layout/sidebar/navigation';
import { useCopy } from 'hooks/context-menu';

const ContextMenu = () => {
  const history = useHistory();
  const [t] = useTranslation();

  const { xPos, yPos, showMenu } = useContextMenu();
  const { value } = useCopy();

  const navigation = useNavigation(t, '');
  return (
    <>
      {showMenu ? (
        <ul
          className="menu"
          style={{
            top: yPos,
            left: xPos,
          }}
        >
          <li className="select" onClick={() => (window.location.href = '/')}>
            {t('btn.rightClickMenu.refresh')}
          </li>
          <li
            className="select"
            onClick={() => {
              navigator.clipboard.writeText(value);
            }}
          >
            {t('btn.rightClickMenu.copy')}
          </li>
          <li
            className="select"
            onClick={() => {
              const indexPxPosX = xPos.indexOf('px');
              const indexPxPosY = yPos.indexOf('px');

              const x = xPos.substring(0, indexPxPosX);
              const y = yPos.substring(0, indexPxPosY);

              const elementMouseIsOver = document.elementFromPoint(x, y);

              if (
                elementMouseIsOver.tagName === 'INPUT' ||
                elementMouseIsOver.tagName === 'TEXTAREA'
              ) {
                navigator.clipboard.readText().then((text) => {
                  elementMouseIsOver.innerText = text;
                });
              }
            }}
          >
            {t('btn.rightClickMenu.paste')}
          </li>
          <hr />
          {navigation.map((item) => {
            return item?._children.map?.((child) => {
              return (
                <li
                  key={child.name}
                  className="select"
                  onClick={() => history.push(child.to)}
                >
                  {child.name}
                </li>
              );
            });
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};

export default ContextMenu;
