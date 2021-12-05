import { useLayoutEffect } from 'react';
import { useGetCountries } from 'hooks/countries';
import { useGetGeneric } from 'hooks/generic';
import { useGetUsers } from 'hooks/users';
import { useGetReceptionCards } from 'hooks/reception';
import { useSetRecoilState } from 'recoil';
import { countries, generic, users, globalList } from 'state/atoms';
import homeHandler from 'helpers/users';
import Sidebar from './sidebar';
import Aside from './aside';
import Header from './header';
import Content from './content';

const Layout = () => {
  //delete the remain of cards positions on localStorage
  sessionStorage.removeItem('cardsPosition');
  localStorage.removeItem('cardsPosition');

  const setCountries = useSetRecoilState(countries);
  const setGeneric = useSetRecoilState(generic);
  const setListUsers = useSetRecoilState(users);
  const setGlobalList = useSetRecoilState(globalList);

  const { data, execute } = useGetUsers();
  const { data: dataEntry, execute: executeEntry } = useGetReceptionCards();
  const { data: countriesList, execute: executeCountries } = useGetCountries();
  const { data: genericList, execute: executeGeneric } = useGetGeneric();

  useLayoutEffect(() => {
    execute();
    executeEntry();
    executeCountries();
    executeGeneric();
  }, [execute, executeEntry, executeCountries, executeGeneric]);

  useLayoutEffect(() => {
    if (countriesList) {
      setCountries(countriesList);
    }

    if (genericList) {
      setGeneric(genericList);
    }
  }, [countriesList, genericList, setCountries, setGeneric]);

  useLayoutEffect(() => {
    const collaboratorsData = data ? Object.values(data) : [];
    const collaboratorsSort = collaboratorsData.sort((value1, value2) =>
      homeHandler.sortList(value1, value2, 'name'),
    );
    const receptionCardsData = dataEntry ? Object.values(dataEntry) : [];
    const receptionCardsSort = receptionCardsData.sort((value1, value2) =>
      homeHandler.sortList(value1, value2, 'name'),
    );

    const collaborators = collaboratorsSort.map?.((user) => {
      return { id: user.id, name: user.name, link: `/user/view/${user.id}` };
    });

    const entries = receptionCardsSort?.map?.((entry) => {
      return {
        id: entry.id,
        name: entry.name,
        link: `/reception/reception_edit/${entry.id}`,
      };
    });

    setGlobalList([...collaborators, ...entries]);
    setListUsers({
      collaborators: collaboratorsData,
      entries: receptionCardsData,
    });
  }, [data, dataEntry, setGlobalList, setListUsers]);

  return (
    <div className="c-app c-classic-layout">
      <Sidebar />
      <Aside />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Layout;
