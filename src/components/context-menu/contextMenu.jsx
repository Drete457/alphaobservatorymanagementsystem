import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContextMenu } from 'hooks/context-menu';
import useNavigation from 'components/layout/sidebar/navigation';

const ContextMenu = () => {
  const history = useHistory();
  const [t] = useTranslation();
  const { xPos, yPos, showMenu } = useContextMenu();

  const navigation = useNavigation(t, '');
  return (
    <>
      {showMenu ? (
        <ul
          className="menu"
          style={{
            top: yPos,
            left: xPos,
            opacity: showMenu ? 1 : 0,
          }}
        >
          <li className="select" onClick={() => (window.location.href = '/')}>
            Refresh Page
          </li>
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
